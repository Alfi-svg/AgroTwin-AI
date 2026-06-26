export function SkeletonGrid() {
  return <div className="skeleton-grid">{Array.from({ length: 8 }, (_, i) => <div className="skeleton-card" key={i} />)}</div>;
}
