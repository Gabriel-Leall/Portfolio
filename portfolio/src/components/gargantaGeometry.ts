// Authored from the supplied clip's stepped, asymmetric tear — no raster tracing.
type Point = { x: number; y: number };
type Profile = ReadonlyArray<readonly [number, number]>;
const upper: Profile = [
  [0,0],[.065,.015],[.065,.12],[.15,.10],[.15,.035],[.235,.055],
  [.235,.54],[.325,.50],[.325,.15],[.405,.14],[.405,.25],[.47,.22],
  [.47,.92],[.565,.86],[.565,.28],[.625,.30],[.625,.13],[.735,.16],
  [.735,.47],[.825,.42],[.825,.08],[.91,.055],[.91,.01],[1,0],
];
const lower: Profile = [
  [0,0],[.105,.02],[.105,.32],[.205,.35],[.205,.065],[.305,.08],
  [.305,.64],[.405,.59],[.405,.20],[.49,.18],[.49,.08],[.585,.11],
  [.585,.78],[.685,.70],[.685,.21],[.775,.18],[.775,.045],[.86,.065],
  [.86,.16],[.935,.12],[.935,.015],[1,0],
];
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const coord = (value: number) => value.toFixed(2);
const line = (points: Point[]) => points.map((point, i) => `${i ? "L" : "M"}${coord(point.x)},${coord(point.y)}`).join(" ");
const polygon = (points: Point[]) => `${line(points)} Z`;

export default function createGargantaGeometry(width: number, height: number) {
  const toothHeight = Math.min(height * .18, width * .15);
  const facetCount = (upper.length - 1) + (lower.length - 1);

  function frame(formation: number, opening: number, approach = 0) {
    const formed = clamp(formation);
    const opened = clamp(opening);
    const entered = clamp(approach);
    const span = width * (.025 + .82 * formed + 1.4 * entered);
    const left = (width - span) / 2;
    const bevelDepth = Math.min(24, width * .022) * formed * (1 + entered * .7);
    const edge = (profile: Profile, direction: number) => profile.map(([t, tooth]) => {
      const envelope = Math.sin(Math.PI * t) ** .45;
      // Each ledge separates at a different moment; both jaws never mirror each other.
      const activation = clamp(formed * 1.65 - Math.abs(t - .5) * .9);
      const gap = height * .27 * opened * envelope;
      const retreat = height * .78 * entered;
      const depth = (height * .0025 * formed + gap) * envelope
        + toothHeight * tooth * activation * (.4 + opened * .6) + retreat;
      return { x: left + span * t, y: height * .49 + direction * depth };
    });
    const top = edge(upper, -1);
    const bottom = edge(lower, 1);
    const aperturePoints = [...top, ...bottom.slice().reverse()];
    const facets = (points: Point[], direction: number) => points.slice(0, -1).map((point, i) => {
      const next = points[i + 1];
      // Small offset faces give the tear the folded/slab-like depth seen in the clip.
      const depth = bevelDepth * (.45 + (i % 5) * .12);
      const dx = depth * (i % 2 ? -.42 : .55);
      return polygon([point, next, { x: next.x + dx, y: next.y + depth * direction }, { x: point.x + dx, y: point.y + depth * direction }]);
    });
    return {
      aperture: polygon(aperturePoints), aperturePoints,
      rim: `${line(top)} ${line(bottom)}`,
      facets: [...facets(top, 1), ...facets(bottom, -1)],
    };
  }
  return { frame, facetCount };
}
