from pydantic import BaseModel, Field

class PredictionRequest(BaseModel):
    tenth_percentage: float = Field(..., ge=0, le=100)
    twelfth_percentage: float = Field(..., ge=0, le=100)
    previous_gpa: float = Field(..., ge=0, le=10)
    current_cgpa: float = Field(..., ge=0, le=10)
    current_backlogs: int = Field(..., ge=0)
    history_of_arrears: int = Field(..., ge=0)
    internship_count: int = Field(..., ge=0)
    project_count: int = Field(..., ge=0)
    leetcode_total: int = Field(..., ge=0)
    leetcode_easy: int = Field(..., ge=0)
    leetcode_medium: int = Field(..., ge=0)
    leetcode_hard: int = Field(..., ge=0)
    aptitude_score: float = Field(..., ge=0, le=100)
    soft_skill_rating: float = Field(..., ge=1, le=10)
    target_role: str = Field(..., description="Target job role")

class CompanyPredictionRequest(BaseModel):
    profile: PredictionRequest
    company_name: str
