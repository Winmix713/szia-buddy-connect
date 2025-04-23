import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, Sparkles } from "lucide-react";
import { FileUploader } from "@/components/conversion/FileUploader";

interface HeroProps {
  onStartAnalysis: (files: File[]) => void;
  isAnalyzing: boolean;
}

export function Hero({ onStartAnalysis, isAnalyzing }: HeroProps) {
  const [isUploaderVisible, setIsUploaderVisible] = useState(false);

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12 relative z-10"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            <span>Transform Your Next.js Projects with Ease</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Next.js to Vite Converter
            <span className="text-primary block mt-2">Smart. Fast. Simple.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Automatically convert your Next.js projects to Vite with intelligent code transformation, 
            preserving your components, routes, and API endpoints with precision.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setIsUploaderVisible(true)}
              disabled={isAnalyzing || isUploaderVisible}
              className="group"
            >
              <Upload className="mr-2 h-4 w-4 group-hover:animate-bounce" />
              Upload Project
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild
            >
              <a href="#how-it-works">
                How It Works
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </motion.div>

        {isUploaderVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="max-w-2xl mx-auto mt-10 bg-card border border-border rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Upload Your Next.js Project</h3>
              <FileUploader
                onFilesSelected={onStartAnalysis}
                isAnalyzing={isAnalyzing}
              />
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center max-w-3xl mx-auto"
        >
          {[
            { number: "10k+", label: "Projects Converted" },
            { number: "98%", label: "Success Rate" },
            { number: "2min", label: "Avg. Conversion Time" },
            { number: "24/7", label: "Support Available" }
          ].map((stat, index) => (
            <div key={index} className="p-4">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}