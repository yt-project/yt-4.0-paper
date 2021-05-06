const arbre =
    "710e0d710f0f72111272121573131874141a74151d75161f7516227617247618" +
    "27771929771a2c781b2e781c31791c33791d367a1e387a1f3a7b203d7b203f7c" +
    "21427c22447d22477d23497e244c7e254e7f25507f26537f265580275880285a" +
    "81285d81295f822962822a64832b67832b69842c6c842c6e842d71852d73852e" +
    "76862e78862f7b872f7e872f8087308388308688318889318b89328e8932908a" +
    "32938a33968a33998b339c8b349e8b34a18c35a48c35a78c35aa8d36ad8d36b0" +
    "8d37b38d37b68d38b88d38bb8e39be8e39c18e3ac48e3ac78e3bca8d3ccd8d3c" +
    "d08d3dd28d3ed58c3fd88c40da8c41dd8b42df8b44e18a45e48946e68848e888" +
    "49ea874beb864ded854eee8450f08252f18154f28056f37f58f37d5af47c5cf4" +
    "7a5ef57960f57762f57664f57466f47268f4716af46f6cf36e6ef36c70f26a72" +
    "f26974f16775f06577ef6479ee627bed617ced5f7eec5e80eb5c81ea5b83e959" +
    "84e85886e75787e65589e5548ae4538ce2528de1508ee04f90df4e91de4d92dd" +
    "4c94dc4b95db4a96da4997d94899d9479ad8469bd7459cd6449dd5449fd443a0" +
    "d342a1d241a2d141a3d040a4d03fa5cf3ea7ce3ea8cd3da9cc3caacb3cabcb3b" +
    "acca3aadc93aaec839afc839b0c738b1c637b2c536b3c436b4c435b6c334b7c2" +
    "34b8c133b9c032bac032bbbf31bcbe30bdbd2fbebc2fbfbb2ec0ba2dc1b92dc2" +
    "b82cc3b82bc4b72bc5b62ac6b42ac7b329c8b229c9b128cbb028ccaf28cdae28" +
    "cead28cfab29d0aa29d1a929d2a72ad3a62bd4a52cd5a32dd6a22ed7a030d79f" +
    "31d89d33d99b35da9a37db9839dc963bdd943ede9340df9143e08f45e08d48e1" +
    "8b4be2894ee38751e48554e48357e5815ae67e5de67c61e77a64e87867e8756b" +
    "e9736eea7172ea6e75eb6c79eb697cec6780ec6483ed6287ed5f8bee5d8fee5a" +
    "92ee5896ef559aef529eef50a1f04da5f04ba9f048adf045b1f043b4f140b8f1" +
    "3ebcf13bc0f139c3f137c7f134cbf132cff131d2f12fd6f12ddaf12cddf12ce1" +
    "f12be4f12be7f12cebf12deef12ff1f131f4f134f7f138f9f13cfcf140fef245";

const L = 200;
const intersectionRadius = 3;
const Nrays = 10;

var grids = [];
var planes = [];

var cellStyle = {
    strokeColor: "#000000",
    fillColor: "#FFFFFF"
};

var intersectionStyle = {
    fillColor: "#FF0000"
};

var rayStyle = {
    strokeColor: "#00000055"
}

var frameStyle = {
    strokeColor: "#000000",
    fillColor: "#FFFFFF"
}

var plotStyle = {
    strokeColor: "#000000"
}

class RayPlane {

    constructor(start, stop, Nrays, rayPlot) {
        this.rays = [];
        this.rayPlot = rayPlot;
        this.planeElement = new Path.Line(start, stop);
        this.planeElement.strokeColor = "#000000";
        this.planeElement.strokeWidth = 5;
        this.c1 = new Path.Circle(start, 5);
        this.c1.fillColor = "#000000";
        this.c2 = new Path.Circle(stop, 5);
        this.c2.fillColor = "#000000";
        this.c1.onMouseDrag = this.c2.onMouseDrag = this.dragPoint.bind(this);
        this.rayPlaneGroup = new Group([this.planeElement, this.c1, this.c2])
        this.planeElement.onMouseDrag = this.dragPlane.bind(this);
        for (let i = 0; i < Nrays ; i++) {
            this.rays.push(new Ray());
        }
        this.updateRays();
    }

    dragPlane(event) {
        this.rayPlaneGroup.position += event.delta;
        this.updateRays();
    }

    dragPoint(event) {
        event.target.position += event.delta;
        this.planeElement.firstSegment.point = this.c1.position;
        this.planeElement.lastSegment.point = this.c2.position;
        this.updateRays();
    }

    updateRays() {
        var N = this.rays.length;
        var dt = this.planeElement.length / (N - 1);
        this.rays.forEach( (ray, i) => {
            var p = this.planeElement.getPointAt(i*dt);
            var n = this.planeElement.getNormalAt(i*dt);
            // trace their intersection
            ray.start = p;
            ray.stop = p + n * L;
            ray.trace();
        });
        this.rayPlot.updatePlots();
    }
}

class Ray {
    constructor() {
        this.lineElement = new Path.Line({x: 0, y: 0}, {x: 0, y: 0});
        this.lineElement.style = rayStyle;
        this.intersections = new Group(); 
        this.data = [];
    }

    set start(p) {
        this.lineElement.firstSegment.point = p;
    }

    get start() {
        return this.lineElement.firstSegment.point;
    }

    set stop(p) {
        this.lineElement.lastSegment.point = p;
    }

    get stop() {
        return this.lineElement.lastSegment.point;
    }

    trace() {
        // This is the slowest part, which may still be OK and not too slow.
        this.intersections.removeChildren();
        this.data.length = 0;
        for (const grid of grids) {
            for (const cell of grid.cellElement.getItems({overlapping: this.lineElement.bounds})) {
                var times = [];
                const cellInts = this.lineElement.getIntersections(cell);
                if (cellInts.length < 2) {
                    if (cell.contains(this.lineElement.firstSegment.point)) {
                        times.push(0.0);
                    }
                    if (cell.contains(this.lineElement.lastSegment.point)) {
                        times.push(1.0);
                    }
                }
                for (const intersection of cellInts) {
                    var c = new Path.Circle(intersection.point, intersectionRadius)
                    c.style = intersectionStyle;
                    this.intersections.addChild(c);
                    times.push(intersection.time);
                }
                if (times.length > 0) {
                    this.data.push({
                        i: cell.cellIndex[0], j: cell.cellIndex[1],
                    dt: Math.abs(times[0] - times[1]),
                    t0: Math.min(times[0], times[1]),
                    t1: Math.max(times[0], times[1]),
                    v: cell.cellValue
                });
                }
            }
        }
        this.data.sort((d1, d2) => d1.t0 - d2.t0);
        var total = 0.0;
        this.data.forEach(d => {d.startTotal = total; total += d.dt * d.v; d.endTotal = total;});
    }
}

class GridPatch {
    constructor(origin, size, nx, ny) {
        this.cells = [];
        this.cellElement = new Group();
        this.plane = [];
        var point = origin.clone();
        for (var i = 0; i < nx ; i++) {
            point.y = origin.y;
            var row = [];
            this.cells.push(row);
            for (var j = 0; j < ny ; j++) {
                var cell = new Path.Rectangle(point, size);
                cell.style = cellStyle;
                var v = Math.pow((i*i) + (j*j), 0.5) / Math.pow((nx - 1) * (nx - 1) + (ny -1) * (ny - 1), 0.5);
                cell.style.fillColor = colormap(v);
                cell.cellIndex = [i, j];
                cell.cellValue = v;
                this.cells[i].push(cell)
                this.cellElement.addChild(cell);
                point.y += size.height;
            }
            point.x += size.width;
        }
        this.cellElement.onMouseDrag = this.dragGrid.bind(this);

    }

    dragGrid(event) {
        this.cellElement.position += event.delta;
        for (const p of planes) {
            for (const r of p.rays) {
                r.trace();
            }
        }
    }
}

class RayPlot {
    constructor(origin, size) {
        this.origin = origin;
        this.size = size;
        this.frame = new Path.Rectangle(origin, size);
        this.frame.style = frameStyle;
        this.lines = [];
    }

    updatePlots() {
        var i = 0;
        for (const plane of planes) {
            for (const r of plane.rays) {
                if (this.lines.length <= i) {
                    var p = new Path([]);
                    p.style = plotStyle;
                    this.lines.push(p);
                }
                var p = this.lines[i];
                p.removeSegments();
                for (const seg of r.data) {
                    p.add([this.xScale(seg.t0), this.yScale(seg.startTotal)],
                        [this.xScale(seg.t1), this.yScale(seg.endTotal)]);
                }
                i += 1;
            }
        }
        this.lines.length = i;
    }

    xScale(x) {
        return this.origin.x + x * this.size.width;
    }

    yScale(y) {
        return this.origin.y + (1.0 - y) * this.size.height;
    }
}

var grid1 = new GridPatch(new Point(200, 160), new Size(20, 20), 24, 20);
//var grid2 = new GridPatch(new Point(300, 160), new Size(25, 25), 8, 5);

grids.push(grid1);
//grids.push(grid2);

var rp = new RayPlot(
    {
        x: grid1.cellElement.bounds.right + 20,
        y: grid1.cellElement.bounds.top
    },
    { width: 300, height: 300 }
);

var plane = new RayPlane({x: 140, y: 180}, {x: 340, y: 380}, Nrays, rp);
planes.push(plane);

// this is the arbre colormap
function colormap(v) {
    const n = arbre.length / 6;
    const i = Math.min(Math.max(Math.floor(v * arbre.length / 6), 0), n - 1);
    // each bin is 6 characters, so
    return new Color("#" + arbre.slice(i * 6, (i + 1) * 6));
}
