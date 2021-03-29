from saturn.options import SaturnAdmin
from saturn.sites import SaturnSite
from saturn.tests.models import TheModel


def test_saturn_site_can_register_model():
    """
    Register a model in SaturnSite with its corresponding instance of SaturnAdmin

    Each registered model will match to a SaturnAdmin instance.
    {<class 'django.contrib.auth.models.Group'>: <django.contrib.auth.admin.GroupAdmin object at 0x112936460>}
    """
    site = SaturnSite()
    site.register(TheModel)
    registered = site._registry[TheModel]
    assert registered == SaturnAdmin
