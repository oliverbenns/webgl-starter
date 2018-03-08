#ifdef GL_ES
  precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_millis;

const int PARTICLES = 18;
const float ENERGY = 0.2;
const float BLOBINESS = 1.6;
const float BRIGHTNESS = 1.1;
const float OFFSET = 30000.0;

float rand(vec2 co) {
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main(void) {
  vec2 pixel = (gl_FragCoord.xy / u_resolution.x);
  float t = (u_millis + OFFSET ) * 0.001 * ENERGY;

  float a = 0.0;
  float b = 0.0;
  float c = 0.0;

  vec2 particle;
  vec2 center = vec2(0.5, 0.5 * (u_resolution.y / u_resolution.x));

  float na, nb, nc, nd, d;
  float size = float(PARTICLES);
  float step = 1.0 / size;
  float n = step;

  for (int i = 0; i < PARTICLES; i++) {
    vec2 np = vec2(n, 0.0);

    na = rand(np * 1.1);
    nb = rand(np * 2.8);
    nc = rand(np * 0.7);
    nd = rand(np * 3.2);

    particle = center;
    particle.x += sin(t*na) * cos(t*nb) * 0.6;
    particle.y += cos(t*nc) * sin(t*nd) * 0.4;

    d = pow(1.2 * na / length(particle - pixel), BLOBINESS);

    if (float(i) < size * 0.3333) {
      a += d;
    } else if (float(i) < size * 0.6666) {
      b += d;
    } else {
      c += d;
    }

    n += step;
  }

  vec3 col = vec3(a*c, b*c, a*b) * 0.0001 * BRIGHTNESS;
  gl_FragColor = vec4(col, 1.0);
}
