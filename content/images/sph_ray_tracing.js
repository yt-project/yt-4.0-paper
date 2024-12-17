var particles = [
    { cx:65, cy:135, r:50},
    { cx:150, cy:175, r:35 },
    { cx:185, cy:130, r:7},
    { cx:160, cy:115, r:10},
    { cx:235, cy:90, r:40},
    { cx:215, cy:30, r:20},
    { cx:425, cy:45, r:40},
    { cx:280, cy:140, r:25 },
    { cx:350, cy:125, r:20 },
    { cx:410, cy:150, r:30},
    { cx:330, cy:180, r:35},
    { cx:255, cy:315, r:55},
    { cx:475, cy:240, r:60},
    { cx:650, cy:215, r:85},
    { cx:570, cy:45, r:45},
    { cx:705, cy:45, r:35},
];
const hitOptions = {
	segments: true,
	stroke: true,
	fill: true,
	tolerance: 5
};
function recalculateIntersections() {
    for (const particle of particleGroup.children) {
        if (rayLine.intersects(particle)) {
            particle.fillColor.gradient.stops = ['red','white'];
            particle.data.line.lastSegment.point = rayLine.getNearestPoint(particle.position);
            particle.data.line.strokeColor = 'black';
        } else {
            particle.fillColor.gradient.stops = ['black', 'white'];
            particle.data.line.strokeColor = null;
        }
    }
}

const particleGroup = new Group();

for (i = 0; i< particles.length; i++) {
    const particle = particles[i];
    var myCircle = new Path.Circle(new Point(particle.cx, particle.cy), particle.r);
    myCircle.data.line = new Path.Line(myCircle.position, myCircle.position + new Point(0, particle.r))
    myCircle.data.line.strokeWidth = 3;
    myCircle.data.radius = particle.r;
    myCircle.fillColor = {
        gradient: {
            stops: ['black', 'white'],
        radial: true},
        
        origin: myCircle.position,
        destination: myCircle.bounds.rightCenter
    };
    particleGroup.addChild(myCircle);
}

const rayPoints = [new Point(50, 50), new Point(200, 50)];
const rayLine = new Path.Line(rayPoints[0], rayPoints[1]);
const rayStart = new Path.Circle(rayPoints[0], 8);
const rayStop = new Path.Circle(rayPoints[1], 8);
rayLine.strokeColor = 'darkgray';
rayLine.strokeWidth = 3;
rayStart.fillColor = 'red';
rayStop.fillColor = 'red';

function dragCircle(event) {
    event.target.position += event.delta;
    rayLine.firstSegment.point = rayStart.position;
    rayLine.lastSegment.point = rayStop.position;
    recalculateIntersections();
}

rayStart.onMouseDrag = rayStop.onMouseDrag = dragCircle;

function dragLine(event) {
    event.target.position += event.delta;
    rayStart.position = rayLine.firstSegment.point;
    rayStop.position = rayLine.lastSegment.point;
    recalculateIntersections();
}
rayLine.onMouseDrag = dragLine;
