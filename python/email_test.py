import pytest


def email(firstName, lastName):
    return f"{firstName.lower()}.{lastName.lower()}@evolveu.ca"

def test_email_lowercase():
    assert email("Heiko", "Peters") == "heiko.peters@evolveu.ca"
