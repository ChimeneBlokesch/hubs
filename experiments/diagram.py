import matplotlib.pyplot as plt
import os
import json


def plot_diagram(x_data, y_data, title, xlabel, ylabel, save_path):
    plt.plot(x_data, y_data)
    plt.title(title)
    plt.xlabel(xlabel)
    plt.ylabel(ylabel)
    plt.savefig(save_path)
    plt.close()


def read_json(file_path):
    with open(file_path, 'r') as f:
        # The data is written as an array of numbers.
        data = json.load(f)
    return data


def getAmountNPCs(path):
    return path["properties"]["amountNPCs"]


if __name__ == "__main__":
    for folder in os.listdir("data"):
        absfolder = os.path.abspath("data/" + folder)

        data_file = os.path.join(absfolder, "data.json")
        data = read_json(data_file)

        time = data["time"]
        fps = data["fps"]
        raf = data["raf"]

        parameters_file = os.path.join(absfolder, "parameters.json")
        parameters = read_json(parameters_file)

        pathMid = parameters["path"]["mid"]
        pathLeft = parameters["path"]["left"]
        pathRight = parameters["path"]["right"]

        amountWalking = getAmountNPCs(pathMid)
        amountStanding = getAmountNPCs(pathLeft) + getAmountNPCs(pathRight)
