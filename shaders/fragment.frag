precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
const vec3 background = vec3(24.0 / 255.0, 24.0 / 255.0, 37.0 / 255.0);
const vec3 element = vec3(17.0 / 255.0, 17.0 / 255.0, 27.0 / 255.0);
const vec3 text = vec3(205.0 / 255.0, 214.0 / 255.0, 244.0 / 255.0);
const vec3 secondaryText = vec3(186.0 / 255.0, 194.0 / 255.0, 222.0 / 255.0);
const vec3 line = vec3(108.0 / 255.0, 112.0 / 255.0, 134.0 / 255.0);
const vec3 primary = vec3(137.0 / 255.0, 180.0 / 255.0, 250.0 / 255.0);
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
        mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
    );
}

float fbm(vec2 p) {
    const mat2 rot = mat2(0.80, 0.60, -0.60, 0.80);
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p = rot * p * 2.01;
        a *= 0.5;
    }
    return v;
}

float warpedFbm(vec2 p, float t) {
    vec2 q = vec2(
    fbm(p + vec2(0.0, 0.0) + t * 0.12),
    fbm(p + vec2(5.2, 1.3) + t * 0.10)
    );
    vec2 r = vec2(
    fbm(p + 4.0 * q + vec2(1.7, 9.2) + t * 0.08),
    fbm(p + 4.0 * q + vec2(8.3, 2.8) + t * 0.06)
    );
    return fbm(p + 4.0 * r);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = vec2(uv.x * aspect, uv.y) * 2.5;

    float t = u_time * 0.4;
    float val = warpedFbm(p, t);

    float v = smoothstep(0.4, 0.85, val);

    vec3 col = background;
    col = mix(col, primary, smoothstep(0.0,  0.55, v));
    col = mix(col, text, smoothstep(0.5,  0.85, v) * 0.45);
    col = mix(col, secondaryText, smoothstep(0.75, 1.0,  v) * 0.30);
    col = mix(col, line, smoothstep(0.88, 1.0,  v) * 0.20);

    gl_FragColor = vec4(col, 1.0);
}
