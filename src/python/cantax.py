import math

taxBrackets = [
    [47630, 0.15],
    [47629, 0.205],
    [52408, 0.26],
    [62704, 0.29],
    [210371, 0.33],
    [math.inf, 0.33],
]


def tax(income):
    taxes = 0
    remainder = income
    for bracket in taxBrackets:
        if remainder > bracket[0]:
            taxes += round(bracket[0] * bracket[1], 2)  # round to cents
            remainder -= bracket[0]
        else:
            taxes += round(remainder * bracket[1], 2)  # round to cents
            break
    return round(taxes * 20) / 20  # round to nickels
