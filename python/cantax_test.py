import pytest

import cantax

# tax rules
# 15% on the first $47,630 of taxable income, plus
# 20.5% on the next $47,629 of taxable income (on the portion of taxable income over 47,630 up to $95,259), plus
# 26% on the next $52,408 of taxable income (on the portion of taxable income over $95,259 up to $147,667), plus
# 29% on the next $62,704 of taxable income (on the portion of taxable income over 147,667 up to $210,371), plus
# 33% of taxable income over $210,371


@pytest.mark.parametrize(
    "income, taxes",
    [
        (1, 0.15),
        (2, 0.3),
        (50000, 7630.35),
        (100000, 18141.10),
        (150000, 31211.10),
        (250000, 61796.25),
    ],
)
def test_tax(income, taxes):
    assert cantax.tax(income) == taxes
