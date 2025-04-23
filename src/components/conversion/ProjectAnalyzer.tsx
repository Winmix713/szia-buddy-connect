
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUploader } from "./FileUploader";
import { AnalysisProgress } from "./analyzer/AnalysisProgress";
import { AnalysisResults } from "./analyzer/AnalysisResults";
import { ComplexityBadge } from "./analyzer/ComplexityBadge";

interface ProjectAnalyzerProps {
  onFilesProcessed: (results: any) => void;
  files?: File[];
}

export function ProjectAnalyzer({ files = [], onFilesProcessed }: ProjectAnalyzerProps) {
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState("");
  const [stats, setStats] = useState({
    totalFiles: 0,
    nextComponents: 0,
    apiRoutes: 0,
    dataFetching: 0,
    complexityScore: 0
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [filePreview, setFilePreview] = useState<{name: string, content: string} | null>(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const filesToProcess = files.length > 0 ? files : selectedFiles;

  useEffect(() => {
    if (files.length > 0 && !isAnalyzing && progress === 0) {
      setIsAnalyzing(true);
    }
  }, [files, isAnalyzing, progress]);

  useEffect(() => {
    if (!isAnalyzing || !filesToProcess.length) return;
    
    const totalFiles = filesToProcess.length;
    let processed = 0;
    
    const analyzeNextFile = () => {
      if (processed >= totalFiles) {
        setTimeout(() => {
          const complexity = Math.min(100, Math.floor(Math.random() * 70) + 30);
          
          const results = {
            totalFiles,
            nextComponents: Math.floor(totalFiles * 0.4),
            apiRoutes: Math.floor(totalFiles * 0.1),
            dataFetching: Math.floor(totalFiles * 0.2),
            complexityScore: complexity
          };
          
          setStats(results);
          setIsAnalyzing(false);
          setAnalysisComplete(true);
          onFilesProcessed(results);
        }, 500);
        return;
      }
      
      const file = filesToProcess[processed];
      setCurrentFile(file.name);
      
      if (!filePreview && 
        (file.name.endsWith('.tsx') || file.name.endsWith('.jsx') || 
        file.name.includes('page') || file.name.includes('component'))) {
        readFileContent(file).then(content => {
          setFilePreview({
            name: file.name,
            content: content
          });
        }).catch(console.error);
      }
      
      processed++;
      const newProgress = Math.floor((processed / totalFiles) * 100);
      setProgress(newProgress);
      
      setTimeout(analyzeNextFile, 100);
    };
    
    analyzeNextFile();
  }, [isAnalyzing, filesToProcess, filePreview, onFilesProcessed]);

  const handleFileChange = (newFiles: File[]) => {
    setSelectedFiles(newFiles);
    setFilePreview(null);
    setProgress(0);
    setAnalysisComplete(false);
  };

  const handleStartAnalysis = () => {
    if (filesToProcess.length) {
      setProgress(0);
      setIsAnalyzing(true);
    }
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = () => reject(new Error("File reading error"));
      reader.readAsText(file);
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Analyze Next.js Project</CardTitle>
        <CardDescription>Upload your project files to analyze conversion complexity</CardDescription>
      </CardHeader>
      <CardContent>
        {filesToProcess.length === 0 ? (
          <FileUploader onFilesSelected={handleFileChange} isAnalyzing={isAnalyzing} />
        ) : (
          <div className="space-y-6">
            {isAnalyzing ? (
              <AnalysisProgress progress={progress} currentFile={currentFile} />
            ) : progress > 0 && analysisComplete ? (
              <AnalysisResults 
                stats={stats}
                filePreview={filePreview}
                onContinue={onFilesProcessed}
              />
            ) : (
              <div>
                <Button 
                  className="w-full" 
                  onClick={handleStartAnalysis}
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
