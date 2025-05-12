import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"

// Projects data (in a real app, this would come from a database or API)
const projectsData = {
  "ecommerce-platform": {
    title: "E-Commerce Platform",
    description: "A comprehensive e-commerce solution built with modern web technologies.",
    longDescription: `
      This e-commerce platform provides businesses with a complete solution for selling products online. 
      The application features a responsive design, secure payment processing, inventory management, 
      and an intuitive admin dashboard.
      
      Key features include:
      - User authentication and profile management
      - Product catalog with search and filtering
      - Shopping cart and checkout process
      - Payment processing with Stripe
      - Order tracking and history
      - Admin dashboard for inventory and order management
      - Analytics and reporting
    `,
    image: "/placeholder.svg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    tags: ["React", "Node.js", "MongoDB", "Stripe", "Redux", "Express", "JWT"],
    links: {
      github: "https://github.com/username/ecommerce-platform",
      live: "https://ecommerce-platform-demo.com",
    },
    challenges: `
      One of the main challenges was implementing a secure and seamless payment processing system. 
      I integrated Stripe's API and ensured that all transactions were secure and compliant with 
      industry standards. Another challenge was optimizing the performance of the product catalog 
      for large inventories, which I solved by implementing efficient database queries and pagination.
    `,
    solutions: `
      To address the performance issues, I implemented:
      - Indexed database queries for faster search results
      - Server-side pagination to limit data transfer
      - Image optimization and lazy loading
      - Caching strategies for frequently accessed data
      - Code splitting to reduce initial load time
    `,
  },
  "ai-chatbot": {
    title: "AI Chatbot Assistant",
    description: "An intelligent chatbot powered by machine learning to provide customer support.",
    longDescription: `
      This AI-powered chatbot was designed to provide automated customer support for a SaaS company. 
      The chatbot uses natural language processing to understand user queries and provide relevant responses.
      
      Key features include:
      - Natural language understanding
      - Intent recognition and entity extraction
      - Context-aware conversations
      - Integration with knowledge base
      - Handoff to human agents when needed
      - Continuous learning from interactions
      - Multi-language support
    `,
    image: "/placeholder.svg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    tags: ["Python", "TensorFlow", "NLP", "API", "Flask", "Docker", "WebSockets"],
    links: {
      github: "https://github.com/username/ai-chatbot",
      live: "https://ai-chatbot-demo.com",
    },
    challenges: `
      The main challenge was training the model to accurately understand a wide variety of customer queries. 
      I had to collect and annotate a large dataset of customer interactions to train the NLP model. 
      Another challenge was ensuring the chatbot could maintain context throughout a conversation.
    `,
    solutions: `
      To improve the chatbot's understanding:
      - Created a comprehensive training dataset with diverse queries
      - Implemented a context management system to track conversation state
      - Used a hybrid approach combining rule-based responses and ML predictions
      - Developed a feedback loop to continuously improve the model
      - Implemented fallback mechanisms for unrecognized queries
    `,
  },
  "data-visualization": {
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard for visualizing complex datasets with real-time updates.",
    longDescription: `
      This data visualization dashboard was developed for a financial services company to help them 
      analyze and present complex financial data in an intuitive way. The dashboard provides real-time 
      updates and interactive visualizations.
      
      Key features include:
      - Interactive charts and graphs
      - Real-time data updates
      - Customizable dashboard layouts
      - Data filtering and sorting
      - Export functionality
      - User-specific views and permissions
      - Mobile-responsive design
    `,
    image: "/placeholder.svg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    tags: ["D3.js", "React", "GraphQL", "AWS", "TypeScript", "Material UI", "Jest"],
    links: {
      github: "https://github.com/username/data-visualization",
      live: "https://data-viz-demo.com",
    },
    challenges: `
      The biggest challenge was handling large datasets efficiently while maintaining smooth interactions. 
      I also needed to ensure that the visualizations were both informative and intuitive for users 
      without a technical background.
    `,
    solutions: `
      To handle the performance requirements:
      - Implemented data aggregation on the server side
      - Used WebSockets for efficient real-time updates
      - Applied virtualization for rendering large datasets
      - Created custom D3.js visualizations optimized for performance
      - Implemented progressive loading for historical data
    `,
  },
  "mobile-fitness-app": {
    title: "Mobile Fitness App",
    description: "A cross-platform mobile application for tracking workouts and nutrition.",
    longDescription: `
      This fitness application helps users track their workouts, nutrition, and overall health goals. 
      Built with React Native, it provides a seamless experience across iOS and Android devices.
      
      Key features include:
      - Workout tracking and planning
      - Nutrition logging and analysis
      - Progress tracking with charts
      - Integration with health devices
      - Social sharing and challenges
      - Personalized recommendations
      - Offline functionality
    `,
    image: "/placeholder.svg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    tags: ["React Native", "Firebase", "Redux", "Health API", "Expo", "Jest", "TypeScript"],
    links: {
      github: "https://github.com/username/fitness-app",
      live: "https://fitness-app-demo.com",
    },
    challenges: `
      The main challenge was integrating with various health devices and APIs while ensuring data privacy 
      and security. Another challenge was implementing offline functionality that would sync properly 
      when the device came back online.
    `,
    solutions: `
      To address these challenges:
      - Implemented a secure authentication system
      - Created a local database for offline storage
      - Developed a robust sync mechanism
      - Used native modules for device integrations
      - Implemented end-to-end encryption for sensitive data
    `,
  },
  "blockchain-wallet": {
    title: "Blockchain Wallet",
    description: "A secure digital wallet for managing cryptocurrency transactions.",
    longDescription: `
      This blockchain wallet provides users with a secure way to manage their cryptocurrency assets. 
      It supports multiple cryptocurrencies and offers features for sending, receiving, and tracking transactions.
      
      Key features include:
      - Multi-cryptocurrency support
      - Secure key management
      - Transaction history and tracking
      - QR code generation for receiving funds
      - Gas fee estimation
      - Integration with decentralized exchanges
      - Hardware wallet support
    `,
    image: "/placeholder.svg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    tags: ["Web3.js", "Solidity", "Ethereum", "Security", "React", "Node.js", "Truffle"],
    links: {
      github: "https://github.com/username/blockchain-wallet",
      live: "https://blockchain-wallet-demo.com",
    },
    challenges: `
      Security was the primary challenge for this project. I needed to ensure that private keys were 
      properly secured and that transactions were validated correctly. Another challenge was keeping 
      up with the rapidly evolving blockchain ecosystem.
    `,
    solutions: `
      To ensure security and reliability:
      - Implemented client-side encryption for private keys
      - Created a comprehensive testing suite for transaction validation
      - Used hardware security module integration
      - Implemented multi-signature support
      - Developed an update mechanism to adapt to blockchain protocol changes
    `,
  },
  "social-media-platform": {
    title: "Social Media Platform",
    description: "A feature-rich social networking platform with real-time messaging.",
    longDescription: `
      This social media platform allows users to connect, share content, and communicate in real-time. 
      It features a modern UI and a robust backend to handle high traffic and data storage.
      
      Key features include:
      - User profiles and connections
      - Content sharing and interaction
      - Real-time messaging and notifications
      - News feed with personalized content
      - Privacy controls and content moderation
      - Media uploading and processing
      - Search functionality
    `,
    image: "/placeholder.svg?height=600&width=1200",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    tags: ["React", "Socket.io", "Express", "MongoDB", "Redis", "AWS S3", "JWT"],
    links: {
      github: "https://github.com/username/social-media",
      live: "https://social-media-demo.com",
    },
    challenges: `
      Scaling was a significant challenge for this project, as it needed to handle a large number of 
      concurrent users and real-time interactions. Content moderation and privacy were also important 
      considerations that required careful implementation.
    `,
    solutions: `
      To address the scaling and moderation challenges:
      - Implemented a microservices architecture
      - Used Redis for caching and pub/sub messaging
      - Developed an automated content moderation system
      - Created a comprehensive permission system
      - Optimized database queries with indexing and sharding
    `,
  },
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projectsData[params.id]

  if (!project) {
    notFound()
  }

  return (
    <div className="pt-20">
      {/* Project Hero */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <Link href="/projects" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Link>

          <h1 className="text-4xl font-bold mb-6 gradient-text">{project.title}</h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="cyber-border p-1 rounded-lg overflow-hidden mb-8">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={1200}
              height={600}
              className="rounded-lg w-full"
            />
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            {project.links.github && (
              <Button asChild variant="outline" className="gap-2">
                <Link href={project.links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" /> View on GitHub
                </Link>
              </Button>
            )}
            {project.links.live && (
              <Button asChild className="gap-2">
                <Link href={project.links.live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" /> Live Demo
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
              <div className="prose prose-invert max-w-none">
                {project.longDescription.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 text-muted-foreground">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>

              <h2 className="text-2xl font-bold mt-12 mb-6">Challenges</h2>
              <div className="prose prose-invert max-w-none">
                {project.challenges.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 text-muted-foreground">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>

              <h2 className="text-2xl font-bold mt-12 mb-6">Solutions</h2>
              <div className="prose prose-invert max-w-none">
                {project.solutions.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 text-muted-foreground">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
              <div className="space-y-4">
                {project.gallery.map((image, index) => (
                  <div key={index} className="cyber-border p-1 rounded-lg overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${project.title} screenshot ${index + 1}`}
                      width={600}
                      height={400}
                      className="rounded-lg w-full"
                    />
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold mt-12 mb-6">Technologies Used</h2>
              <div className="grid grid-cols-2 gap-2">
                {project.tags.map((tag) => (
                  <div key={tag} className="cyber-border p-3 text-center">
                    <span className="text-sm font-medium">{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
