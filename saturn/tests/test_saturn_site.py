from django.urls import URLPattern

from saturn.options import SaturnAdmin
from saturn.sites import SaturnSite
from saturn.tests.models import TheModel


saturn_site = SaturnSite()


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
    route = saturn_site.urls[0][0]
    assert isinstance(route, URLPattern)


def test_urls_return_app_name():
    assert len(saturn_site.urls) == 3
    assert 'saturn' in saturn_site.urls


def test_index_view(rf):
    """
    Site's index view must return 200
    """

    # TODO - This is not right since the app's base URL can change.
    request = rf.get('/')
    response = saturn_site.index(request)
    assert response.status_code == 200
