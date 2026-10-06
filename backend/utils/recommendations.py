def generate_recommendations(profile):
    recs = []
    
    if profile.current_cgpa < 7.0:
        recs.append("Maintain or improve your CGPA. Many top companies have strict academic filters above 7.0.")
        
    if profile.current_backlogs > 0:
        recs.append("Clear your active backlogs immediately. Active backlogs will disqualify you from most on-campus drives.")
        
    if profile.leetcode_total < 100:
        recs.append("Try solving at least 150-200 DSA problems (focusing on Medium level) to clear coding rounds.")
        
    if profile.internship_count == 0:
        recs.append("Try to complete at least one relevant internship to stand out from other candidates.")
        
    if profile.project_count < 2:
        recs.append("Build 2-3 strong, production-level projects in your target domain and deploy them.")
        
    if profile.aptitude_score < 70:
        recs.append("Practice quantitative aptitude and logical reasoning for 30 minutes daily. This is the first elimination round for service-based companies.")
        
    if profile.soft_skill_rating < 7:
        recs.append("Work on your communication skills through mock interviews and group discussions.")
        
    if not recs:
        recs.append("Your profile is very strong! Focus on advanced system design and interviewing skills.")
        
    return recs

def analyze_strengths_weaknesses(profile):
    strengths = []
    weaknesses = []
    
    if profile.current_cgpa >= 8.5:
        strengths.append("Strong academic profile")
    elif profile.current_cgpa < 6.5:
        weaknesses.append("Academics could be a barrier")
        
    if profile.leetcode_total >= 300:
        strengths.append("Excellent coding profile")
    elif profile.leetcode_total < 50:
        weaknesses.append("Needs DSA practice")
        
    if profile.internship_count >= 2:
        strengths.append("Good professional experience")
        
    if profile.project_count >= 3:
        strengths.append("Strong project portfolio")
    elif profile.project_count == 0:
        weaknesses.append("Lacking project experience")
        
    return strengths, weaknesses
