const createBuffer = gl => {
  // Create and initialize buffer
  const geometryBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, geometryBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1.0, -1.0,
     1.0, -1.0,
    -1.0,  1.0,
     1.0,  1.0
  ]), gl.STATIC_DRAW);

  return geometryBuffer;
}

export default createBuffer;
