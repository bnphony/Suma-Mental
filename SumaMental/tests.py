import os
import random
import sys

# import django
# from django.test import TestCase


sys.path.insert(0, os.path.abspath("."))


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ProyectoFutbol.settings")

# for i, f in enumerate(sys.path):
#     print(i, " -> ", f)

# django.setup()


print("Funciona")


def generate_numbers(num_numbers: int, num_digits: int):
    lower_bound = 10 ** (num_digits - 1)
    upper_bound = 10**num_digits - 1
    # Generate the desired number of random numbers
    numbers = [random.randint(lower_bound, upper_bound) for _ in range(num_numbers)]
    answer = sum(numbers)
    return numbers


print(generate_numbers(3, 3))
