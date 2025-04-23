import { SelectedFiles } from "./SelectedFiles";
import { ProjectAnalyzer } from "./ProjectAnalyzer";
import { RouteAnalyzer } from "./RouteAnalyzer";
import { ConversionDashboard } from "@/components/ConversionDashboard";
import { ConversionStepper } from "./ConversionStepper";

interface ConversionSectionProps {
  files: File[];
  isConverting: boolean;
  analysisComplete: boolean;
  currentStep: number;
  onStartConversion: () => void;
}

export function ConversionSection({
  files,
  isConverting,
  analysisComplete,
  currentStep,
  onStartConversion
}: ConversionSectionProps) {
  // Mock data for the project stats
  const projectData = {
    totalFiles: files.length || 30,
    nextJsComponents: 24,
    apiRoutes: 6,
    dataFetchingMethods: 12,
    complexityScore: 45
  };

  return (
    <div className="space-y-8">
      <ConversionStepper currentStep={currentStep} totalSteps={3} />
      
      {files.length > 0 && <SelectedFiles files={files} />}
      
      {currentStep === 1 && (
        <ProjectAnalyzer 
          onFilesProcessed={() => {}} 
          files={files}
        />
      )}
      
      {currentStep === 2 && (
        <RouteAnalyzer 
          files={files} 
          onRoutesAnalyzed={() => {}}
        />
      )}
      
      {currentStep === 3 && (
        <ConversionDashboard 
          projectData={projectData}
          onStartConversion={onStartConversion}
          isConverting={isConverting}
        />
      )}
    </div>
  );
}