import { useState } from "react";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ConversionSection } from "@/components/conversion/ConversionSection";
import { FAQ } from "@/components/home/FAQ";
import { CodeExample } from "@/components/home/CodeExample";

export default function HomePage() {
  const [isConverting, setIsConverting] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleStartAnalysis = (files: File[]) => {
    setUploadedFiles(files);
    setIsConverting(true);
    
    // Simulate analysis process
    setTimeout(() => {
      setAnalysisComplete(true);
      setCurrentStep(2);
    }, 2000);
  };

  const handleStartConversion = () => {
    setCurrentStep(3);
  };

  return (
    <div className="flex flex-col">
      <Hero onStartAnalysis={handleStartAnalysis} isAnalyzing={isConverting} />
      <Features />
      <HowItWorks />
      <CodeExample />
      <section id="convert" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <ConversionSection 
              files={uploadedFiles}
              isConverting={isConverting}
              analysisComplete={analysisComplete}
              currentStep={currentStep} 
              onStartConversion={handleStartConversion}
            />
          </div>
        </div>
      </section>
      <FAQ />
    </div>
  );
}