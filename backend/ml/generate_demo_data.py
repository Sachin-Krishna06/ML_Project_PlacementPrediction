import pandas as pd
import numpy as np
import os
import random

def generate_demo_dataset(num_records=5000, output_path="data/demo/student_placement.csv"):
    np.random.seed(42)
    random.seed(42)
    
    print(f"Generating {num_records} synthetic demo records...")
    
    # Target Roles
    roles = ["Software Developer", "Data Scientist", "Data Analyst", "Cybersecurity Analyst", 
             "Cloud Engineer", "DevOps Engineer", "AI/ML Engineer", "Full Stack Developer"]
    
    # Companies
    companies = ["TCS", "Infosys", "Accenture", "Cognizant", "Wipro", "Capgemini", "Deloitte", "LTIMindtree", "Amazon", "Microsoft", "Not Placed"]
    
    data = []
    
    for i in range(num_records):
        # Academic
        tenth = round(np.random.normal(80, 10), 2)
        tenth = min(max(tenth, 40), 100)
        
        twelfth = round(np.random.normal(tenth - 5, 12), 2)
        twelfth = min(max(twelfth, 40), 100)
        
        cgpa = round(np.random.normal(8.0, 1.2), 2)
        cgpa = min(max(cgpa, 4.0), 10.0)
        prev_gpa = round(np.random.normal(cgpa, 0.5), 2)
        prev_gpa = min(max(prev_gpa, 4.0), 10.0)
        
        backlogs = np.random.choice([0, 1, 2, 3], p=[0.8, 0.1, 0.05, 0.05])
        history_arrears = 1 if backlogs > 0 or random.random() < 0.2 else 0
        
        # Experience
        internships = np.random.choice([0, 1, 2, 3], p=[0.4, 0.4, 0.15, 0.05])
        projects = np.random.choice([1, 2, 3, 4, 5], p=[0.1, 0.3, 0.3, 0.2, 0.1])
        
        # Coding
        leetcode_total = int(max(0, np.random.normal(100, 150)))
        if leetcode_total > 800: leetcode_total = 800
        
        easy = int(leetcode_total * 0.6)
        medium = int(leetcode_total * 0.3)
        hard = leetcode_total - easy - medium
        
        # Skills
        aptitude = round(min(max(np.random.normal(70, 15), 0), 100))
        soft_skill = round(min(max(np.random.normal(7, 2), 1), 10))
        
        target_role = random.choice(roles)
        
        # Placement logic (synthetic probabilities)
        placement_score = (cgpa * 10) * 0.3 + (leetcode_total * 0.05) + (internships * 5) + (projects * 2) + (aptitude * 0.2) + (soft_skill * 2) - (backlogs * 15)
        
        placed = 1 if placement_score > 60 and backlogs == 0 else 0
        if placed:
            company = np.random.choice(companies[:-1], p=[0.2, 0.2, 0.15, 0.15, 0.1, 0.1, 0.05, 0.03, 0.01, 0.01])
            if company in ["Amazon", "Microsoft"]:
                salary = round(np.random.normal(25, 8), 1)
            elif company in ["Deloitte", "LTIMindtree"]:
                salary = round(np.random.normal(8, 2), 1)
            else:
                salary = round(np.random.normal(4.5, 1), 1)
        else:
            company = "Not Placed"
            salary = 0.0
            
        data.append({
            "student_id": f"STU{10000+i}",
            "tenth_percentage": tenth,
            "twelfth_percentage": twelfth,
            "previous_gpa": prev_gpa,
            "current_cgpa": cgpa,
            "current_backlogs": backlogs,
            "history_of_arrears": history_arrears,
            "internship_count": internships,
            "project_count": projects,
            "leetcode_total": leetcode_total,
            "leetcode_easy": easy,
            "leetcode_medium": medium,
            "leetcode_hard": hard,
            "aptitude_score": aptitude,
            "soft_skill_rating": soft_skill,
            "target_role": target_role,
            "placement_status": placed,
            "salary_lpa": max(salary, 0.0),
            "company": company
        })
        
    df = pd.DataFrame(data)
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    df.to_csv(output_path, index=False)
    print(f"Saved dataset to {output_path}")

if __name__ == "__main__":
    generate_demo_dataset()
