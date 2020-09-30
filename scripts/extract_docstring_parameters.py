# This script is meant to be run manually like this:
#
# python scripts/extract_docstring_parameters.py > content/21.data_object_subsections.md
# 

import textwrap
import yt
from yt.data_objects.data_containers import data_object_registry

replacement_dict = {
    "Activedimensions": "Active Dimensions",
    "Op": "Operation",
    " norm vec": "Normal vector",
    "Dobj1": "Data object 1",
    "Dobj2": "Data object 2",
    " obj list": "Object List",
    "N ref": "Particle count refinement criteria"
}

tw = textwrap.TextWrapper(drop_whitespace = True, replace_whitespace = True, fix_sentence_endings=True)
def extract_description(docstring):
    description = docstring[:docstring.find("Parameters")]
    return tw.fill(" ".join([_.strip() for _ in description.splitlines()]))

for n, obj in sorted(data_object_registry.items()):
    print("#### {} {{#sec:dobj-{}}}".format(n.replace("_", " ").capitalize(), n))
    print("\n*Arguments*: \n")
    for arg in obj._con_args:
        aname = arg.replace("_"," ").capitalize()
        print(" * {}".format(replacement_dict.get(aname, aname)))
    print("\n{}\n".format(extract_description(obj.__doc__).strip()))

