import os
import re

index = 0

dir = "./shield/"
extn = "shield"

for filename in os.listdir(dir):
	if('.DS_Store' in filename): continue

	index += 1

	_in = str(index)
	ext = re.match(r'[^\\]*\.(\w+)$', filename)
	ext = (ext and ext.group(1)) or ''

	new = extn + _in + '.' + ext

	os.rename(dir + filename, dir + new)
	print("File %s renamed: %s" % (filename, new))
# end

print("------- SUCCESS -------")
print("Affected: %d files" % index)
print("Target dir: %s" % dir)
print("------- SUCCESS -------")