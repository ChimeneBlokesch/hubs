import matplotlib.pyplot as plt
import os
import json
import numpy as np


def plot_diagram(x_data_list, y_data_list, labels, linestyles, colors, title, xlabel, ylabel, save_path, xlim=None, ylim=None):
    for x_data, y_data, label, linestyle, color in zip(x_data_list, y_data_list, labels, linestyles, colors):
        print(color)
        plt.plot(x_data, y_data, label=label, linestyle=linestyle, color=color)

    plt.title(title)
    plt.xlabel(xlabel)
    plt.ylabel(ylabel)

    if xlim:
        plt.xlim(xlim)

    if ylim:
        plt.ylim(ylim)

    plt.legend()
    plt.savefig(save_path)
    plt.close()


def read_json(file_path):
    with open(file_path, 'r') as f:
        # The data is written as an array of numbers.
        data = json.load(f)
    return data


def getAmountNPCs(path):
    return path["properties"]["amountNPCs"]


def make_diagrams():
    path = os.path.abspath("data/")
    labels = []
    fps_avg_list = []
    raf_avg_list = []
    amountNPCs_list = []
    labels = []
    linestyles = []
    colors = []

    all_colors = ["red", "blue", "green", "orange", "purple", "brown",
                  "pink", "gray", "olive", "cyan", "magenta", "yellow", "black"]

    for i, algo in enumerate(os.listdir(path)):
        if not os.path.isdir(os.path.join(path, algo)):
            continue

        for moveable_folder in ["walking", "standing"]:
            if not os.path.isdir(os.path.join(path, algo, moveable_folder)):
                continue

            # Initialize with the values from an empty a-scene.
            fps_avg_values = [60]
            raf_avg_values = [16]
            amountNPCs_values = [0]

            for test_folder in os.listdir(os.path.join(path, algo, moveable_folder)):
                if not os.path.isdir(os.path.join(path, algo, moveable_folder, test_folder)):
                    continue

                data_file = os.path.join(
                    path, algo, moveable_folder, test_folder, "data.json")
                data = read_json(data_file)

                fps = data["fps"]
                raf = data["raf"]

                parameters_file = os.path.join(
                    path, algo, moveable_folder, test_folder, "parameters.json")
                parameters = read_json(parameters_file)

                pathMid = parameters["path"][0]
                pathLeft = parameters["path"][1]
                pathRight = parameters["path"][2]

                amountNPCs = getAmountNPCs(pathMid) if moveable_folder == "walking" else getAmountNPCs(
                    pathLeft) + getAmountNPCs(pathRight)

                fps_avg_values.append(np.mean(fps))
                raf_avg_values.append(np.mean(raf))
                amountNPCs_values.append(amountNPCs)

            fps_avg_list.append(fps_avg_values)
            raf_avg_list.append(raf_avg_values)
            amountNPCs_list.append(amountNPCs_values)
            labels.append(f"{algo} {moveable_folder}")

            colors.append(all_colors[i])

            linestyle = "solid" if moveable_folder == "walking" else "dashed"
            linestyles.append(linestyle)

            naam = "lopende" if moveable_folder == "walking" else "staande"

    plot_diagram(amountNPCs_list, fps_avg_list, labels, linestyles, colors,
                 f"Framerate per aantal {naam} NPCs",
                 "Aantal NPCs", "FPS", "data/fps.png",
                 xlim=(0, np.max(amountNPCs_list)),
                 ylim=(0, 60))
    plot_diagram(amountNPCs_list, raf_avg_list, labels, linestyles, colors,
                 f"Latency per aantal {naam} NPCs",
                 "Aantal NPCs", "rAF", "data/raf.png",
                 xlim=(0, np.max(amountNPCs_list)),
                 ylim=(0, 300))


if __name__ == "__main__":
    make_diagrams()
