const draw = (gl, now, state) => {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.bindBuffer(gl.ARRAY_BUFFER, state.geometryBuffer);

  gl.enableVertexAttribArray(state.attributes.position);
  gl.vertexAttribPointer(state.attributes.position, 2, gl.FLOAT, false, 0, 0);
  gl.uniform2f(state.uniforms.resolution, window.innerWidth, window.innerHeight);
  gl.uniform1f(state.uniforms.millis, now);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  requestAnimationFrame(now => draw(gl, now, state));
};

export default draw;
