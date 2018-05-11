from typing import Any, List, Iterable
from django.contrib.auth.models import Permission


def get_permissions_from_ns_codenames(ns_codenames):
    '''
    Returns a list of Permission objects for the specified namespaced codenames
    '''
    splitnames = [ns_codename.split('.') for ns_codename in ns_codenames]
    return [
        Permission.objects.get(codename=codename,
                               content_type__app_label=app_label)
        for app_label, codename in splitnames
    ]


def backtickify(items: Iterable[Any]) -> List[str]:
    '''
    Wrap all list items in backticks, e.g.:

        >>> backtickify(['a', 'b'])
        ['`a`', '`b`']
    '''

    return list(map(lambda s: f"`{s}`", items))


def humanlist(items: Iterable[str], word: str='and') -> str:
    '''
    Convert the given list to a comma-separated human-readable
    string, separating the final item with the given word.

    As per the 18F Content Guide, we use the Oxford comma.

    Examples:

        >>> humanlist(['a', 'b', 'c'])
        'a, b, and c'

        >>> humanlist(['a', 'b', 'c'], 'or')
        'a, b, or c'

        >>> humanlist(['a'])
        'a'
    '''

    itemlist = list(items)

    if len(itemlist) < 2:
        return ''.join(items)
    return ', '.join(itemlist[:-1]) + f', {word} ' + itemlist[-1]
