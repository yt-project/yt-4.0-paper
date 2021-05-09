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

const galaxy = [
    [10,27,31,34,36,38,40,41,42,42,44,47,52,55,51,40,43,47,53,54,51,45,39,33,28,27,32,39,40,37,33,31],
    [22,39,44,47,51,53,55,57,58,59,59,61,66,70,69,62,48,49,55,58,56,49,42,34,29,30,37,45,45,41,38,36],
    [21,37,40,44,49,53,57,59,61,63,64,65,67,71,74,71,58,52,57,62,61,54,44,35,31,34,44,51,50,46,42,38],
    [26,40,41,43,46,51,56,61,64,67,69,70,70,72,77,79,71,59,60,66,66,58,47,37,33,40,51,57,55,50,44,38],
    [28,43,44,45,46,49,53,58,64,70,73,75,76,77,79,83,82,70,64,69,71,64,49,37,37,48,60,63,59,52,44,36],
    [19,39,44,47,49,50,52,55,60,68,77,84,85,84,84,86,89,83,71,74,76,69,52,38,42,57,67,67,61,52,42,33],
    [6,24,31,39,46,52,55,57,59,72,119,127,115,111,96,92,94,95,85,116,85,73,53,39,48,67,73,70,62,50,40,31],
    [5,22,26,32,38,46,53,60,64,95,162,175,164,151,164,146,105,105,132,208,178,86,56,41,59,76,78,71,61,48,38,30],
    [8,24,28,32,37,44,51,58,67,88,149,158,162,154,180,200,186,130,161,214,192,183,148,48,70,84,81,71,59,46,37,30],
    [17,33,36,40,44,50,56,63,69,81,114,136,150,200,223,220,247,233,155,196,198,199,209,86,83,90,82,69,56,45,37,31],
    [27,44,47,51,56,61,67,73,79,87,100,122,140,226,210,214,234,255,194,202,216,198,192,94,95,93,82,67,55,46,39,35],
    [34,51,55,59,64,69,74,79,85,94,118,161,212,255,249,249,194,239,233,229,223,189,153,87,107,94,79,65,55,48,44,41],
    [36,53,57,61,65,69,73,78,86,202,226,228,231,236,222,226,190,212,249,245,236,193,133,93,118,94,77,66,58,53,49,46],
    [37,54,56,59,61,65,70,78,186,247,215,217,217,194,133,141,168,211,219,223,225,201,125,112,123,91,77,69,62,57,53,49],
    [35,50,51,53,57,64,72,90,238,240,220,227,201,133,126,161,164,220,195,200,211,191,103,136,114,89,79,72,66,61,57,53],
    [29,44,46,52,58,66,75,127,243,218,207,197,202,175,164,156,147,204,169,163,183,202,186,149,102,90,82,76,70,65,60,55],
    [26,43,48,54,61,67,76,171,240,200,185,216,249,184,186,163,200,176,129,153,162,232,227,125,103,93,86,79,72,65,60,42],
    [27,45,51,56,61,67,77,143,249,211,188,224,238,219,225,207,205,149,119,155,169,246,224,125,105,93,84,76,68,62,57,39],
    [30,47,51,55,60,69,85,102,227,248,231,219,177,245,250,234,220,199,147,169,209,254,221,119,97,85,76,68,62,57,53,35],
    [31,47,50,55,62,74,87,91,93,217,254,224,122,187,241,250,195,168,211,239,227,245,192,98,87,78,70,63,58,53,49,32],
    [31,47,50,56,66,76,82,79,70,74,213,204,93,154,167,229,241,233,253,248,240,229,107,86,78,71,65,59,53,49,45,28],
    [31,47,51,58,67,74,75,68,61,67,205,192,137,149,153,199,229,203,227,252,221,121,74,68,64,59,55,51,47,43,39,23],
    [31,48,53,60,66,68,67,60,55,61,204,220,208,186,166,174,151,122,138,144,94,81,72,65,60,55,51,47,43,39,36,19],
    [32,49,54,59,62,62,59,53,49,53,160,225,204,178,170,153,104,93,86,84,82,78,73,67,62,57,52,47,43,38,35,18],
    [33,49,53,56,57,57,54,48,44,48,59,94,116,99,102,94,95,95,87,76,69,64,61,58,55,52,49,45,41,38,34,18],
    [33,48,51,52,52,51,48,43,39,43,53,64,73,79,89,90,85,88,90,84,73,62,55,50,47,44,42,39,37,34,32,16],
    [31,46,47,48,48,46,44,39,35,39,48,59,66,70,77,84,81,78,82,84,81,72,61,52,46,41,38,35,32,30,27,11],
    [28,42,44,44,43,42,40,35,31,34,43,54,61,64,65,73,78,74,72,75,78,76,69,60,51,43,37,33,30,27,24,8],
    [24,39,40,40,39,38,37,32,28,29,38,49,56,59,58,61,70,72,68,67,69,72,70,65,59,50,42,35,30,26,23,6],
    [20,35,36,36,35,35,33,29,25,26,33,45,52,55,54,51,56,64,66,63,62,64,65,64,61,55,49,41,33,27,22,6],
    [16,31,32,32,32,33,31,27,23,24,30,40,49,53,52,47,45,52,58,59,58,57,58,59,58,56,52,47,40,33,26,8],
    [0,15,16,16,16,17,15,12,8,8,13,23,32,37,36,32,41,43,49,55,55,54,53,54,54,53,51,48,44,38,32,13]
];
   

var L = 200;
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
};

var frameStyle = {
    strokeColor: "#000000",
    fillColor: "#FFFFFF"
};

var plotStyle = {
    strokeColor: "#000000",
    strokeWidth: 1.5
};

var rayBoxStyle = {
    strokeColor: "#999999",
    strokeWidth: 0.5
};

const _intCircle = new Path.Circle({x: 0, y:0}, intersectionRadius)
_intCircle.style = intersectionStyle;

const intersectionCircle = new SymbolDefinition(_intCircle);

class RayPlane {

    constructor(start, stop, Nrays, rayPlot, lineWidget) {
        this.rays = [];
        this.rayPlot = rayPlot;
        this.lineWidget = lineWidget;
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
            ray.stop = p + n * this.lineWidget.currentLength * L;
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
                    var c = intersectionCircle.place(intersection.point);
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
                //var v = Math.pow((i*i) + (j*j), 0.5) / Math.pow((nx - 1) * (nx - 1) + (ny -1) * (ny - 1), 0.5);
                var v = galaxy[i][j] / 255;
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
        this.boxes = [];
    }

    updateElements() {
        var i = 0;
        for (const plane of planes) {
            for (const r of plane.rays) {
                if (this.lines.length <= i) {
                    var p = new Path([]);
                    p.style = plotStyle;
                    this.lines.push(p);
                }
                i += 1;
            }
        }
        i = 0;
        for (const plane of planes) {
            for (const r of plane.rays) {
                if (this.boxes.length <= i) {
                    var b = new Path.Rectangle(
                        {
                            x: this.xScale(0),
                            y: this.yScale(0.0, i)
                        },
                        {
                            x: this.xScale(1.0),
                            y: this.yScale(1.0, i)
                        });
                    b.style = rayBoxStyle;
                    this.boxes.push(b);
                }
                i += 1;
            }
        }
        this.lines.length = i;
        this.boxes.length = i;
    }

    updatePlots() {
        var i = 0;
        for (const plane of planes) {
            for (const r of plane.rays) {
                var p = this.lines[i];
                p.removeSegments();
                for (const seg of r.data) {
                    p.add([this.xScale(seg.t0), this.yScale(seg.startTotal, i)],
                        [this.xScale(seg.t1), this.yScale(seg.endTotal, i)]);
                }
                i += 1;
            }
        }
    }

    xScale(x) {
        return this.origin.x + x * this.size.width;
    }

    yScale(y, i) {
        // total size for each plot is height divided by N segments
        // note that this gets all messed up when we resize the number of rays,
        // but updatePlots should work with resizing the number of rays, so, uh,
        // let's avoid that
        const height = this.size.height / this.lines.length;
        const offset = height * i;
        return this.origin.y + (1.0 - y) * height + offset;
    }
}

class LengthWidget {
    constructor (position, size, minLength, maxLength, currentLength, radius) {
        this.position = position;
        this.size = size;
        this.minLength = minLength;
        this.maxLength = maxLength;
        this.currentLength = currentLength;
        this.line = new Path.Line( position, new Point(position.x + size, position.y));
        this.line.style = {strokeColor: '#888888', strokeWidth: 2};
        const cPos = {x: position.x + size * (currentLength - minLength) / (maxLength - minLength),
                      y: this.line.position.y};
        this.circle = new Path.Circle(cPos, radius);
        this.circle.style = {fillColor: '#111111', strokeColor: '#444444'};
        this.circle.onMouseDrag = this.dragCircle.bind(this);
    }

    dragCircle(event) {
        var newPos = new Point({
            x: this.circle.position.x + event.delta.x,
            y: this.circle.position.y
        });
        newPos.x = Math.max(this.position.x, newPos.x);
        newPos.x = Math.min(this.position.x + this.size, newPos.x);
        this.circle.position = newPos;
        this.currentLength = this.minLength + (this.maxLength - this.minLength) * (this.circle.position.x - this.position.x)/this.size;
        for (const p of planes) {
            p.updateRays();
        }
    }
}

var grid1 = new GridPatch(new Point(200, 160), new Size(16, 16), 32, 32);
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

var lw = new LengthWidget(
    { x: rp.origin.x,
        y: rp.origin.y - 10 }
        , 300, 1.0, 10.0, 1.0, 5.0);

var plane = new RayPlane({x: 140, y: 180}, {x: 340, y: 380}, Nrays, rp, lw);
planes.push(plane);
rp.updateElements();

// this is the arbre colormap
function colormap(v) {
    const n = arbre.length / 6;
    const i = Math.min(Math.max(Math.floor(v * arbre.length / 6), 0), n - 1);
    // each bin is 6 characters, so
    return new Color("#" + arbre.slice(i * 6, (i + 1) * 6));
}
