import matplotlib.pyplot as plt
import os
import json
import numpy as np
import re


def read_json(file_path):
    with open(file_path, 'r') as f:
        # The data is written as an array of numbers.

        if os.stat(file_path).st_size == 0:
            # Ignore empty files.
            return []

        data = json.load(f)
    return data


def getAmountNPCs(path):
    return path["properties"]["amountNPCs"]


def avg_from_tests(path):
    avg_fps_values = []
    avg_raf_values = []

    for file in os.listdir(path):
        if file == "parameters.json":
            continue

        data = read_json(os.path.join(path, file))

        if len(data) == 0:
            # Ignore empty files.
            continue

        fps = data["fps"]
        raf = data["raf"]

        # The average from one test.
        avg_fps_values.append(np.mean(fps))
        avg_raf_values.append(np.mean(raf))

    # The average from all tests.
    return np.mean(avg_fps_values), np.mean(avg_raf_values)


def make_diagrams():
    path = os.path.abspath("data/")
    for room_folder in os.listdir(path):
        # Extract data from the json files.
        data = {"fps": {}, "raf": {}}

        for file in os.listdir(path + "/" + room_folder):
            # The three parameters.

            name = file.replace("algo_", "")
            rendering_algorithm = name.split("_")[0]
            moveable = name.split("_")[1]
            # Any content within parentheses is removed.
            amountNPCs = int(re.sub(r'\([^)]*\)', '',
                                    name.split("_")[2].replace(".json", "")))

            json = read_json(os.path.join(path, room_folder, file))
            fps = np.array(json["fps"])
            raf = np.array(json["raf"])

            if (moveable, rendering_algorithm) not in data["fps"]:
                data["fps"][(moveable, rendering_algorithm)] = {}

            if (moveable, rendering_algorithm) not in data["raf"]:
                data["raf"][(moveable, rendering_algorithm)] = {}

            if amountNPCs not in data["fps"][(moveable, rendering_algorithm)]:
                data["fps"][(moveable, rendering_algorithm)
                            ][amountNPCs] = {"avg": [], "std": []}

            if amountNPCs not in data["raf"][(moveable, rendering_algorithm)]:
                data["raf"][(moveable, rendering_algorithm)
                            ][amountNPCs] = {"avg": [], "std": []}

            data["fps"][(moveable, rendering_algorithm)
                        ][amountNPCs]["avg"].append(np.mean(fps))
            data["fps"][(moveable, rendering_algorithm)
                        ][amountNPCs]["std"].append(np.std(fps))
            data["raf"][(moveable, rendering_algorithm)][amountNPCs]["avg"].append(
                np.mean(raf))
            data["raf"][(moveable, rendering_algorithm)
                        ][amountNPCs]["std"].append(np.std(raf))

        # Color per rendering algorithm.
        color_idx = 0
        colortable = plt.cm.tab10(range(10))
        colors = {}

        # Per fps/raf, make a diagram.
        for diagram in data:
            max_y_value = 0

            # Per line, plot the average and standard deviation.
            for (moveable, rendering_algorithm) in data[diagram]:
                avg_list = []
                std_list = []
                x_list = []

                for amount in data[diagram][(moveable, rendering_algorithm)]:
                    avg_values = data[diagram][(
                        moveable, rendering_algorithm)][amount]["avg"]
                    std_values = data[diagram][(
                        moveable, rendering_algorithm)][amount]["std"]

                    # The average and standard deviation of all tests.
                    avg_list.append(np.mean(avg_values))
                    std_list.append(np.mean(std_values))
                    x_list.append(amount)

                # Sort by x_list.
                indices = np.argsort(x_list)
                x_list = np.array(x_list)[indices]
                avg_list = np.array(avg_list)[indices]
                std_list = np.array(std_list)[indices]

                max_y_value = max(max_y_value, max(avg_list) + max(std_list))

                if rendering_algorithm not in colors:
                    colors[rendering_algorithm] = colortable[color_idx]
                    color_idx += 1

                color = colors[rendering_algorithm]
                moveable_dutch = "lopend" if moveable == "walking" else "staand"
                algo_name = rendering_algorithm.replace(
                    "combi", "LOD")

                plt.errorbar(x_list, avg_list, std_list,
                             label=f"{algo_name} {moveable_dutch}",
                             linestyle="solid" if moveable == "walking" else "dashed",
                             color=color)

            diagram_name = "Framerate" if diagram == "fps" else "Latency"
            plt.title(f"{diagram_name} per aantal NPCs")
            plt.xlabel("Aantal NPCs")
            plt.ylabel(f"{diagram_name} (fps)" if diagram ==
                       "fps" else f"{diagram_name} (rAF)")
            plt.legend()

            plt.xticks(np.insert(np.arange(100, max(x_list) + 1, 100), 0, 1))

            plt.xlim(-10, max(x_list) + 10)
            plt.ylim(0, 60 if diagram == "fps" else max_y_value)

            if diagram == "fps":
                # Minimal framerate.
                plt.plot([0, 1000], [5, 5], linestyle="dotted", color="red")

            plt.savefig(f"{room_folder}_{diagram}.png")
            plt.close()


if __name__ == "__main__":
    make_diagrams()
