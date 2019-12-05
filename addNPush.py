import os
import random

inst1 = 'curl -X POST -d ' + '\'{"lat": ' + str(random.uniform(42.3,42.4)) + ', "lng": ' + str(random.uniform(9.1,9.2)) + ', "date": 1575406699080, "resource": "1.mp4"}\'' ' "https://pwa-iff-70a4f.firebaseio.com/snaps.json"'+';'
print(inst1)

os.system(inst1)

os.system("node pushServer;")