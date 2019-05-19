# cropimages by Oles Odynets. May 2019

from PIL import Image
import numpy as np
import os

targetDir = './target/'
outputDir = './output/'

_z = os.listdir(targetDir)
print("----- FILES TO PROCESS -----")
print(_z)
print("----- FILES TO PROCESS -----")
for ma in _z:
    if(ma == '.DS_Store'): continue

    ur = targetDir + ma
    print("Processing file %s..." % ur, ma)
    image = Image.open(ur)
    image.load()

    a = np.asarray(image)
    b = a.max(axis = 2)
    c = np.where(b.max(axis = 0) > 0)[0]
    d = np.where(b.max(axis = 1) > 0)[0]
    e = (min(d), max(d), min(c), max(c))

    f = a[e[0]:e[1] + 1, e[2]:e[3] + 1, :]

    g = Image.fromarray(f)
    g.save(outputDir + ma)

    print("%s: Success!" % ur)

print("[Success] All files were successfully processed!")