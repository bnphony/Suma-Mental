import os
import random
import sys
from functools import reduce

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


# print(generate_numbers(3, 3))


def generate_numbers2(num_numbers: int, num_digits: int, operacion: str, digits_random: str, operacion_random: str):
    data = {}
    lower_bound = 10 ** (num_digits - 1)
    upper_bound = 10**num_digits - 1
    # Generate the desired number of random numbers
    if (digits_random == 'on'):
        data["numbers"] = [
            random.randint(*randomDigits(num_digits)) for _ in range(num_numbers)
        ]
    else:
        data["numbers"] = [
            random.randint(lower_bound, upper_bound) for _ in range(num_numbers)
        ]

    if (operacion_random == 'on'):  # Random Opera
        data["numbers"] = [random.choice([-abs(num), abs(num)]) for num in data["numbers"]]
    elif (operacion == 'resta'):
        data["numbers"] = [num if index == 0 else -num for index, num in enumerate(data["numbers"])]
    data["answer"] = sum(data["numbers"])
    data["signo"] = '+ ' if operacion == 'suma' else '- '
    return data

def randomDigits(max_digits: int):
    num_digits = random.randint(1, max_digits)
    lower_bound = 10 ** (num_digits - 1)
    upper_bound = 10 ** num_digits - 1
    return lower_bound, upper_bound


# print(generate_numbers2(3, 2, 'resta', 'on', 0))


# Generate a payment(how many dollars, cents, etc)
def generate_payment(num_digits: int):
    DOLLARS = {'1000': 10, '500': 20, '100': 20, '50': 20, '20': 20, '10': 20, '5': 20, '1': 20 }
    CENTS = {'50': 20, '25': 20, '10': 20, '5': 20, '1': 100}
    data = {}
    lower_bound = 10 ** (num_digits - 1)
    upper_bound = 10**num_digits - 1
    # Generate a float number [num_digits].[2 decimals] // 23.34
    number_payment = round(random.uniform(lower_bound, upper_bound), 2)
    # Extract int and float part
    dollars = int(number_payment)
    cents = round((number_payment - dollars) * 100)
    print(f"number: {number_payment}")
    payment = {"DOLLARS": {}, "CENTS": {}}
    
    # Helper function to handle one dictionary (either DOLLARS or CENTS)
    def calculate_payment(value, available_funds, payment_part):
        for denom in sorted(available_funds.keys(), key=int, reverse=True):
            denom_value = int(denom)
            max_use = min(value // denom_value, available_funds[denom])
            if max_use > 0:
                payment_part[denom] = max_use
                value -= denom_value * max_use
                available_funds[denom] -= max_use
            if value == 0:
                break
        return value

    # Calculate dollar part
    remaining_dollars = calculate_payment(dollars, DOLLARS, payment["DOLLARS"])
    
    # Calculate cents part
    remaining_cents = calculate_payment(cents, CENTS, payment["CENTS"])

    # Check if the exact amount could be constructed
    if remaining_dollars > 0 or remaining_cents > 0:
        return "Exact amount cannot be constructed with available denominations."
    
    return payment

# print(generate_payment(3))