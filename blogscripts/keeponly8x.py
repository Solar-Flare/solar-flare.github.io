import os

address = "/Users/kimsunghwan/Desktop/ProgrammingFiles/blogtestregion/style/open-iconic/png"

for filename in os.listdir(address):
    if "8x" not in filename:
        os.remove(address + "/" + filename)




