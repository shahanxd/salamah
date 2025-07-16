import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

def generate_beneficiaries(num_records=1000):
    """Generate synthetic beneficiary data with enhanced features"""
    locations = ['Gaza City', 'Rafah', 'Khan Younis', 'Deir al-Balah', 'Jabalia']
    family_names = [f"Family_{i}" for i in range(1, num_records + 1)]
    high_risk_zones = [(31.45, 34.38), (31.52, 34.42), (31.35, 34.28)]
    
    data = []
    for i in range(num_records):
        lat = np.random.uniform(31.3, 31.6)
        lon = np.random.uniform(34.2, 34.5)
        
        # Determine high-risk status
        in_high_risk = any(
            np.sqrt((lat - z[0])**2 + (lon - z[1])**2) < 0.02 
            for z in high_risk_zones
        )
        
        last_seen = datetime.now() - timedelta(days=random.randint(0, 7))
        
        data.append({
            "pseudonym": family_names[i],
            "last_location": random.choice(locations),
            "latitude": lat,
            "longitude": lon,
            "displacement_count": np.random.randint(1, 10),
            "children_under_5": np.random.randint(0, 3),
            "elderly_over_60": np.random.randint(0, 2),
            "has_diabetes": np.random.choice([0, 1], p=[0.85, 0.15]),
            "has_disability": np.random.choice([0, 1], p=[0.9, 0.1]),
            "in_high_risk_zone": int(in_high_risk),
            "last_seen": last_seen.strftime('%Y-%m-%d %H:%M')
        })
    return pd.DataFrame(data)