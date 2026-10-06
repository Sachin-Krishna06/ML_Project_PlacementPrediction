import pandas as pd
import numpy as np
import os
import json
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score
from sklearn.metrics import mean_absolute_error, mean_squared_error, root_mean_squared_error, r2_score
import xgboost as xgb

def train_models(data_path="data/demo/student_placement.csv", model_dir="models/"):
    print("Loading dataset...")
    df = pd.read_csv(data_path)
    
    # Preprocessing
    print("Building preprocessing pipeline...")
    categorical_features = ['target_role']
    numeric_features = ['tenth_percentage', 'twelfth_percentage', 'previous_gpa', 
                        'current_cgpa', 'current_backlogs', 'history_of_arrears',
                        'internship_count', 'project_count', 'leetcode_total',
                        'leetcode_easy', 'leetcode_medium', 'leetcode_hard',
                        'aptitude_score', 'soft_skill_rating']

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numeric_features),
            ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
        ])

    X = df[numeric_features + categorical_features]
    y_class = df['placement_status']
    
    X_train_c, X_test_c, y_train_c, y_test_c = train_test_split(X, y_class, test_size=0.2, random_state=42)
    
    # Preprocess features
    X_train_c_processed = preprocessor.fit_transform(X_train_c)
    X_test_c_processed = preprocessor.transform(X_test_c)
    
    os.makedirs(model_dir, exist_ok=True)
    joblib.dump(preprocessor, os.path.join(model_dir, 'preprocessor.pkl'))
    print("Saved preprocessor.pkl")

    # Classification Model (Placement)
    print("Training Classification Model (XGBoost)...")
    clf = xgb.XGBClassifier(random_state=42, use_label_encoder=False, eval_metric='logloss')
    clf.fit(X_train_c_processed, y_train_c)
    
    y_pred_c = clf.predict(X_test_c_processed)
    y_pred_proba_c = clf.predict_proba(X_test_c_processed)[:, 1]
    
    metrics = {
        "classification": {
            "accuracy": round(accuracy_score(y_test_c, y_pred_c), 4),
            "precision": round(precision_score(y_test_c, y_pred_c), 4),
            "recall": round(recall_score(y_test_c, y_pred_c), 4),
            "f1_score": round(f1_score(y_test_c, y_pred_c), 4),
            "roc_auc": round(roc_auc_score(y_test_c, y_pred_proba_c), 4)
        }
    }
    
    # Benchmarking multiple classification models for Table 1 Matrix Visual
    from sklearn.tree import DecisionTreeClassifier
    from sklearn.ensemble import GradientBoostingClassifier, ExtraTreesClassifier
    
    benchmark_models = {
        "XGBoost Classifier": clf,
        "Random Forest": RandomForestClassifier(n_estimators=100, random_state=42).fit(X_train_c_processed, y_train_c),
        "Gradient Boosting": GradientBoostingClassifier(random_state=42).fit(X_train_c_processed, y_train_c),
        "Logistic Regression": LogisticRegression(max_iter=1000, random_state=42).fit(X_train_c_processed, y_train_c),
        "Decision Tree": DecisionTreeClassifier(random_state=42).fit(X_train_c_processed, y_train_c)
    }
    
    table1_rows = []
    total_acc, total_prec, total_rec, total_f1, total_auc = 0, 0, 0, 0, 0
    count = len(benchmark_models)
    
    for name, model in benchmark_models.items():
        yp = model.predict(X_test_c_processed)
        ypp = model.predict_proba(X_test_c_processed)[:, 1] if hasattr(model, "predict_proba") else yp
        
        acc = round(accuracy_score(y_test_c, yp), 4)
        prec = round(precision_score(y_test_c, yp), 4)
        rec = round(recall_score(y_test_c, yp), 4)
        f1 = round(f1_score(y_test_c, yp), 4)
        auc = round(roc_auc_score(y_test_c, ypp), 4)
        
        table1_rows.append({
            "model": name,
            "accuracy": acc,
            "precision": prec,
            "recall": rec,
            "f1_score": f1,
            "roc_auc": auc
        })
        total_acc += acc
        total_prec += prec
        total_rec += rec
        total_f1 += f1
        total_auc += auc

    metrics["benchmark_table"] = {
        "headers": ["Algorithm / Model", "Accuracy", "Precision", "Recall", "F1 Score", "ROC-AUC"],
        "rows": table1_rows,
        "total_summary": {
            "model": "Average / Overall",
            "accuracy": round(total_acc / count, 4),
            "precision": round(total_prec / count, 4),
            "recall": round(total_rec / count, 4),
            "f1_score": round(total_f1 / count, 4),
            "roc_auc": round(total_auc / count, 4)
        }
    }

    joblib.dump(clf, os.path.join(model_dir, 'placement_model.pkl'))
    print(f"Saved placement_model.pkl. Metrics: {metrics['classification']}")

    # Regression Model (Salary) - Only train on placed students
    print("Training Regression Model (Random Forest)...")
    placed_df = df[df['placement_status'] == 1]
    X_reg = placed_df[numeric_features + categorical_features]
    y_reg = placed_df['salary_lpa']
    
    X_train_r, X_test_r, y_train_r, y_test_r = train_test_split(X_reg, y_reg, test_size=0.2, random_state=42)
    
    X_train_r_processed = preprocessor.transform(X_train_r)
    X_test_r_processed = preprocessor.transform(X_test_r)
    
    reg = RandomForestRegressor(n_estimators=100, random_state=42)
    reg.fit(X_train_r_processed, y_train_r)
    
    y_pred_r = reg.predict(X_test_r_processed)
    
    metrics["regression"] = {
        "mae": round(mean_absolute_error(y_test_r, y_pred_r), 4),
        "rmse": round(root_mean_squared_error(y_test_r, y_pred_r), 4),
        "r2_score": round(r2_score(y_test_r, y_pred_r), 4)
    }
    
    metrics["dataset_info"] = {
        "total_records": len(df),
        "training_size": len(X_train_c),
        "testing_size": len(X_test_c),
        "features": numeric_features + categorical_features
    }
    
    joblib.dump(reg, os.path.join(model_dir, 'salary_model.pkl'))
    print(f"Saved salary_model.pkl. Metrics: {metrics['regression']}")
    
    with open(os.path.join(model_dir, 'metrics.json'), 'w') as f:
        json.dump(metrics, f, indent=4)
    print("Saved metrics.json")

if __name__ == "__main__":
    train_models()

