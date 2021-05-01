const L = 200;
const intersectionRadius = 3;

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
        for (const cell of bigCells.getItems({overlapping: this.lineElement.bounds})) {
            for (const intersection of cell.getIntersections(this.lineElement)) {
                var c = new Path.Circle(intersection.point, intersectionRadius)
                c.style = intersectionStyle;
                this.intersections.addChild(c);
            }   
        }
    }
}

function drawGrid(origin, size, nx, ny, margin) {
    margin = margin || 0;
    var cells = [];
    var point = origin.clone();
    var cellGroup = new Group();
    for (i = 0; i < nx ; i++) {
        point.y = origin.y;
        var row = [];
        cells.push(row);
        for (j = 0; j < ny ; j++) {
                var cell = new Path.Rectangle(point, size);
                cell.strokeColor = '#000000';
                cell.fillColor = '#FFFFFF';
                cell.cellIndex = [i, j];
                cells[i].push(cell)
                cellGroup.addChild(cell);
                point.y += size.height + margin;
        }
        point.x += size.width + margin;
    }
    return cellGroup;
}

var bigCells = drawGrid(new Point(200, 160), new Size(50, 50), 14, 10);
//var plane = drawPlane( {x: 140, y: 180}, {x: 340, y: 380}, 10);

var plane = new RayPlane({x: 140, y: 180}, {x: 340, y: 380}, 10);

bigCells.onMouseDrag = function(event) {
    bigCells.position += event.delta;
    for (const ray of plane.rays) {
        ray.trace();
    }    
}

globals.plane = plane;
