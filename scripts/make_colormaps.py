import numpy as np
import cmyt
import yt

colormaps = [ "algae", "apricity", "arbre", "dusk", "kelp", "octarine",
             "pastel", "pixel_blue", "pixel_green", "pixel_red", "xray"]

x = np.mgrid[0.0:1.0:512j]
ones = np.ones(64).astype("f8")

for colormap in colormaps:
    cmap = getattr(cmyt, colormap)
    v = cmap(x)[None, :, :] * ones[:, None, None]
    yt.write_bitmap(v, f"content/images/colormaps/{colormap}.png")
