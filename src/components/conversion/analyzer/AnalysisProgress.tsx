
import { Progress } from "@/components/ui/progress";

interface AnalysisProgressProps {
  progress: number;
  currentFile: string;
}

export function AnalysisProgress({ progress, currentFile }: AnalysisProgressProps) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span>{currentFile}</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}
