'use strict';

// Create program
const canvas = document.getElementById("canvas");
const gl = canvas.getContext('webgl');
const program = webglUtils.createProgramFromScripts(gl, ['vertex-shader', 'fragment-shader']);

// Create and initialize buffer
const geometryBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, geometryBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
  -1.0, -1.0,
   1.0, -1.0,
  -1.0,  1.0,
   1.0,  1.0
]), gl.STATIC_DRAW);

// Set up attributes and uniforms
const attributes = {
  position: gl.getAttribLocation(program, 'a_position')
};

const uniforms = {
  resolution: gl.getUniformLocation(program, 'u_resolution'),
  millis: gl.getUniformLocation(program, 'u_millis')
};

// Set WebGL program here (we have only one)
gl.useProgram(program);

// Setup canvas
window.onresize = resize;
resize();

// Start rendering
requestAnimationFrame(draw);

// Resize canvas and viewport
function resize () {
  webglUtils.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}

// Draw frame
function draw (now) {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.bindBuffer(gl.ARRAY_BUFFER, geometryBuffer);

  gl.enableVertexAttribArray(attributes.position);
  gl.vertexAttribPointer(attributes.position, 2, gl.FLOAT, false, 0, 0);
  gl.uniform2f(uniforms.resolution, window.innerWidth, window.innerHeight);
  gl.uniform1f(uniforms.millis, now);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  requestAnimationFrame(draw);
}
