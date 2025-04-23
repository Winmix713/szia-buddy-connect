import { motion } from "framer-motion";
import { FileUp, Search, Code, Download } from "lucide-react";

const steps = [
  {
    icon: <FileUp className="h-12 w-12 text-primary" />,
    title: "Upload Your Project",
    description: "Drag and drop your Next.js project files or select them from your computer to begin the conversion process."
  },
  {
    icon: <Search className="h-12 w-12 text-purple-600" />,
    title: "Analyze Structure",
    description: "Our intelligent analyzer examines your project structure, dependencies, and code patterns to plan the conversion."
  },
  {
    icon: <Code className="h-12 w-12 text-blue-600" />,
    title: "Transform Code",
    description: "The conversion engine transforms your code, converting Next.js-specific features to Vite-compatible alternatives."
  },
  {
    icon: <Download className="h-12 w-12 text-emerald-600" />,
    title: "Download & Deploy",
    description: "Download your fully converted project, ready to run with Vite and deploy to your favorite hosting platform."
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Converting your Next.js project to Vite is a straightforward process with our automated tools.
            Here's how it works in just a few simple steps.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted transform -translate-y-1/2 hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-card border border-border rounded-xl p-6 relative z-10"
              >
                <div className="bg-background w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">{step.title}</h3>
                <p className="text-muted-foreground text-center">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}