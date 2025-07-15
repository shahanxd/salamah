from fastapi import FastAPI, HTTPException
from deduplication import SmartDeduplication
from prediction_service import register_beneficiary, predict_risk, is_model_loaded  # Import new function

app = FastAPI()
dedupe_engine = SmartDeduplication()

@app.post("/register")
async def register_endpoint(payload: dict):
    """Endpoint for beneficiary registration"""
    required_fields = [
        'pseudonym', 'latitude', 'longitude', 'displacement_count',
        'children_under_5', 'elderly_over_60', 'has_diabetes',
        'has_disability', 'in_high_risk_zone'
    ]
    
    if not all(field in payload for field in required_fields):
        raise HTTPException(
            status_code=400,
            detail="Missing required fields in payload"
        )
    
    try:
        result = register_beneficiary(payload, dedupe_engine)
        return {
            "status": "success",
            "data": result
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Registration failed: {str(e)}"
        )

@app.post("/predict-risk")
async def predict_risk_endpoint(payload: dict):
    """Endpoint for standalone risk prediction"""
    try:
        return {"risk_score": predict_risk(payload)}
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Prediction failed: {str(e)}"
        )

@app.get("/health")
async def health_check():
    """Service health check"""
    return {"status": "active", "model_loaded": is_model_loaded()}