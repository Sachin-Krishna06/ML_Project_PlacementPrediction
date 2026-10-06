from fastapi import APIRouter, HTTPException
from utils.validation import PredictionRequest, CompanyPredictionRequest
from ml.predict import predict_overall, predict_company, models_loaded
from utils.recommendations import generate_recommendations, analyze_strengths_weaknesses
from config import COMPANIES, MODEL_DIR
import json
import os

router = APIRouter()

@router.get("/health")
def health_check():
    return {"status": "ok", "models_loaded": models_loaded}

@router.post("/predict")
def predict_endpoint(request: PredictionRequest):
    try:
        profile_dict = request.model_dump()
        result = predict_overall(profile_dict)
        
        # Calculate company scores
        company_results = []
        for c in COMPANIES:
            c_res = predict_company(profile_dict, c["name"])
            strengths, weaknesses = analyze_strengths_weaknesses(request)
            c_res["strengths"] = strengths
            c_res["weaknesses"] = weaknesses
            company_results.append(c_res)
            
        company_results.sort(key=lambda x: x["match_score"], reverse=True)
        
        result["companies"] = company_results
        result["recommendations"] = generate_recommendations(request)
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/predict/company")
def predict_company_endpoint(request: CompanyPredictionRequest):
    try:
        profile_dict = request.profile.model_dump()
        result = predict_company(profile_dict, request.company_name)
        strengths, weaknesses = analyze_strengths_weaknesses(request.profile)
        result["strengths"] = strengths
        result["weaknesses"] = weaknesses
        return result
    except ValueError as ve:
        raise HTTPException(status_code=404, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/companies")
def get_companies():
    return COMPANIES

@router.get("/model-metrics")
def get_model_metrics():
    metrics_path = os.path.join(MODEL_DIR, "metrics.json")
    if os.path.exists(metrics_path):
        with open(metrics_path, "r") as f:
            return json.load(f)
    return {"error": "Metrics not found"}
