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
    ("gas", "velocity_cartesian_x"),
    ("gas", "velocity_cartesian_z"),
    color=("gas", "velocity_magnitude"),
    cmap="turbo",
    density=0.8,
    broken_streamlines=False,
)
p.annotate_line_integral_convolution(
    "magnetic_field_cartesian_x",
    "magnetic_field_cartesian_z",
    alpha=0.35,
)
p.save("content/images/spherical_data.png")
