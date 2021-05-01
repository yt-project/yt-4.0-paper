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

class RayPlane{

    constructor(start, stop, Nrays) {
        this.rays = [];
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
        })
        globals.updateRays();
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
                cell.style.fillColor = globals.cellColor(v);
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
        globals.updateRays();
    }
}

var grid1 = new GridPatch(new Point(200, 160), new Size(20, 20), 24, 20);
//var grid2 = new GridPatch(new Point(300, 160), new Size(25, 25), 8, 5);

grids.push(grid1);
//grids.push(grid2);

var plane = new RayPlane({x: 140, y: 180}, {x: 340, y: 380}, Nrays);
globals.setupPlots();
planes.push(plane);

globals.plane = plane;
