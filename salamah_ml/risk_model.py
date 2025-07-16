import joblib
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from datetime import datetime

def calculate_risk_features(row):
    """Calculate initial risk score using weighted features"""
    weights = {
        'displacement_count': 0.25,
        'children_under_5': 0.45,
        'elderly_over_60': 0.35,
        'has_diabetes': 0.7,
        'has_disability': 0.9,
        'in_high_risk_zone': 1.2
    }
    
    risk = sum([
        weights['displacement_count'] * row['displacement_count'],
        weights['children_under_5'] * row['children_under_5'],
        weights['elderly_over_60'] * row['elderly_over_60'],
        weights['has_diabetes'] * row['has_diabetes'],
        weights['has_disability'] * row['has_disability'],
        weights['in_high_risk_zone'] * row['in_high_risk_zone']
    ])
    return min(risk, 10)

def train_risk_model(df, model_save_path="trained_models/risk_model.joblib"):
    """Train and save risk prediction model"""
    df['risk_score'] = df.apply(calculate_risk_features, axis=1)
    df['days_since_last_seen'] = (datetime.now() - pd.to_datetime(df['last_seen'])).dt.days
    
    features = [
        'latitude', 'longitude', 'displacement_count', 
        'children_under_5', 'elderly_over_60', 'has_diabetes',
        'has_disability', 'in_high_risk_zone', 'days_since_last_seen'
    ]
    
    X = df[features]
    y = df['risk_score']
    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    model = RandomForestRegressor(
        n_estimators=150,
        max_depth=10,
        min_samples_split=5,
        random_state=42,
        n_jobs=-1
    )
    model.fit(X_train, y_train)
    
    # Save model and feature metadata
    model_data = {
        'model': model,
        'features': features,
        'train_score': model.score(X_train, y_train),
        'test_score': model.score(X_test, y_test)
    }
    
    joblib.dump(model_data, model_save_path)
    return model_data