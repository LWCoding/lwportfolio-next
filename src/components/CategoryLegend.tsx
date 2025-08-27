import { CATEGORY_CONFIG } from '@/hooks/useFeaturedGames';

export default function CategoryLegend() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground mb-4">
      {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
        <div key={key} className="flex items-center gap-1.5">
          <span className="text-base">{config.symbol}</span>
          <span>{config.label}</span>
        </div>
      ))}
    </div>
  );
}
