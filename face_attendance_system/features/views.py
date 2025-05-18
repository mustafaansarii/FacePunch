# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import RegisteredUser
import face_recognition
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from datetime import date, datetime
import numpy as np
from rest_framework import status

class RegisterUserAPIView(APIView):
    @authentication_classes([JWTAuthentication])
    @permission_classes([IsAuthenticated])
    def post(self, request):
        data = request.data
        image = data.get('image')

        # Check if email already exists
        if RegisteredUser.objects.filter(email=data['email']).exists():
            return Response({'error': 'User is already registered'}, status=400)

        # Save uploaded image
        with open('temp_face.jpg', 'wb+') as f:
            for chunk in image.chunks():
                f.write(chunk)

        img = face_recognition.load_image_file('temp_face.jpg')
        encodings = face_recognition.face_encodings(img)

        if not encodings:
            return Response({'error': 'No face detected'}, status=400)

        encoding = encodings[0].tolist()

        RegisteredUser.objects.create(
            name=data['name'],
            email=data['email'],
            gender=data['gender'],
            dob=data['dob'],
            face_encoding=encoding
        )

        return Response({'message': 'Registration successful'})

class MarkAttendanceAPIView(APIView):
    def post(self, request):
        image = request.data.get('image')

        # Save uploaded image
        with open('temp_face.jpg', 'wb+') as f:
            for chunk in image.chunks():
                f.write(chunk)

        img = face_recognition.load_image_file('temp_face.jpg')
        encodings = face_recognition.face_encodings(img)

        if not encodings:
            return Response({'error': 'No face detected'}, status=400)

        encoding = encodings[0]

        # Compare with all registered users
        for user in RegisteredUser.objects.all():
            stored_encoding = np.array(user.face_encoding)
            match = face_recognition.compare_faces([stored_encoding], encoding, tolerance=0.6)

            if match[0]:
                now = datetime.now()  # Get current datetime
                if user.last_attendance and user.last_attendance.date() == now.date():
                    return Response({'error': 'Attendance already marked today'}, status=400)
                else:
                    user.last_attendance = now  # Store datetime
                    user.save()
                    return Response({'message': f'Attendance marked for {user.name}'})

        return Response({'error': 'No matching face found'}, status=404)

class RegisteredUserListAPIView(APIView):
    @authentication_classes([JWTAuthentication])
    @permission_classes([IsAuthenticated])
    def get(self, request):
        users = RegisteredUser.objects.all()
        user_data = [
            {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "gender": user.gender,
                "dob": user.dob.strftime("%Y-%m-%d"),
                "last_attendance": user.last_attendance.strftime("%Y-%m-%d") if user.last_attendance else None,
            }
            for user in users
        ]
        return Response(user_data)

class RegisteredUserDetailAPIView(APIView):
    @authentication_classes([JWTAuthentication])
    @permission_classes([IsAuthenticated])
    def delete(self, request, user_id):
        try:
            user = RegisteredUser.objects.get(id=user_id)
            user.delete()
            return Response({"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except RegisteredUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    @authentication_classes([JWTAuthentication])
    @permission_classes([IsAuthenticated])
    def put(self, request, user_id):
        try:
            user = RegisteredUser.objects.get(id=user_id)
            data = request.data

            # Update fields if provided
            if "name" in data:
                user.name = data["name"]
            if "email" in data:
                user.email = data["email"]
            if "gender" in data:
                user.gender = data["gender"]
            if "dob" in data:
                user.dob = data["dob"]

            user.save()
            return Response({"message": "User updated successfully"})
        except RegisteredUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

class AttendanceRecordAPIView(APIView):
    @authentication_classes([JWTAuthentication])
    @permission_classes([IsAuthenticated])
    def get(self, request):
        users = RegisteredUser.objects.exclude(last_attendance__isnull=True)
        attendance_data = [
            {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "last_attendance_date": user.last_attendance.strftime("%Y-%m-%d"),
                "last_attendance_time": user.last_attendance.strftime("%H:%M:%S"),
            }
            for user in users
        ]
        return Response(attendance_data)
