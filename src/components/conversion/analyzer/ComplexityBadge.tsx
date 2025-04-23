
import { Badge } from "@/components/ui/badge";

interface ComplexityBadgeProps {
  score: number;
}

export function ComplexityBadge({ score }: ComplexityBadgeProps) {
  const getComplexityLabel = (score: number) => {
    if (score < 30) return { label: "Easy", color: "bg-green-100 text-green-800" };
    if (score < 60) return { label: "Moderate", color: "bg-yellow-100 text-yellow-800" };
    return { label: "Complex", color: "bg-red-100 text-red-800" };
  };

  const complexityInfo = getComplexityLabel(score);

  return (
    <Badge className={complexityInfo.color}>
      {complexityInfo.label}
    </Badge>
  );
}
