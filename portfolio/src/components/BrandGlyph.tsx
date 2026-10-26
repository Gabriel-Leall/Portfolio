// The portfolio's GL monogram, expressed as two solid, editable vector contours.
export const brandPaths = [
  "M120 52H48V188H120V116H84V140H96V164H72V76H120Z",
  "M146 52H170V164H210V188H146Z",
] as const;

export default function BrandGlyph({ compact = false }: { compact?: boolean }) {
  return <svg viewBox={compact ? "40 44 178 152" : "0 0 256 240"} fill="currentColor" aria-hidden="true" focusable="false">
    {brandPaths.map((path, index) => <path d={path} key={index}/>)}
  </svg>;
}
