from pandas import read_csv
from numpy import array
from sklearn.neighbors import NearestNeighbors

# Load your combined CSV
df = read_csv("data/disease_symptoms_combined.csv")

# List of symptom columns (all columns except 'Disease')
symptom_columns = [col for col in df.columns if col != 'diseases']

# -----------------------------
# 2️⃣ KNN-based matching
# -----------------------------
# Prepare KNN model using Hamming distance for binary vectors
X = df[symptom_columns].values


def predict_disease_knn(input_symptoms,count):
    """
    input_symptoms: dict, e.g., {'Fever':1, 'Cough':1, ...}
    Returns top 5 diseases with similarity percentage
    """
    knn_model = NearestNeighbors(n_neighbors=count, metric='hamming')
    knn_model.fit(X)
    input_vector = array([[input_symptoms.get(col, 0) for col in symptom_columns]])
    
    distances, indices = knn_model.kneighbors(input_vector)
    
    result = []
    for dist, idx in zip(distances[0], indices[0]):
        similarity_percent = int((1 - dist) * 100)
        disease_name = df.iloc[idx]['diseases']
        result.append((disease_name, similarity_percent))
    
    return result




# userInput = {"sore throat": 1,"vomiting": 1,"headache": 1,"nausea": 1,"diarrhea": 1,"fever": 1,"ache all over": 1,"chills": 1,"coryza": 1}
# knn_results = predict_disease_knn(userInput)

# print(knn_results)

