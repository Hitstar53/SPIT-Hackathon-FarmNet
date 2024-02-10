from django.contrib import admin
from django.urls import path, include
from .views import TestView,CropPredictionView,QnAChatBotView

urlpatterns = [
    path('test/', TestView.as_view(), name="test"),
    path('crop_prediction/', CropPredictionView.as_view(), name="crop_prediction"),
    path('chatbot/', QnAChatBotView.as_view(), name="chatbot"),
]