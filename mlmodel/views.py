from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import FileResponse, JsonResponse
from django.core.files import File
import base64
import tempfile, os
import json
import joblib
from .constants import soil_dict
import pandas as pd
import random
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import cv2
import requests

def fetch_and_decode_image(image_url):
    response = requests.get(image_url)
    image_array = np.asarray(bytearray(response.content), dtype=np.uint8)
    return cv2.imdecode(image_array, cv2.IMREAD_COLOR)

# Function to detect faces in an image using Haar cascade classifier
def detect_faces(image):
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    return faces

# Function to extract faces from an image
def extract_face(image, face_coordinates):
    x, y, w, h = face_coordinates
    return image[y:y+h, x:x+w]

# Function to compare faces and return True or False
def compare_faces(aadhar_image_url, profile_image_url):
    try:
        # Fetch and decode images from URLs
        aadhar_image = fetch_and_decode_image(aadhar_image_url)
        profile_image = fetch_and_decode_image(profile_image_url)
        
        # Detect faces in the images
        aadhar_faces = detect_faces(aadhar_image)
        profile_faces = detect_faces(profile_image)
        
        # Return False if no faces are detected in either image
        if len(aadhar_faces) == 0 or len(profile_faces) == 0:
            return False
        
        # Extract the first detected face from each image
        aadhar_face = extract_face(aadhar_image, aadhar_faces[0])
        profile_face = extract_face(profile_image, profile_faces[0])
        
        # Convert faces to grayscale for comparison
        aadhar_gray = cv2.cvtColor(aadhar_face, cv2.COLOR_BGR2GRAY)
        profile_gray = cv2.cvtColor(profile_face, cv2.COLOR_BGR2GRAY)
        
        # Compute the Structural Similarity Index (SSI)
        similarity_index = cv2.matchTemplate(aadhar_gray, profile_gray, cv2.TM_CCOEFF_NORMED)[0][0]
        
        # Return True if the SSI is above a certain threshold, indicating similar faces
        similarity_threshold = 0.8  # You may need to adjust this threshold based on your data
        return similarity_index >= similarity_threshold
    except Exception as e:
        print(f"Error: {e}")
        return False

# Create your views here.
class TestView(APIView):
    def get(self, request):
        # print(dictionary)
        return Response({"message": "Got some data!", "data": {'a': 1, 'b': 2, 'c': 3}})

    def put(self, request):
        # print(dictionary)
        return Response({"message": "Got some data!", "data": {'a': 1, 'b': 2, 'c': 3}})

    def delete(self, request):
        # print(dictionary)
        return Response({"message": "Got some data!", "data": {'a': 1, 'b': 2, 'c': 3}})
    
    def post(self, request):
        text = request.data.get("input")
        # print(dictionary)
        return Response({"message": "Got some data!", "data": {'a': 1, 'b': 2, 'c': 3}})
    
class CropPredictionView(APIView):
    def post(self,request):
        soil = request.data.get("soil")
        N =  soil_dict[soil]["N"]
        P = soil_dict[soil]["P"]
        K = soil_dict[soil]["K"]
        temperature = request.data.get("temperature")
        humidity = request.data.get("humidity")
        ph = soil_dict[soil]["pH"]
        scaler = joblib.load('./mlmodel/models/crop_prediction/scaler.pkl')
        targets = joblib.load('./mlmodel/models/crop_prediction/targets.pkl')
        grad_model = joblib.load('./mlmodel/models/crop_prediction/grad_model.pkl')
        grid_search_model = joblib.load('./mlmodel/models/crop_prediction/grid_search_model.pkl')
        knn_model = joblib.load('./mlmodel/models/crop_prediction/knn_model.pkl')
        svc_model = joblib.load('./mlmodel/models/crop_prediction/svc_poly_model.pkl')
        x = [[N,P,K,temperature,humidity,ph]]
        x = scaler.transform(x)
        preds = []
        preds.append([max(grad_model.predict_proba(x)[0]),targets[grad_model.predict(x)[0]]])
        preds.append([max(grid_search_model.predict_proba(x)[0]),targets[grid_search_model.predict(x)[0]]])
        preds.append([max(knn_model.predict_proba(x)[0]),targets[knn_model.predict(x)[0]]])
        preds.append([max(svc_model.predict_proba(x)[0]),targets[svc_model.predict(x)[0]]])
        preds.sort(reverse=True)
        return Response({"message": "Got some data!", "data":set([preds[0][1],preds[1][1],preds[2][1],preds[3][1]])})
    

class QnAChatBotView(APIView):
    def post(self,request):
        welcome = ['hi', 'hey']
        question = request.data.get("question")
        data = pd.read_csv("./mlmodel/models/chatbot/data.csv")
        tfidf_fit = joblib.load('./mlmodel/models/chatbot/tfidf_fit.pkl')
        for w in question.split():
            if w.lower() in welcome:
                return random.choice(welcome)  
        tfidf_test=tfidf_fit.transform([question])
        mask=tfidf_test.toarray()!=0
        m=mask[0]
        tfidf_test.toarray()[mask]
        corpus = data['questions'].values
        tfidf_corpus=tfidf_fit.transform(corpus)
        cm=cosine_similarity(tfidf_test, tfidf_corpus)
        pos=np.argmax(cm[0])
        data.iloc[pos]
        return Response({"message": "Got some data!", "data":data.iloc[pos]['answers']})
    
class CompareView(APIView):
    def post(self,request):
        aadhar = request.data.get("aadhar")
        profile = request.data.get("profile")
        res = compare_faces(aadhar,profile)
        return Response({"message": "Got some data!", "data":res})
        
    
    

        