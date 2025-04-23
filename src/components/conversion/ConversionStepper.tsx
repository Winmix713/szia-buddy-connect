import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ConversionStepperProps {
  currentStep: number;
  totalSteps: number;
}

export function ConversionStepper({ currentStep, totalSteps }: ConversionStepperProps) {
  const steps = [
    { name: "Analysis", description: "Analyzing your Next.js project" },
    { name: "Conversion", description: "Converting to Vite" },
    { name: "Download", description: "Ready for download" }
  ];

  return (
    <div className="py-8">
      <div className="flex items-center justify-between w-full max-w-3xl mx-auto">
        {steps.map((step, index) => {
          const isCompleted = index + 1 < currentStep;
          const isActive = index + 1 === currentStep;
          
          return (
            <div key={index} className="flex flex-col items-center relative w-1/3">
              <motion.div 
                className={`h-10 w-10 rounded-full flex items-center justify-center font-medium transition-colors duration-200
                  ${isCompleted 
                    ? 'bg-primary text-primary-foreground' 
                    : isActive 
                    ? 'bg-primary/80 text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'}`}
                initial={{ scale: 1 }}
                animate={{ 
                  scale: isActive ? [1, 1.05, 1] : 1,
                  transition: {
                    duration: 0.5,
                    repeat: isActive ? Infinity : 0,
                    repeatType: "reverse",
                  }
                }}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </motion.div>
              <div className="text-sm mt-2 font-medium">{step.name}</div>
              <div className="text-xs text-muted-foreground">{step.description}</div>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div 
                  className={`absolute top-5 left-1/2 h-0.5 w-full ${isCompleted ? 'bg-primary' : 'bg-muted'}`}
                  style={{ width: 'calc(100% - 2.5rem)', left: '60%' }}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}