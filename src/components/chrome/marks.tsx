export function PixelStar({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 8 8"
      aria-hidden="true"
      className={className}
      shapeRendering="crispEdges"
    >
      <rect x="3" y="0" width="2" height="8" fill="currentColor" />
      <rect x="0" y="3" width="8" height="2" fill="currentColor" />
      <rect x="1" y="1" width="1" height="1" fill="currentColor" />
      <rect x="6" y="1" width="1" height="1" fill="currentColor" />
      <rect x="1" y="6" width="1" height="1" fill="currentColor" />
      <rect x="6" y="6" width="1" height="1" fill="currentColor" />
    </svg>
  );
}

export function PixelCross({ className = "" }: { className?: string }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 5 5"
      aria-hidden="true"
      className={className}
      shapeRendering="crispEdges"
    >
      <rect x="2" y="0" width="1" height="5" fill="currentColor" />
      <rect x="0" y="2" width="5" height="1" fill="currentColor" />
    </svg>
  );
}
