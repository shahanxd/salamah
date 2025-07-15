from metaphone import doublemetaphone
from geopy.distance import geodesic

class SmartDeduplication:
    """Advanced deduplication engine using phonetic and geospatial matching"""
    def __init__(self, similarity_threshold=0.85):
        self.existing_entries = []
        self.similarity_threshold = similarity_threshold
        
    def add_entry(self, entry):
        is_dupe, matches = self.check_duplicates(entry)
        if not is_dupe:
            self.existing_entries.append(entry)
        return matches
    
    def check_duplicates(self, new_entry):
        potential_dupes = []
        new_fingerprint = self._generate_fingerprint(new_entry)
        
        for entry in self.existing_entries:
            entry_fingerprint = self._generate_fingerprint(entry)
            similarity = self._calculate_similarity(new_fingerprint, entry_fingerprint)
            
            if similarity >= self.similarity_threshold:
                potential_dupes.append({
                    'entry': entry,
                    'similarity_score': round(similarity, 2)
                })
                
        return len(potential_dupes) > 0, potential_dupes
    
    def _generate_fingerprint(self, entry):
        primary_phonetic, _ = doublemetaphone(entry['pseudonym'])
        return {
            'phonetic': primary_phonetic,
            'location': (entry['latitude'], entry['longitude']),
            'family_comp': (entry['children_under_5'], entry['elderly_over_60']),
            'medical': (entry['has_diabetes'], entry['has_disability'])
        }
    
    def _calculate_similarity(self, fp1, fp2):
        """Calculate composite similarity score"""
        phonetic_sim = 1.0 if fp1['phonetic'] == fp2['phonetic'] else 0.7
        distance_km = geodesic(fp1['location'], fp2['location']).km
        location_sim = max(0, 1 - distance_km / 5.0)
        comp_sim = 1.0 if fp1['family_comp'] == fp2['family_comp'] else 0.6
        medical_sim = 1.0 if fp1['medical'] == fp2['medical'] else 0.5
        
        return (0.4 * phonetic_sim + 
                0.3 * location_sim + 
                0.2 * comp_sim + 
                0.1 * medical_sim)