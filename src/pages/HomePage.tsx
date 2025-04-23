
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, ArrowRight } from "lucide-react";

const FeaturedCard = ({ title, author, date, className }: { title: string; author: string; date: string; className?: string }) => (
  <Card className={`overflow-hidden transition-all hover:ring-2 hover:ring-primary/20 ${className}`}>
    <CardContent className="p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{author}</span>
        <span>{date}</span>
      </div>
    </CardContent>
  </Card>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Column */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Next.js to Vite
                <span className="block text-primary">Converter</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                Transform your Next.js project to Vite for faster development, 
                more flexible build processes, and enhanced performance.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button size="lg" className="gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Project
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Right Column - Featured Demo */}
            <div className="flex-1">
              <div className="bg-card rounded-xl border shadow-2xl">
                <div className="aspect-[16/10] rounded-t-xl bg-gradient-to-br from-primary/5 to-accent/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/lovable-uploads/ffc71b11-7c14-472a-b589-3694a2e94c3e.png')] bg-cover bg-center opacity-90" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeaturedCard
              title="Improving component functionality"
              author="Sarah Walker"
              date="May 20, 2023"
              className="bg-gradient-to-br from-background to-primary/5"
            />
            <FeaturedCard
              title="Comprehensive data viz tools"
              author="Sarah Walker"
              date="May 20, 2023"
              className="bg-gradient-to-br from-background to-accent/5"
            />
            <FeaturedCard
              title="Design system documentation"
              author="Sarah Walker"
              date="May 20, 2023"
              className="bg-gradient-to-br from-background to-secondary/5"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
