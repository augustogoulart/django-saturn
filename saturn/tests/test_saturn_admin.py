from django.urls import URLPattern

from saturn.options import SaturnAdmin
from .models import TheModel

saturn_admin = SaturnAdmin(TheModel)


def test_can_create_saturn_admin():
    assert SaturnAdmin(TheModel)


def test_model_admin_urls():
    """
    An instance of SaturnAdmin must have a url property returning a list of url patterns.
    """
    route = saturn_admin.urls[0]
    assert isinstance(route, URLPattern)


def test_registered_models_api(client):
    """
    Lists all the models registered with SaturnSite.
    """
    response = client.get('/saturn/api/site/registered/')
    assert response.status_code == 200
