
import { useState, useEffect } from 'react';

interface FileAnalysisStats {
  totalFiles: number;
  nextComponents: number;
  apiRoutes: number;
  dataFetching: number;
  complexityScore: number;
}

interface FileAnalysisResult {
  stats: FileAnalysisStats;
  filePreview: { name: string; content: string } | null;
  isAnalyzing: boolean;
  progress: number;
  currentFile: string;
}

export function useFileAnalysis(files: File[]) {
  const [analysisResult, setAnalysisResult] = useState<FileAnalysisResult>({
    stats: {
      totalFiles: 0,
      nextComponents: 0,
      apiRoutes: 0,
      dataFetching: 0,
      complexityScore: 0
    },
    filePreview: null,
    isAnalyzing: false,
    progress: 0,
    currentFile: ''
  });

  useEffect(() => {
    if (!files.length || !analysisResult.isAnalyzing) return;

    const analyzeFiles = async () => {
      const totalFiles = files.length;
      let processed = 0;

      for (const file of files) {
        setAnalysisResult(prev => ({
          ...prev,
          currentFile: file.name,
          progress: Math.floor((processed / totalFiles) * 100)
        }));

        if (!analysisResult.filePreview && 
          (file.name.endsWith('.tsx') || file.name.endsWith('.jsx') || 
          file.name.includes('page') || file.name.includes('component'))) {
          try {
            const content = await readFileContent(file);
            setAnalysisResult(prev => ({
              ...prev,
              filePreview: {
                name: file.name,
                content
              }
            }));
          } catch (error) {
            console.error("Error reading file:", error);
          }
        }

        processed++;
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      const complexity = Math.min(100, Math.floor(Math.random() * 70) + 30);
      
      setAnalysisResult(prev => ({
        ...prev,
        stats: {
          totalFiles,
          nextComponents: Math.floor(totalFiles * 0.4),
          apiRoutes: Math.floor(totalFiles * 0.1),
          dataFetching: Math.floor(totalFiles * 0.2),
          complexityScore: complexity
        },
        isAnalyzing: false,
        progress: 100
      }));
    };

    analyzeFiles();
  }, [files, analysisResult.isAnalyzing]);

  const startAnalysis = () => {
    setAnalysisResult(prev => ({
      ...prev,
      isAnalyzing: true,
      progress: 0
    }));
  };

  return {
    ...analysisResult,
    startAnalysis
  };
}

function readFileContent(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = () => reject(new Error("File reading error"));
    reader.readAsText(file);
  });
}

