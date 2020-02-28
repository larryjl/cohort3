import pytest
from flask import Flask
import flaskHello

def test_flaskHello():
    assert flaskHello.index() == 'hello world'
