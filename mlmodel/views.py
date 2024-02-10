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
import face_recognition

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
    
class CompareModel(APIView):
    def post(self,request):
        aadhar = request.data.get("aadhar")
        profile = request.data.get("profile")
        aaad = request.get(aadhar)
        pro = request.get(profile)
        aadhar_array = np.asarray(bytearray(aaad.content), dtype=np.uint8)
        profile_array = np.asarray(bytearray(pro.content), dtype=np.uint8)
        aadhar_image = cv2.imdecode(aadhar_array, cv2.IMREAD_COLOR)
        profile_image = cv2.imdecode(profile_array, cv2.IMREAD_COLOR)
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        gray_image = cv2.cvtColor(aadhar_array, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray_image, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
        for (x, y, w, h) in faces:
            cv2.rectangle(aadhar_image, (x, y), (x+w, y+h), (0, 255, 0), 2)
            extracted_face = aadhar_image[y:y+h, x:x+w]
        id_card_face_locations = face_recognition.face_locations(extracted_face)
        profile_face_locations = face_recognition.face_locations(profile_image)
        id_card_face_encodings = face_recognition.face_encodings(extracted_face, id_card_face_locations)
        profile_face_encodings = face_recognition.face_encodings(profile_image, profile_face_locations)
        for id_card_face_encoding in id_card_face_encodings:
            for profile_face_encoding in profile_face_encodings:
                results = face_recognition.compare_faces([id_card_face_encoding], profile_face_encoding)
                distance = face_recognition.face_distance([id_card_face_encoding], profile_face_encoding)
                thershold = 0.6
                if results[0] == True and distance[0] < thershold:
                    return Response({"message": "Got some data!", "data": True})
                else:
                    return Response({"message": "Got some data!", "data": False})
    
    

        