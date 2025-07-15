# Humanitarian Risk Assessment API

## API Endpoints

### POST `/register`
Register a new beneficiary with deduplication check

**Input:**
```json
{
  "pseudonym": "Family_123",
  "latitude": 31.52,
  "longitude": 34.42,
  "displacement_count": 3,
  "children_under_5": 2,
  "elderly_over_60": 1,
  "has_diabetes": 1,
  "has_disability": 0,
  "in_high_risk_zone": 1
}


**Output:**
```json
{
  "status": "success",
  "data": {
    "status": "registered",
    "risk_score": 7.3,
    "predicted_location": {
      "latitude": 31.535,
      "longitude": 34.435,
      "confidence": 0.75
    }
  }
}


**Install dependencies:**
pip install -r requirements.txt