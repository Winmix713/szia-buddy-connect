
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChevronRight, AlertTriangle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface RouteAnalyzerProps {
  files: File[];
  onRoutesAnalyzed: (routes: any[]) => void;
}

export function RouteAnalyzer({ files, onRoutesAnalyzed }: RouteAnalyzerProps) {
  const [analyzedRoutes, setAnalyzedRoutes] = useState<any[]>([]);
  const [analyzing, setAnalyzing] = useState(false);

  // Generate sample routes for demonstration
  useEffect(() => {
    if (files.length > 0 && !analyzedRoutes.length && !analyzing) {
      setAnalyzing(true);
      
      // Simulate processing delay
      setTimeout(() => {
        const sampleRoutes = [
          { 
            path: "/", 
            component: "pages/index.jsx",
            isDynamic: false,
            params: [],
            complexity: 1
          },
          { 
            path: "/about", 
            component: "pages/about.tsx",
            isDynamic: false,
            params: [],
            complexity: 1
          },
          { 
            path: "/products/[id]", 
            component: "pages/products/[id].tsx",
            isDynamic: true,
            params: ["id"],
            complexity: 3
          },
          { 
            path: "/blog/[slug]", 
            component: "pages/blog/[slug].tsx",
            isDynamic: true,
            params: ["slug"],
            complexity: 3
          },
          { 
            path: "/category/[...slug]", 
            component: "pages/category/[...slug].tsx",
            isDynamic: true,
            params: ["...slug"],
            complexity: 5
          },
          { 
            path: "/shop/[[...params]]", 
            component: "pages/shop/[[...params]].tsx",
            isDynamic: true,
            params: ["...params"],
            complexity: 7
          }
        ];
        
        setAnalyzedRoutes(sampleRoutes);
        setAnalyzing(false);
        onRoutesAnalyzed(sampleRoutes);
      }, 1500);
    }
  }, [files, analyzedRoutes, analyzing, onRoutesAnalyzed]);

  const getComplexityBadge = (score: number) => {
    if (score < 3) {
      return <Badge variant="outline" className="bg-green-50 text-green-700">Simple</Badge>;
    } else if (score < 5) {
      return <Badge variant="secondary" className="bg-yellow-50 text-yellow-700">Medium</Badge>;
    } else {
      return <Badge variant="secondary" className="bg-red-50 text-red-700">Complex</Badge>;
    }
  };

  const getRouteWarnings = (route: any) => {
    const warnings = [];
    
    if (route.isDynamic && route.params.some((p: string) => p.includes('...'))) {
      warnings.push('Catch-all routes use different syntax in React Router (*all)');
    }
    
    if (route.isDynamic && route.path.includes('[[')) {
      warnings.push('Optional catch-all routes need special handling in React Router');
    }
    
    return warnings;
  };

  const getReactRouterEquivalent = (nextPath: string) => {
    // Convert Next.js dynamic routes to React Router format
    let reactPath = nextPath;
    
    // Handle catch-all routes [...]
    reactPath = reactPath.replace(/\/\[\.\.\.(.*)\]/g, '/*');
    
    // Handle optional catch-all routes [[...]]
    reactPath = reactPath.replace(/\/\[\[\.\.\.(.*)\]\]/g, '/*');
    
    // Handle dynamic routes [param]
    reactPath = reactPath.replace(/\/\[(.*?)\]/g, '/:$1');
    
    return reactPath;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Route Analysis</CardTitle>
        <CardDescription>Next.js routes detected and their React Router equivalents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {analyzing ? (
            <div className="py-12 text-center">
              <div className="animate-spin w-8 h-8 border-t-2 border-primary rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Analyzing routes...</p>
            </div>
          ) : analyzedRoutes.length > 0 ? (
            <>
              {analyzedRoutes.map((route, index) => (
                <motion.div 
                  key={index} 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="p-4 bg-card rounded-lg border border-border">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{route.path}</span>
                      <div className="flex items-center space-x-2">
                        {route.isDynamic && (
                          <Badge className="text-sm px-2 py-1 bg-blue-100 text-blue-700">
                            Dynamic Route
                          </Badge>
                        )}
                        {getComplexityBadge(route.complexity)}
                      </div>
                    </div>
                    {route.params && route.params.length > 0 && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        Parameters: {route.params.join(', ')}
                      </div>
                    )}
                    {getRouteWarnings(route).length > 0 && (
                      <div className="mt-2 text-sm text-amber-600 flex items-center">
                        <AlertTriangle size={14} className="mr-1" />
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="cursor-help">
                                {getRouteWarnings(route).length} warning{getRouteWarnings(route).length > 1 ? 's' : ''}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="w-72 p-2">
                              <ul className="list-disc pl-4 text-xs space-y-1">
                                {getRouteWarnings(route).map((warning, i) => (
                                  <li key={i}>{warning}</li>
                                ))}
                              </ul>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <ChevronRight className="text-muted-foreground" />
                  </div>

                  <Alert className={
                    route.complexity > 4 ? "border-amber-200 bg-amber-50" : "border-green-200 bg-green-50"
                  }>
                    <AlertDescription className="font-mono text-sm">
                      {getReactRouterEquivalent(route.path)}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              ))}
            </>
          ) : (
            <div className="text-center py-4 text-gray-500">
              No routes detected yet. Upload your Next.js project to begin analysis.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
