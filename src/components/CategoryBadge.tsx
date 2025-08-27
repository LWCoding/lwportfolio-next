import { GameCategory, CATEGORY_CONFIG } from '@/hooks/useFeaturedGames';

interface CategoryBadgeProps {
  category: GameCategory;
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const config = CATEGORY_CONFIG[category];
  
  return (
    <div 
      className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full border border-border/50 shadow-sm"
      title={config.label}
    >
      <span className="text-lg">{config.symbol}</span>
    </div>
  );
}
