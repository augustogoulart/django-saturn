import json

import pytest

from saturn.admin import site as saturn_admin
from saturn.models import TheModel

saturn_admin.register([TheModel])


@pytest.mark.parametrize("field", [b"listDisplay", b"field"])
def test_changelist_api_view(db, client, field):
    TheModel.objects.create(field="Some Text")
    response = client.get("/saturn/api/saturn/themodel/")
    assert field in response.content


def test_add_view(db, client):
    assert False
