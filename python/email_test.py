import pytest

def email(firstName, lastName):
    return True

def test_email_sameCase():
    assert email('Larry', 'Shumlich') == "Larry.Shumlich@evolveu.ca"
