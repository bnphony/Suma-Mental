import random
from functools import reduce


def generate_numbers(num_numbers: int, num_digits: int, operacion: str, digits_random: str, operacion_random: str):
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
    if (operacion_random == 'on'):  # Random Operation
        data["numbers"] = [random.choice([-abs(num), abs(num)]) for num in data["numbers"]]
    elif (operacion == 'resta'):    # 1er, -2do, -3ro, -N...
        data["numbers"] = [num if index == 0 else -num for index, num in enumerate(data["numbers"])]

    data["answer"] = sum(data["numbers"])
    data["signo"] = '+ ' if operacion == 'suma' else '- '
    return data

def randomDigits(max_digits: int):
    num_digits = random.randint(1, max_digits)
    lower_bound = 10 ** (num_digits - 1)
    upper_bound = 10 ** num_digits - 1
    return lower_bound, upper_bound