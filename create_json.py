import csv
import json
#width, height, headLength, shaftHeight, color, xPadding, yPadding
schedule = {
    "shed1": {
       "name": "Shed One",
       "width": 683,
       "height": 100,
       "headLength": 0.133,
       "shaftHeight": 0.8,
       "color": "#42a4f4",
        "x": 341,
        "y": 78,
        "rotation": 0,
        "sessions": []
    },
    "shed2": {
        "name": "Shed Two",
        "width": 683,
        "height": 100,
        "headLength": 0.133,
        "shaftHeight": 0.8,
        "color": "#65e03c",
        "x": 341,
        "y": 196,
        "rotation": 0,
        "sessions": []
    },
    "talk1": {
        "name": "Learning Forum One",
        "width": 683,
        "height": 100,
        "headLength": 0.133,
        "shaftHeight": 0.8,
        "color": "#e84717",
        "x": 341,
        "y": 314,
        "rotation": 0,
        "sessions": []
    },
    "talk2": {
        "name": "Learning Forum Two",
        "width": 683,
        "height": 100,
        "headLength": 0.133,
        "shaftHeight": 0.8,
        "color": "#ea3e75",
        "x": 341,
        "y": 432,
        "rotation": 0,
        "sessions": []
    },
    "talk3": {
        "name": "Learning Forum Three",
        "width": 683,
        "height": 100,
        "headLength": 0.133,
        "shaftHeight": 0.8,
        "color": "#fff72b",
        "x": 341,
        "y": 550,
        "rotation": 0,
        "sessions": []
    },
    "gallery": {
        "name": "Gallery",
        "width": 683,
        "height": 100,
        "headLength": 0.133,
        "shaftHeight": 0.8,
        "color": "#ffffff",
        "x": 341,
        "y": 668,
        "rotation": 0,
        "sessions": []
    },
    "library": {
        "name": "Library",
        "width": 690,
        "height": 100,
        "headLength": 0.133,
        "shaftHeight": 0.8,
        "color": "#cccccc",
        "x": 200,
        "y": 78,
        "rotation": 90,
        "sessions": []
    },
}


with open("data/sessions.csv") as file:
    reader = csv.reader(file)
    next(reader)
    for line in reader:
        startTime = line[0]
        endTime = line[1]
        space = line[2]
        name = line[3]
        if(name != ""):
           schedule[space]["sessions"].append({
               "startTime": startTime,
               "endTime": endTime,
               "name": name
           });

with open("data/sessions.json", "w") as file:
    json.dump(schedule, file)
