import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUploader } from "./FileUploader";
import CodePreview from "@/components/CodePreview";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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

  const getComplexityLabel = (score: number) => {
    if (score < 30) return { label: "Easy", color: "bg-green-100 text-green-800" };
    if (score < 60) return { label: "Moderate", color: "bg-yellow-100 text-yellow-800" };
    return { label: "Complex", color: "bg-red-100 text-red-800" };
  };

  const complexityInfo = getComplexityLabel(stats.complexityScore);

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
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>{currentFile}</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            ) : progress > 0 && analysisComplete ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                  <div className="bg-card p-4 rounded-lg border border-border shadow-sm">
                    <div className="text-sm text-muted-foreground">Total Files</div>
                    <div className="text-2xl font-semibold">{stats.totalFiles}</div>
                  </div>
                  <div className="bg-card p-4 rounded-lg border border-border shadow-sm">
                    <div className="text-sm text-muted-foreground">Next.js Components</div>
                    <div className="text-2xl font-semibold">{stats.nextComponents}</div>
                  </div>
                  <div className="bg-card p-4 rounded-lg border border-border shadow-sm">
                    <div className="text-sm text-muted-foreground">API Routes</div>
                    <div className="text-2xl font-semibold">{stats.apiRoutes}</div>
                  </div>
                  <div className="bg-card p-4 rounded-lg border border-border shadow-sm">
                    <div className="text-sm text-muted-foreground">Data Fetching</div>
                    <div className="text-2xl font-semibold">{stats.dataFetching}</div>
                  </div>
                </div>
                
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
                    onClick={() => onFilesProcessed(stats)}
                  >
                    Continue to Conversion 
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
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
              <div>
                <Badge className={complexityInfo.color}>
                  {complexityInfo.label}
                </Badge>
              </div>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
