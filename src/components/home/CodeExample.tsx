import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";

const codeExamples = {
  component: {
    before: `// pages/blog/[slug].js
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function BlogPost({ post }) {
  const router = useRouter()
  
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div className="blog-post">
        <h1>{post.title}</h1>
        <Image 
          src={post.image} 
          alt={post.title}
          width={800}
          height={400}
          priority
        />
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <button onClick={() => router.push('/blog')}>
          Back to Blog
        </button>
      </div>
    </>
  )
}

export async function getStaticProps({ params }) {
  const res = await fetch(\`https://api.example.com/posts/\${params.slug}\`)
  const post = await res.json()
  return { props: { post } }
}

export async function getStaticPaths() {
  const res = await fetch('https://api.example.com/posts')
  const posts = await res.json()
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }))
  
  return { paths, fallback: true }
}`,
    after: `// src/pages/BlogPost.jsx
import { Helmet } from 'react-helmet-async'
import { Image } from '@unpic/react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

export default function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
  
  const { data: post, isLoading } = useQuery({
    queryKey: ['post', slug],
    queryFn: async () => {
      const res = await fetch(\`https://api.example.com/posts/\${slug}\`)
      return res.json()
    }
  })
  
  if (isLoading) {
    return <div>Loading...</div>
  }
  
  return (
    <>
      <Helmet>
        <title>{post.title}</title>
      </Helmet>
      <div className="blog-post">
        <h1>{post.title}</h1>
        <Image 
          src={post.image} 
          alt={post.title}
          width={800}
          height={400}
          loading="eager"
        />
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <button onClick={() => navigate('/blog')}>
          Back to Blog
        </button>
      </div>
    </>
  )
}

// For generating routes, we'd use a function like:
export async function fetchAllPostSlugs() {
  const res = await fetch('https://api.example.com/posts')
  const posts = await res.json()
  return posts.map(post => post.slug)
}`
  },
  routing: {
    before: `// next.config.js
module.exports = {
  reactStrictMode: true,
}

// pages/index.js
export default function Home() {
  return <div>Home Page</div>
}

// pages/about.js
export default function About() {
  return <div>About Page</div>
}

// pages/products/[id].js
import { useRouter } from 'next/router'

export default function Product() {
  const router = useRouter()
  const { id } = router.query
  
  return <div>Product: {id}</div>
}`,
    after: `// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
  }
})

// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Product from './pages/Product'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/products/:id',
    element: <Product />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

// src/pages/Product.jsx
import { useParams } from 'react-router-dom'

export default function Product() {
  const { id } = useParams()
  
  return <div>Product: {id}</div>
}`
  },
  api: {
    before: `// pages/api/users.js
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Get all users
    res.status(200).json({ users: ['John', 'Jane', 'Bob'] })
  } else if (req.method === 'POST') {
    // Create a new user
    const { name } = req.body
    res.status(201).json({ message: \`Created user: \${name}\` })
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(\`Method \${req.method} Not Allowed\`)
  }
}`,
    after: `// server/index.js
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

// Get all users
app.get('/api/users', (req, res) => {
  res.status(200).json({ users: ['John', 'Jane', 'Bob'] })
})

// Create a new user
app.post('/api/users', (req, res) => {
  const { name } = req.body
  res.status(201).json({ message: \`Created user: \${name}\` })
})

// Handle unsupported methods
app.all('/api/users', (req, res) => {
  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(\`Method \${req.method} Not Allowed\`)
})

// Start the server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(\`API server running on http://localhost:\${PORT}\`)
})

// vite.config.js
// Add proxy configuration
export default defineConfig({
  // ...other config
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})`
  }
};

export function CodeExample() {
  const [activeTab, setActiveTab] = useState("component");

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See the Transformation
          </h2>
          <p className="text-lg text-muted-foreground">
            Our converter intelligently transforms your Next.js code to Vite-compatible equivalents
            while preserving functionality and improving performance.
          </p>
        </div>

        <Tabs defaultValue="component" value={activeTab} onValueChange={setActiveTab} className="w-full max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="component">Components & Data</TabsTrigger>
            <TabsTrigger value="routing">Routing</TabsTrigger>
            <TabsTrigger value="api">API Routes</TabsTrigger>
          </TabsList>

          {["component", "routing", "api"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-lg border border-border overflow-hidden"
                >
                  <div className="bg-card border-b border-border p-3 flex justify-between items-center">
                    <div className="font-medium">Next.js</div>
                    <div className="text-xs text-muted-foreground">Before</div>
                  </div>
                  <pre className="p-4 overflow-auto bg-muted/50 text-sm max-h-80">
                    <code className="text-foreground">{codeExamples[tab as keyof typeof codeExamples].before}</code>
                  </pre>
                </motion.div>

                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-lg border border-border overflow-hidden"
                  >
                    <div className="bg-card border-b border-border p-3 flex justify-between items-center">
                      <div className="font-medium">Vite + React</div>
                      <div className="text-xs text-muted-foreground">After</div>
                    </div>
                    <pre className="p-4 overflow-auto bg-muted/50 text-sm max-h-80">
                      <code className="text-foreground">{codeExamples[tab as keyof typeof codeExamples].after}</code>
                    </pre>
                  </motion.div>
                  <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-[4.5rem] hidden md:block">
                    <div className="bg-primary/10 rounded-full p-3">
                      <ArrowRight size={24} className="text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}