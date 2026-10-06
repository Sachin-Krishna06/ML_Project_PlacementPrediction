import os
import joblib
import pandas as pd
import numpy as np
from config import MODEL_DIR, COMPANIES

# Load Models
try:
    preprocessor = joblib.load(os.path.join(MODEL_DIR, "preprocessor.pkl"))
    placement_model = joblib.load(os.path.join(MODEL_DIR, "placement_model.pkl"))
    salary_model = joblib.load(os.path.join(MODEL_DIR, "salary_model.pkl"))
    models_loaded = True
except FileNotFoundError:
    models_loaded = False

def get_placement_readiness(profile_dict):
    score = (
        (profile_dict["current_cgpa"] * 10) * 0.3 + 
        (min(profile_dict["leetcode_total"], 500) / 500 * 100) * 0.2 + 
        (min(profile_dict["internship_count"], 3) / 3 * 100) * 0.15 + 
        (min(profile_dict["project_count"], 5) / 5 * 100) * 0.15 + 
        profile_dict["aptitude_score"] * 0.1 + 
        (profile_dict["soft_skill_rating"] * 10) * 0.1
    )
    if profile_dict["current_backlogs"] > 0:
        score -= profile_dict["current_backlogs"] * 10
    return max(0, min(100, int(score)))

def predict_overall(profile_dict):
    if not models_loaded:
        raise Exception("Models not trained")
        
    df = pd.DataFrame([profile_dict])
    X = preprocessor.transform(df)
    
    prob = float(placement_model.predict_proba(X)[0][1] * 100)
    expected_salary = float(salary_model.predict(X)[0])
    
    if prob < 40:
        expected_salary = 0.0
    
    salary_min = max(0.0, expected_salary - 1.5)
    salary_max = expected_salary + 2.0
    
    readiness = get_placement_readiness(profile_dict)
    
    return {
        "placement_probability": float(round(prob, 1)),
        "predicted_salary": float(round(expected_salary, 1)) if expected_salary > 0 else 0.0,
        "salary_range": {
            "min": float(round(salary_min, 1)) if expected_salary > 0 else 0.0,
            "max": float(round(salary_max, 1)) if expected_salary > 0 else 0.0
        },
        "placement_readiness": int(readiness)
    }

def predict_company(profile_dict, company_name):
    company = next((c for c in COMPANIES if c["name"].lower() == company_name.lower()), None)
    if not company:
        raise ValueError("Company not found")
        
    base_pred = predict_overall(profile_dict)
    
    # Calculate match score based on company requirements
    cgpa_score = min(profile_dict["current_cgpa"] / 9.0, 1.0) * company["academic_importance"]
    coding_score = min(profile_dict["leetcode_total"] / 300, 1.0) * company["coding_importance"]
    aptitude_score = (profile_dict["aptitude_score"] / 100) * company["aptitude_importance"]
    exp_score = min((profile_dict["internship_count"] + profile_dict["project_count"]) / 5, 1.0) * ((company["internship_importance"] + company["project_importance"]) / 2)
    
    raw_match = (cgpa_score + coding_score + aptitude_score + exp_score) / (company["academic_importance"] + company["coding_importance"] + company["aptitude_importance"] + (company["internship_importance"] + company["project_importance"]) / 2)
    match_score = int(raw_match * 100)
    
    # Eligibility
    eligible = True
    if "Strict (0 allowed)" in company["backlog_policy"] and profile_dict["current_backlogs"] > 0:
        eligible = False
        match_score -= 30
    if profile_dict["current_cgpa"] < 6.0:
        eligible = False
        match_score -= 20
        
    prob = base_pred["placement_probability"] * (match_score / 100)
    prob = max(5.0, min(95.0, prob))
    
    expected_salary = float(company["historical_salary_average"])
    if base_pred["predicted_salary"] > 0:
        expected_salary = (expected_salary + base_pred["predicted_salary"]) / 2
        
    return {
        "company": company["name"],
        "placement_probability": float(round(prob, 1)),
        "salary_prediction": float(round(expected_salary, 1)),
        "salary_range": {
            "min": float(round(max(company["historical_salary_min"], expected_salary - 1.5), 1)),
            "max": float(round(min(company["historical_salary_max"], expected_salary + 2.0), 1))
        },
        "match_score": int(max(0, min(100, match_score))),
        "eligibility": "Likely Eligible" if eligible else "Likely Ineligible"
    }

