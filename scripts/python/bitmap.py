from __future__ import print_function
from PIL import Image
import numpy as np
import sys

im = Image.open("zone-test.bmp")
# print(im.format, im.size, im.mode)

p = np.array(im)

zones = []

for row in p:
	for col in row:
		if np.all(col == 255):
			zones.append(1)
		elif np.any(col == 255):
			zones.append(2)
		else: 
			zones.append(3)

np.set_printoptions(threshold=sys.maxsize)
print(zones)