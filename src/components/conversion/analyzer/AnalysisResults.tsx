
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";
import CodePreview from "@/components/CodePreview";
import { FileStats } from "./FileStats";

interface AnalysisStats {
  totalFiles: number;
  nextComponents: number;
  apiRoutes: number;
  dataFetching: number;
  complexityScore: number;
}

interface AnalysisResultsProps {
  stats: AnalysisStats;
  filePreview: { name: string; content: string; } | null;
  onContinue: (results: AnalysisStats) => void;
}

export function AnalysisResults({ stats, filePreview, onContinue }: AnalysisResultsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
      
      <FileStats
        totalFiles={stats.totalFiles}
        nextComponents={stats.nextComponents}
        apiRoutes={stats.apiRoutes}
        dataFetching={stats.dataFetching}
      />
      
      <div className="mt-6">
        <h3 className="text-sm font-medium mb-2">Complexity Score</h3>
        <div className="flex items-center gap-2">
          <Progress value={stats.complexityScore} className="h-2" />
          <span className="text-sm font-medium">{stats.complexityScore}/100</span>
        </div>
      </div>
      
      {filePreview && (
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">Sample File Preview</h3>
          <CodePreview title={filePreview.name} code={filePreview.content} />
        </div>
      )}
      
      <div className="mt-6">
        <h3 className="text-sm font-medium mb-2">Next Steps</h3>
        <Button 
          className="bg-primary hover:bg-primary/90"
          onClick={() => onContinue(stats)}
        >
          Continue to Conversion 
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}

