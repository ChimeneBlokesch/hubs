import matplotlib.pyplot as plt
import os
import json
import numpy as np


def plot_diagram(x_data, y_data, title, xlabel, ylabel, save_path, xlim=None, ylim=None):
    plt.plot(x_data, y_data)
    plt.title(title)
    plt.xlabel(xlabel)
    plt.ylabel(ylabel)

    if xlim:
        plt.xlim(xlim)

    if ylim:
        plt.ylim(ylim)

    plt.savefig(save_path)
    plt.close()


def read_json(file_path):
    with open(file_path, 'r') as f:
        # The data is written as an array of numbers.
        data = json.load(f)
    return data


def getAmountNPCs(path):
    return path["properties"]["amountNPCs"]


def make_diagram(name):
    path = os.path.abspath("data/" + name)
    # Initialize with the values from an empty a-scene.
    fps_avg_values = [60]
    raf_avg_values = [16]
    amountNPCs_values = [0]

    for folder in os.listdir(path):
        if not os.path.isdir(os.path.join(path, folder)):
            continue

        data_file = os.path.join(path, folder, "data.json")
        data = read_json(data_file)

        fps = data["fps"]
        raf = data["raf"]

        parameters_file = os.path.join(path, folder, "parameters.json")
        parameters = read_json(parameters_file)

        pathMid = parameters["path"][0]
        pathLeft = parameters["path"][1]
        pathRight = parameters["path"][2]

        amountNPCs = getAmountNPCs(pathMid) if name == "walking" else getAmountNPCs(
            pathLeft) + getAmountNPCs(pathRight)

        fps_avg_values.append(np.mean(fps))
        raf_avg_values.append(np.mean(raf))
        amountNPCs_values.append(amountNPCs)

    naam = "lopende" if name == "walking" else "staande"

    plot_diagram(amountNPCs_values, fps_avg_values, f"Framerate per aantal {naam} NPCs",
                 "Aantal NPCs", "FPS", "data/" + name + f"/{name}_fps.png",
                 xlim=(0, np.max(amountNPCs_values)),
                 ylim=(0, 60))
    plot_diagram(amountNPCs_values, raf_avg_values, f"Latency per aantal {naam} NPCs",
                 "Aantal NPCs", "rAF", "data/" + name + f"/{name}_raf.png",
                 xlim=(0, np.max(amountNPCs_values)),
                 ylim=(0, 300))


if __name__ == "__main__":
    make_diagram("walking")
    make_diagram("standing")
