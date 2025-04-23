import { File } from "lucide-react";

interface SelectedFilesProps {
  files: File[];
}

export function SelectedFiles({ files }: SelectedFilesProps) {
  if (!files.length) return null;

  // Count file types
  const fileTypes: Record<string, number> = {};
  files.forEach(file => {
    const extension = file.name.split('.').pop() || 'unknown';
    fileTypes[extension] = (fileTypes[extension] || 0) + 1;
  });
  
  // Format for display
  const fileTypeSummary = Object.entries(fileTypes)
    .map(([ext, count]) => `${count} ${ext}`)
    .join(', ');

  return (
    <div className="mt-4 w-full">
      <div className="bg-muted/40 p-4 rounded-lg border border-border">
        <div className="flex items-center mb-2">
          <File className="h-4 w-4 mr-2 text-muted-foreground" />
          <p className="text-sm font-medium">
            {files.length} {files.length === 1 ? 'file' : 'files'} selected
          </p>
        </div>
        
        <p className="text-xs text-muted-foreground">
          Types: {fileTypeSummary}
        </p>
        
        <div className="mt-2 max-h-24 overflow-y-auto">
          {files.slice(0, 5).map((file, i) => (
            <div key={i} className="text-xs text-muted-foreground truncate">
              {file.name}
            </div>
          ))}
          {files.length > 5 && (
            <div className="text-xs text-muted-foreground mt-1">
              + {files.length - 5} more files
            </div>
          )}
        </div>
      </div>
    </div>
  );
}