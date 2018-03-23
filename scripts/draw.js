console.log("Started");

// Connect to the nodeJs Server

io = io('http://localhost:8000');

var path;

// to define new path
function onMouseDown(event) {  
  path = createNewPath(event.point.x, event.point.y);
  emitNewPath(event.point.x, event.point.y);
}
function createNewPath(x, y) {
  return new Path({
    segments: [new Point(x, y)],
    strokeColor: 'black',
  });
}
// emit the new path point
function emitNewPath(x, y) {
  var sessionId = io.id;
  var data = {
    x: x,
    y: y,
    'id': sessionId
    // todo : add color
  };
  io.emit('createNewPath', data);
  //console.log("emit path ", data);
}

// Listen for 'createNewPath' events
io.on( 'createNewPath', function( data ) {
  //console.log("received");
  if (data.id != io.id) {
    path = createNewPath(data.x, data.y);
  }
});

// to draw the line
function onMouseDrag(event) {
  path.add(event.point);
  emitPoint(event.point.x, event.point.y);
}
function emitPoint(x, y) {
  var sessionId = io.id;
  var data = {
    x: x,
    y: y,
    'id': sessionId
    // color
  };
  io.emit( 'pointDrag', data);
  // console.log("emit point", data);
}
io.on( 'pointDrag', function( data ) {
  if (data.id != io.id) {
    path.add(new Point(data.x, data.y));
  }
});


