from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import FileResponse, JsonResponse
from django.core.files import File
import base64
import tempfile, os
import json

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