import json
import pytest

from saturn.options import SaturnAdmin
from .models import TheModel

saturn_admin = SaturnAdmin(TheModel)


@pytest.mark.parametrize("field", [
    'model'
])
def test_changelist_view(rf, field):
    request = rf.get('/saturn/model/')
    response = saturn_admin.changelist_view(request)
    content = json.loads(response.content)
    assert content[field]
