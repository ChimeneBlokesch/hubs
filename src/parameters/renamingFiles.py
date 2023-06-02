import os

if __name__ == "__main__":
    base_path = "NPCs/"

    for algo in os.listdir(base_path):
        if not os.path.isdir(os.path.join(base_path,algo)):
            continue

        for moveable in ["standing", "walking"]:
            if not os.path.isdir(os.path.join(base_path,algo,moveable)):
                continue

            rel_folder = os.path.join(base_path,algo,moveable)

            for test_folder in os.listdir(rel_folder):
                abs_file = os.path.abspath(os.path.join(base_path,algo,moveable,test_folder, "parameters.json"))
                new_file = os.path.abspath(os.path.join(base_path,algo,test_folder + ".json"))
                print(os.path.exists(abs_file),abs_file)
                print(os.path.exists(new_file),new_file)
                print()

                os.rename(abs_file, new_file)
