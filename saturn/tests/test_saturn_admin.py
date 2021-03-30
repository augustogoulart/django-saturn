from .models import TheModel
from saturn.options import SaturnAdmin


def test_can_create_saturn_admin():
    assert SaturnAdmin(TheModel)
