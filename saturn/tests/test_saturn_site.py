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
