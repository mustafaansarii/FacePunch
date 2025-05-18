from django.contrib import admin
from .models import RegisteredUser
from django.utils import timezone

class RegisteredUserAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'gender', 'dob', 'last_attendance')
    list_filter = ('last_attendance',)  # Add filter by last_attendance
    actions = ['mark_attendance']  # Add custom action

    def mark_attendance(self, request, queryset):
        today = timezone.now().date()
        updated_count = queryset.update(last_attendance=today)
        self.message_user(request, f"Attendance marked for {updated_count} user(s).")
    mark_attendance.short_description = "Mark attendance for selected users"

admin.site.register(RegisteredUser, RegisteredUserAdmin)
