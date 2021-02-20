"""saturn URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
import debug_toolbar
from django.urls import path, include
from saturn.saturn.admin import saturn_admin_site
from saturn.core.views import dummy_endpoint, dummy_users_list, dummy_user_detail

urlpatterns = [
    path('api/', dummy_endpoint),
    path('saturn/', saturn_admin_site.urls),
    path('api/users/', dummy_users_list),
    path('api/users/<int:pk>/', dummy_user_detail),
    path('admin/', admin.site.urls),
    path('__debug__/', include(debug_toolbar.urls)),
]
