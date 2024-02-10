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
        rainfall = request.data.get("rainfall")
        scaler = joblib.load('./mlmodel/models/crop_prediction/scaler.pkl')
        targets = joblib.load('./mlmodel/models/crop_prediction/targets.pkl')
        grad_model = joblib.load('./mlmodel/models/crop_prediction/grad_model.pkl')
        grid_search_model = joblib.load('./mlmodel/models/crop_prediction/grid_search_model.pkl')
        knn_model = joblib.load('./mlmodel/models/crop_prediction/knn_model.pkl')
        svc_model = joblib.load('./mlmodel/models/crop_prediction/svc_poly_model.pkl')
        x = [[N,P,K,temperature,humidity,ph,rainfall]]
        x = scaler.transform(x)
        preds = []
        preds.append([max(grad_model.predict_proba(x)[0]),targets[grad_model.predict(x)[0]]])
        preds.append([max(grid_search_model.predict_proba(x)[0]),targets[grid_search_model.predict(x)[0]]])
        preds.append([max(knn_model.predict_proba(x)[0]),targets[knn_model.predict(x)[0]]])
        preds.append([max(svc_model.predict_proba(x)[0]),targets[svc_model.predict(x)[0]]])
        preds.sort(reverse=True)
        return Response({"message": "Got some data!", "data":set([preds[0][1],preds[1][1],preds[2][1],preds[3][1]])})
    

    



# {
# "N":90,
# "P":42,
# "K":43,
# "temperature":20.87974371,
# "humidity":82.00274423,
# "ph":6.502985292000001,
# "rainfall":202.9355362
# }