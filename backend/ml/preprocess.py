import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder

def get_preprocessor():
    numeric_features = [
        '10th_percentage', '12th_percentage', 'previous_gpa', 'current_cgpa',
        'current_backlogs', 'history_of_arrears', 'internship_count', 'project_count',
        'leetcode_total', 'leetcode_easy', 'leetcode_medium', 'leetcode_hard',
        'aptitude_score', 'soft_skill_rating'
    ]
    
    categorical_features = ['target_role']
    
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numeric_features),
            ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
        ]
    )
    return preprocessor

def get_numeric_features():
    return [
        '10th_percentage', '12th_percentage', 'previous_gpa', 'current_cgpa',
        'current_backlogs', 'history_of_arrears', 'internship_count', 'project_count',
        'leetcode_total', 'leetcode_easy', 'leetcode_medium', 'leetcode_hard',
        'aptitude_score', 'soft_skill_rating'
    ]
