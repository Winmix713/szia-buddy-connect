import { motion } from "framer-motion";
import { 
  Zap, 
  Code2, 
  FileJson, 
  LayoutGrid, 
  Server, 
  Workflow, 
  ArrowUpRight,
  Components 
} from "lucide-react";

const features = [
  {
    icon: <Code2 className="h-10 w-10 p-2 bg-blue-100 text-blue-700 rounded-lg" />,
    title: "Smart Code Transformation",
    description: "Automatically convert Next.js components, hooks, and APIs to Vite-compatible code using context-aware transformations."
  },
  {
    icon: <LayoutGrid className="h-10 w-10 p-2 bg-purple-100 text-purple-700 rounded-lg" />,
    title: "Routing Conversion",
    description: "Transform file-based Next.js routing to React Router with the same patterns and behaviors you're used to."
  },
  {
    icon: <Server className="h-10 w-10 p-2 bg-emerald-100 text-emerald-700 rounded-lg" />,
    title: "API Route Handling",
    description: "Convert API routes to Express or standalone server solutions with implementation guidance and automatic setup."
  },
  {
    icon: <Components className="h-10 w-10 p-2 bg-amber-100 text-amber-700 rounded-lg" />,
    title: "Component Replacement",
    description: "Replace Next.js-specific components like Image, Link, and Head with their Vite-compatible equivalents."
  },
  {
    icon: <FileJson className="h-10 w-10 p-2 bg-rose-100 text-rose-700 rounded-lg" />,
    title: "Dependency Management",
    description: "Automatically update your package.json by adding Vite dependencies and removing Next.js-specific ones."
  },
  {
    icon: <Workflow className="h-10 w-10 p-2 bg-sky-100 text-sky-700 rounded-lg" />,
    title: "Middleware Handling",
    description: "Transform middleware to equivalent patterns in your new Vite project without losing functionality."
  },
  {
    icon: <Zap className="h-10 w-10 p-2 bg-indigo-100 text-indigo-700 rounded-lg" />,
    title: "Blazing Fast Performance",
    description: "Benefit from Vite's lightning-fast HMR and build times after conversion, significantly speeding up your development."
  },
  {
    icon: <ArrowUpRight className="h-10 w-10 p-2 bg-teal-100 text-teal-700 rounded-lg" />,
    title: "Deployment Ready",
    description: "Generate ready-to-deploy projects with optimized configurations for popular hosting platforms."
  }
];

export function Features() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Conversion Features
          </h2>
          <p className="text-lg text-muted-foreground">
            Our intelligent converter handles the heavy lifting so you can enjoy faster development,
            flexible build processes, and enhanced performance.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-card hover:bg-accent/5 border border-border rounded-xl p-6 transition-all duration-200 hover:shadow-md"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}