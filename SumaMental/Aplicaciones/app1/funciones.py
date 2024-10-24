import random


def generate_numbers(num_numbers: int, num_digits: int):
    data = {}
    lower_bound = 10 ** (num_digits - 1)
    upper_bound = 10**num_digits - 1
    # Generate the desired number of random numbers
    data["numbers"] = [
        random.randint(lower_bound, upper_bound) for _ in range(num_numbers)
    ]
    data["answer"] = sum(data["numbers"])
    return data
