import joblib
import pandas as pd
import random
import os

# Global model loader
MODEL = None
FEATURES = None

def load_model(model_path="trained_models/risk_model.joblib"):
    """Load trained model into memory"""
    global MODEL, FEATURES
    if MODEL is None:
        model_data = joblib.load(model_path)
        MODEL = model_data['model']
        FEATURES = model_data['features']
    return MODEL, FEATURES

def predict_risk(input_data):
    """Predict risk score for input data"""
    model, features = load_model()
    
    # Ensure all features are present
    for feature in features:
        if feature not in input_data:
            input_data[feature] = 0  # Safe default
    
    # Create prediction DataFrame
    input_df = pd.DataFrame({feat: [input_data[feat]] for feat in features})
    return round(float(model.predict(input_df)[0]), 1)

def predict_movement(current_location, displacement_count):
    """Predict next likely location"""
    lat, lon = current_location
    
    # Direction based on displacement pattern
    direction = displacement_count % 4
    if direction == 0:  # North
        lat += 0.015
    elif direction == 1:  # East
        lon += 0.015
    elif direction == 2:  # South
        lat -= 0.015
    else:  # West
        lon -= 0.015
    
    # Add randomness
    lat += random.uniform(-0.005, 0.005)
    lon += random.uniform(-0.005, 0.005)
    
    confidence = min(0.8, 0.3 + displacement_count * 0.1)
    
    return {
        'latitude': round(lat, 6),
        'longitude': round(lon, 6),
        'confidence': confidence
    }

def register_beneficiary(data, dedupe_engine):
    """Register new beneficiary with deduplication check"""
    data['days_since_last_seen'] = 0  # Just registered
    
    # Check duplicates
    is_duplicate, duplicates = dedupe_engine.check_duplicates(data)
    
    if not is_duplicate:
        dedupe_engine.add_entry(data)
        risk = predict_risk(data)
        movement = predict_movement(
            (data['latitude'], data['longitude']),
            data['displacement_count']
        )
        return {
            "status": "registered",
            "risk_score": risk,
            "predicted_location": movement
        }
    else:
        return {
            "status": "duplicate",
            "matches": [{
                'pseudonym': d['entry']['pseudonym'],
                'similarity': d['similarity_score']
            } for d in duplicates]
        }
    
def is_model_loaded():
    """Check if model is loaded in memory"""
    return MODEL is not None