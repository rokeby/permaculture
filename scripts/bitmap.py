from __future__ import print_function
from PIL import Image
import numpy as np
import sys

im = Image.open("./5-zone.bmp")
# print(im.format, im.size, im.mode)

p = np.array(im)

zones = []

for row in p:
	for col in row:
		# print(col)
		if np.array_equal(col, [0, 0, 0]):
			zones.append(1) #rocky is black
		elif np.array_equal(col, [255, 0, 0]):
			zones.append(2) #soil is red
		elif np.array_equal(col, [255, 255, 255]):
			zones.append(3) #trees are white
		elif np.array_equal(col, [0, 255, 0]):
			zones.append(4) #farm is green
		elif np.array_equal(col, [255, 255, 0]):
			zones.append(5) #path is yellow
		elif np.array_equal(col, [0, 255, 255]):
			zones.append(6) #water is cyan

np.set_printoptions(threshold=sys.maxsize)
print(zones)