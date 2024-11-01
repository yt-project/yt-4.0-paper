import yt
ds = yt.load_sample("SecondOrderTets", step=-1, displacements = {'connect1': ([1.0, 1.0, 1.0], [0.0,0.0,0.0])})

s1 = yt.SlicePlot(ds, "z", ("all", "ux"), center=[0.0, 0.0, 3.0])
s1.annotate_mesh_lines(color = 'k')
s1.set_zlim(("all", "ux"), -1.5e-2, 1.5e-2)
s1._setup_plots()
s2_ax = s1.plots["all","ux"].axes.inset_axes([0.8, 0.8, 0.15, 0.15])
s2 = yt.SlicePlot(ds, "z", ("all", "ux"), center=[0.0, 2.0, 3.0])
s2.plots["all", "ux"].axes = s2_ax
s2.zoom(25)
s2.pan_rel((0.0, -0.4))
s2.annotate_mesh_lines(color = 'k', linewidth=0.5)
s2.set_zlim(("all", "ux"), -1.5e-2, 1.5e-2)
s2._setup_plots()
s2_ax.set_xticklabels([])
s2_ax.set_yticklabels([])
s2_ax.set_xlabel("")
s2_ax.set_ylabel("")
bounds = s2.xlim[0], s2.ylim[0], s2.xlim[1]-s2.xlim[0], s2.ylim[1]-s2.ylim[0]
rect, conn = s1.plots["all", "ux"].axes.indicate_inset(bounds, s2_ax, edgecolor='k', linewidth=1.0)
conn[0].set_visible(True)
conn[1].set_visible(True)
s1.plots["all", "ux"].figure.savefig("fem_example.png")
