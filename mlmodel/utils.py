import cv2
import numpy as np
import requests

# Function to fetch and decode an image from URL
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