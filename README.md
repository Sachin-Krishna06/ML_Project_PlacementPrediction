# PLACEMENTIQ - AI Student Placement & Salary Predictor

PLACEMENTIQ is a full-stack Machine Learning web application designed to predict a student's placement probability, expected salary (LPA), and company-specific match scores based on their academic and skill profile.

## Features
- **Overall Placement Probability**: ML classification (XGBoost) based on historical data.
- **Salary Prediction**: ML regression (Random Forest) to predict expected LPA.
- **Company Engine**: Specific predictions and matchmaking for top companies (TCS, Infosys, Amazon, Microsoft, etc.).
- **Skill Gap & Recommendations**: Actionable insights to improve placement chances.

## Architecture
- **Backend**: Python, FastAPI, Scikit-learn, XGBoost, Pandas.
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Recharts.

## Setup & Running

### 1. Backend Setup
```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python ml\generate_demo_data.py
python ml\train.py
uvicorn app:app --reload
```
The backend API will run on `http://localhost:8000`.

### 2. Frontend Setup
```powershell
cd frontend
npm install
npm run dev
```
The frontend UI will run on `http://localhost:5173`.

## Disclaimer
Predictions are estimates generated from historical (synthetic demo) data. Actual hiring decisions depend on company requirements, hiring cycles, interview performance, and market conditions. This is an academic ML project and does not guarantee placement.
