import yt
import yt_idefix

ds = yt.load(
    "data.0092.vtk",
    units_override={
        "length_unit": (100, 'AU'),
        "mass_unit": (1, "Msun"),
    }
)
p = yt.SlicePlot(ds, "phi", "density")
p.annotate_streamlines(
    ("gas", "velocity_cylindrical_radius"),
    ("gas", "velocity_cylindrical_z"),
    color=("gas", "velocity_magnitude"),
    cmap="Greys_r",
    density=1,
    arrowsize=0.5,
    linewidth=0.7,
    broken_streamlines=False,
)
p.annotate_line_integral_convolution(
    "magnetic_field_cartesian_x",
    "magnetic_field_cartesian_z",
    alpha=0.3,
)
p.save("content/images/spherical_data.png")
