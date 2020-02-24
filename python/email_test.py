import pytest


def email(firstName, lastName):
    return f"{firstName}.{lastName}@evolveu.ca"


def test_email_sameCase():
    assert email("Larry", "Shumlich") == "Larry.Shumlich@evolveu.ca"

