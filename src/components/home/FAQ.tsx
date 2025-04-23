import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is the Next.js to Vite converter?",
    answer: "Our converter is an intelligent tool that automatically transforms Next.js projects to Vite-compatible React applications. It handles code transformation, routing conversion, component replacement, and more to make your migration process smooth and efficient."
  },
  {
    question: "Why should I convert from Next.js to Vite?",
    answer: "Vite offers significantly faster development experience with instant server start and lightning-fast hot module replacement (HMR). It also provides a more flexible build process, smaller bundle sizes, and works great with modern React practices like React Router and React Query."
  },
  {
    question: "What Next.js features are supported for conversion?",
    answer: "Our converter supports transforming most Next.js features including pages, components (Image, Link, Head), data fetching methods (getStaticProps, getServerSideProps), API routes, middleware, and more. We provide alternatives for each feature using standard React libraries and patterns."
  },
  {
    question: "How accurate is the conversion process?",
    answer: "Our converter achieves a high level of accuracy for most projects. Simple to moderately complex Next.js applications convert with minimal manual adjustments needed. For very complex applications with custom server-side logic, some additional manual modifications might be required after conversion."
  },
  {
    question: "What happens to my API routes?",
    answer: "API routes are converted to Express.js endpoints in a separate server application. We provide all the necessary code and configuration to run your API alongside your Vite application, including proxy setup for seamless local development."
  },
  {
    question: "Do I need to modify my components after conversion?",
    answer: "In most cases, no. The converter automatically replaces Next.js-specific components with their Vite-compatible equivalents. For example, next/image becomes @unpic/react, next/link becomes react-router-dom's Link, and next/head becomes react-helmet-async."
  },
  {
    question: "What about server-side rendering (SSR)?",
    answer: "Vite projects typically run as client-side single-page applications. The converter transforms server-side data fetching methods to client-side alternatives using React Query or similar libraries. If you need full SSR, we recommend exploring additional solutions like Vite SSR plugins or frameworks like SvelteKit."
  },
  {
    question: "Is the converted code production-ready?",
    answer: "Yes, the converted code is optimized for production use. We update dependencies, fix import paths, and ensure all code follows best practices for Vite and React. The converter also provides deployment configurations for popular hosting platforms."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Get answers to common questions about the Next.js to Vite conversion process.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}