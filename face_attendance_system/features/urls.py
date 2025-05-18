from django.urls import path
from .views import (
    RegisterUserAPIView,
    MarkAttendanceAPIView,
    RegisteredUserListAPIView,
    RegisteredUserDetailAPIView,
    AttendanceRecordAPIView,
)

urlpatterns = [
    path('register/', RegisterUserAPIView.as_view()),
    path('mark-attendance/', MarkAttendanceAPIView.as_view()),
    path('users/', RegisteredUserListAPIView.as_view()),
    path('users/<int:user_id>/', RegisteredUserDetailAPIView.as_view()),
    path('attendance-records/', AttendanceRecordAPIView.as_view()),
]
