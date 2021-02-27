import bleach
import json

from django import template
from django.utils.safestring import mark_safe

register = template.Library()


@register.filter(name='json_bleach')
def json_bleach(value):
    """
    safe jsonify filter, bleaches the json string using the bleach html tag remover
    Source: https://gist.github.com/pirate/c18bfe4fd96008ffa0aef25001a2e88f
    """
    uncleaned = json.dumps(value)
    clean = bleach.clean(uncleaned)

    try:
        json.loads(clean)
    except:
        # should never happen, but this is a last-line-of-defense check
        # to make sure this blob wont get eval'ed by the JS engine as
        # anything other than a JSON object
        raise ValueError('JSON contains a quote or escape sequence that was unable to be stripped')

    return mark_safe(clean)
