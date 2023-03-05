function init(){
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    time = 1;

    cube = new Cube(gl, 6);
    render();
    requestAnimationFrame(render);
}


function render(){
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    var near = 0;
    var far = 1;
    time -= 1;

    var V = translate(0, 0, -0.5*(near + far));
    var P = perspective();
    R = rotate(time, [1, 1, 1]);

    cube.MV = R;
    
    cube.render();
    
    requestAnimationFrame(render);
}

window.onload = init;