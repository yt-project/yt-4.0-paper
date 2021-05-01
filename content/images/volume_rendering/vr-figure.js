const L = 200;
const intersectionRadius = 3;

var intersectionStyle = {
    fillColor: "#FF0000"
};

var rayStyle = {
    strokeColor: "#00000055"
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

function traceRay(ray, rayData) {
    // This is the slowest part, which may still be OK and not too slow.
    rayData.removeChildren();
    for (const cell of bigCells.getItems({overlapping: ray.bounds})) {
        for (const intersection of cell.getIntersections(ray)) {
            var c = new Path.Circle(intersection.point, intersectionRadius)
            c.style = intersectionStyle;
            rayData.addChild(c);
        }   
    }
}

function updateRays(planePath, rays, rayData) {
    var N = rays.length;
    dt = planePath.length / (N - 1);
    rays.forEach( (ray, i) => {
        var p = planePath.getPointAt(i*dt);
        var n =planePath.getNormalAt( i * dt);
        ray.firstSegment.point = p;
        ray.lastSegment.point = p + n * L;
        // trace their intersection
        traceRay(ray, rayData[i]);
    })
}

function drawPlane(start, stop, Nrays) {
    var rays = [];
    var rayData = [];
    var plane = new Path.Line(start, stop);
    plane.strokeColor = "#000000";
    plane.strokeWidth = 5;
    c1 = new Path.Circle(start, 5);
    c1.fillColor = "#000000";
    c2 = new Path.Circle(stop, 5);
    c2.fillColor = "#000000";
    c1.onMouseDrag = c2.onMouseDrag = function(event) {
        this.position += event.delta;
        plane.firstSegment.point = c1.position;
        plane.lastSegment.point = c2.position;
        updateRays(plane, rays, rayData);
    }
    var rayPlane = new Group([plane, c1, c2])
    plane.onMouseDrag = function(event) {
        rayPlane.position += event.delta;
        updateRays(plane, rays, rayData);
    }
    for (let i = 0; i < Nrays ; i++) {
        var r = new Path.Line({x: 0, y: 0}, {x: 0, y: 0});
        r.style = rayStyle;
        rays.push(r);
        rayData.push(new Group());
    }
    updateRays(plane, rays, rayData);
    return {plane: rayPlane, rays: rays, rayData: rayData};
}

var bigCells = drawGrid(new Point(200, 160), new Size(50, 50), 14, 10);
var plane = drawPlane( {x: 140, y: 180}, {x: 340, y: 380}, 10);

bigCells.onMouseDrag = function(event) {
    bigCells.position += event.delta;
    for (let i = 0; i < plane.rayData.length; i++) {
        traceRay(plane.rays[i], plane.rayData[i]);
    }    
}

globals.plane = plane;