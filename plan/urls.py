
from django.urls import path
from . import views
from .views import PasswordsChangeView
from django.contrib.auth import views as auth_views
from rest_framework import routers



urlpatterns = [
    path('', views.home, name='home'),
    path('api/chart/data/barGraph', views.BarData.as_view(),),
    path('api/chart/data/lineGraph', views.lineData.as_view(),),
    path('api/chart/data/radarGraph', views.radarData.as_view(),),
    path('api/chart/data/doughnutGraph', views.doughnutData.as_view(),),
    path('api/chart/Delete', views.delrec, name='delrec'),
    path('api/chart/savegraph', views.charts, name='charts'),


    path('login/', auth_views.LoginView.as_view(
         template_name='accounts/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(
        template_name='accounts/logout.html'), name='logout'),
    path('register/', views.register, name='register'),
    path('profile/', views.view_profile, name='view_profile'),
    path("profile/edit/", views.edit_profile, name='edit_profile'),


    path('change_password/', PasswordsChangeView.as_view(
         template_name='accounts/change_password.html'), name='change_password'),
    path('password_success', views.password_success, name='password_success'),
    

    path('reset-password/', auth_views.PasswordResetView.as_view(
         template_name='accounts/reset_password.html', success_url='/account/reset-password/sent', email_template_name='accounts/reset_password_email.html'), name='reset_password'),
    path('reset-password/sent', auth_views.PasswordResetDoneView.as_view(
         template_name='accounts/password_reset_sent.html'), name='password_reset_done'),
    path('reset/<uidb64>/<token>', auth_views.PasswordResetConfirmView.as_view(
         template_name='accounts/password_reset_form.html', success_url='/account/reset-password/complete/'), name='password_reset_confirm'),
    path('reset-password/complete/', auth_views.PasswordResetCompleteView.as_view(
         template_name='accounts/password_reset_done.html'), name='password_reset_complete'),
]
