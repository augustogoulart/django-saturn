from django.urls import URLPattern
from rest_framework.utils import json

from saturn.options import SaturnAdmin
from saturn.sites import SaturnSite
from saturn.tests.models import TheModel


saturn_site = SaturnSite()
saturn_site.register(TheModel)


def test_saturn_site_can_register_model():
    """
    Register a model in SaturnSite with its corresponding instance of SaturnAdmin.
    """
    saturn_site.register(TheModel)
    registered = saturn_site._registry[TheModel]
    assert isinstance(registered, SaturnAdmin)


def test_urls_has_url_pattern():
    """
    An instance of SaturnSite must have a url property returning a list of url patterns.
    """
    route = saturn_site.get_urls()[0]
    assert isinstance(route, URLPattern)


def test_urls_return_app_name():
    assert len(saturn_site.urls) == 3
    assert 'saturn' in saturn_site.urls


def test_registered_models_api(client):
    """
    Lists all the models registered with SaturnSite.
    """
    response = client.get('/saturn/api/registered/')
    assert response.status_code == 200

    content = json.loads(response.content)
    assert content['registered']['app']['name']
    assert content['registered']['app']['models']

