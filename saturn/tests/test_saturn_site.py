import pytest
from django.urls import URLPattern, URLResolver
from rest_framework.utils import json

from saturn.options import SaturnAdmin
from saturn.sites import SaturnSite
from saturn.models import TheModel

saturn_site = SaturnSite()
saturn_site.register(TheModel)


def test_saturn_site_can_register_model():
    """
    Register a model in SaturnSite with its corresponding instance of SaturnAdmin.
    """
    saturn_site.register(TheModel)
    registered = saturn_site._registry[TheModel]
    assert isinstance(registered, SaturnAdmin)


def test_urls_map_app_registered_models():
    """
    An instance of SaturnSite must have a url property returning a list of url patterns.
    """
    # TODO - This test is too low level.
    # The  first two objets in this list are URLPatterns. The remaining after URLResolvers
    assert isinstance(saturn_site.get_urls()[0], URLPattern)
    assert isinstance(saturn_site.get_urls()[1], URLPattern)
    assert isinstance(saturn_site.get_urls()[2], URLResolver)
    assert saturn_site.get_urls()[2].url_patterns[0].name == 'saturn_themodel_changelist'


def test_registered_models_api_has_app_list(client):
    """
    Lists all the models registered with SaturnSite.
    """
    response = client.get('/saturn/api/registered/')
    assert response.status_code == 200

    content = json.loads(response.content)
    assert content['appList']


@pytest.mark.parametrize("fields", [
    'name', 'appLabel', 'appUrl', 'models'
])
def test_app_list_has_fields(client, fields):
    response = client.get('/saturn/api/registered/')
    content = json.loads(response.content)
    content = content['appList'][0]
    assert content[fields]


@pytest.mark.parametrize("fields", [
    'name', 'objectName', 'perms'
])
def test_app_list_model_fields(client, fields):
    response = client.get('/saturn/api/registered/')
    content = json.loads(response.content)
    content = content['appList'][0]['models'][0]
    assert content[fields]
