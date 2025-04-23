
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUploader } from "./FileUploader";
import { AnalysisProgress } from "./analyzer/AnalysisProgress";
import { AnalysisResults } from "./analyzer/AnalysisResults";
import { ComplexityBadge } from "./analyzer/ComplexityBadge";
import { useFileAnalysis } from "@/hooks/useFileAnalysis";

interface ProjectAnalyzerProps {
  onFilesProcessed: (results: any) => void;
  files?: File[];
}

export function ProjectAnalyzer({ files = [], onFilesProcessed }: ProjectAnalyzerProps) {
  const {
    stats,
    filePreview,
    isAnalyzing,
    progress,
    currentFile,
    startAnalysis
  } = useFileAnalysis(files);

  const handleFileChange = (newFiles: File[]) => {
    files = newFiles;
    startAnalysis();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Analyze Next.js Project</CardTitle>
        <CardDescription>Upload your project files to analyze conversion complexity</CardDescription>
      </CardHeader>
      <CardContent>
        {files.length === 0 ? (
          <FileUploader onFilesSelected={handleFileChange} isAnalyzing={isAnalyzing} />
        ) : (
          <div className="space-y-6">
            {isAnalyzing ? (
              <AnalysisProgress progress={progress} currentFile={currentFile} />
            ) : progress > 0 ? (
              <AnalysisResults 
                stats={stats}
                filePreview={filePreview}
                onContinue={onFilesProcessed}
              />
            ) : (
              <div>
                <Button 
                  className="w-full" 
                  onClick={startAnalysis}
                >
                  Start Analysis
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
      {(stats.totalFiles > 0 || progress === 100) && (
        <CardFooter>
          <div className="w-full">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">Conversion Complexity</span>
              <ComplexityBadge score={stats.complexityScore} />
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

