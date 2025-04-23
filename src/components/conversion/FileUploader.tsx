import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  isAnalyzing: boolean;
}

export function FileUploader({ onFilesSelected, isAnalyzing }: FileUploaderProps) {
  const { toast } = useToast();
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      onFilesSelected(acceptedFiles);
      toast({
        title: "Files Selected",
        description: `${acceptedFiles.length} files selected for analysis.`,
      });
    }
  }, [onFilesSelected, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    disabled: isAnalyzing,
    multiple: true
  });

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200
        ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/20 hover:border-primary/40 hover:bg-muted/40'}`}
    >
      <input {...getInputProps()} />
      
      {isDragActive ? (
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <p className="text-primary font-medium">Drop your files here</p>
        </motion.div>
      ) : (
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground mb-4">
            Drag & drop your Next.js project files here
          </p>
          <Button 
            variant="outline" 
            disabled={isAnalyzing}
          >
            Select Files
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            Supported: JS, TS, JSX, TSX, JSON, and other text files
          </p>
        </div>
      )}
    </div>
  );
}