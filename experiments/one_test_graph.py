import matplotlib.pyplot as plt
import os
import json
import numpy as np


if __name__ == "__main__":
    tests = [("Vlooienburg", "algo_combi_standing_1000")]
    i = 0

    for room, test in tests:
        fps_fig, fps_ax = plt.subplots()
        raf_fig, raf_ax = plt.subplots()

        for files in os.listdir(f"data/{room}"):
            if not files.startswith(test) or files.startswith(test + "0"):
                # Only use the files for this test
                continue

            suffix = files[len(test):]
            filename = f"data/{room}/{test}{suffix}"

            with open(filename, 'r') as f:
                data = json.load(f)

            time = data["time"]
            fps = data["fps"]
            raf = data["raf"]

            fps_ax.plot(time, fps, label=f"Test {i}")
            raf_ax.plot(time, raf, label=f"Test {i}")
            i += 1

        name = test.replace("algo", "").replace("_", " ").capitalize().strip()
        amount = name.split(" ")[-1]
        npc = "NPC" if amount == "1" else "NPCs"

        fps_ax.set(xlabel='Tijd (s)', ylabel='Framerate (fps)',
                   title=f'Framerate per tijd voor {room} met {name} {npc}',
                   ylim=(0, 60),
                   xlim=(3, 17),
                   xticks=np.arange(3, 14, 1))

        fps_ax.legend()

        raf_ax.set(xlabel='Tijd (s)', ylabel='Latency (rAF)',
                   title=f'Latency per tijd voor {room} met {name} {npc}',
                   xlim=(3, 17),
                   xticks=np.arange(3, 14, 1))

        raf_ax.legend()

        fps_fig.savefig(f"{room}_{test}_fps.png")

        raf_fig.savefig(f"{room}_{test}_raf.png")
