# AlbakerAMA - Personal Portfolio & AI-Powered Assistant

> A modern, responsive portfolio website featuring an intelligent RAG-powered chatbot assistant built with Next.js 15, React 19, and cutting-edge AI technologies.

![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/AI%20Powered-RAG-green?style=for-the-badge)

## 🌟 Overview

**AlbakerAMA** is a sophisticated personal portfolio website for Albaker Ahmed, a Full Stack Developer and ML Engineer from Aswan, Egypt. The site showcases projects, skills, and experience while featuring an intelligent AI chatbot that can answer questions about Albaker's background using Retrieval-Augmented Generation (RAG) technology.

### 🎯 Target Audience
- **Recruiters & Employers**: Exploring Albaker's technical expertise and project portfolio
- **Potential Clients**: Learning about services and past work
- **Fellow Developers**: Connecting and collaborating on projects
- **Students & Learners**: Getting insights about the journey from Aswan to African Leadership Academy

## ✨ Key Features

### 🤖 **Intelligent RAG-Powered Chatbot**
- **Context-Aware Responses**: Uses Pinecone vector database for semantic search
- **BAAI/bge-base-en-v1.5 Embeddings**: High-quality 768-dimensional text embeddings
- **OpenRouter Integration**: Reliable AI completions with multiple model access
- **Smart Fallbacks**: Enhanced local embeddings when external APIs are unavailable
- **Real-time Interaction**: Instant responses about Albaker's background, projects, and expertise

### 🎨 **Modern Portfolio Design**
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Interactive Animations**: Smooth transitions powered by Framer Motion
- **Dynamic Typing Effect**: Engaging hero section with typewriter animation
- **Orbiting Social Icons**: Creative floating social media links
- **Dark/Light Mode**: Seamless theme switching
- **3D Skill Cards**: Interactive skill showcase with hover effects

### 📱 **Core Pages & Functionality**
- **Home**: Hero section, skills showcase, and introduction
- **About**: Detailed background and journey from Aswan to ALA
- **Projects**: Dynamic project gallery with detailed case studies
- **Contact**: Professional contact form with Resend email integration
- **Chat Assistant**: AI-powered Q&A about Albaker's experience

## 🏗️ Architecture & Technology Stack

### **Frontend Technologies**
```json
{
  "framework": "Next.js 15.4.6 (App Router)",
  "runtime": "React 19",
  "styling": "Tailwind CSS 4",
  "animations": "Framer Motion 12.23.12",
  "icons": "Lucide React + React Icons",
  "fonts": "Next.js Font Optimization",
  "build": "Turbopack (Development)"
}
```

### **Backend & AI Services**
```json
{
  "api": "Next.js API Routes",
  "embeddings": "BAAI/bge-base-en-v1.5 (Hugging Face)",
  "vector_db": "Pinecone (768 dimensions)",
  "llm": "OpenRouter API (GPT-3.5-turbo)",
  "email": "Resend SDK",
  "deployment": "Vercel Platform"
}
```

### **Development Tools**
```json
{
  "package_manager": "npm",
  "linting": "ESLint 9",
  "css_processing": "PostCSS + Tailwind",
  "development_server": "Turbopack",
  "environment": ".env.local support"
}
```

## 🚀 Quick Start

### Prerequisites
- **Node.js**: Version compatible with Next.js 15 and React 19
- **Package Manager**: npm, yarn, pnpm, or bun
- **API Keys**: Hugging Face, Pinecone, and OpenRouter accounts

### 1. Clone & Install
```bash
# Clone the repository
git clone https://github.com/AlbakerAMA/albaker-portfolio
cd albaker-portfolio

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 2. Environment Configuration
Create a `.env.local` file in the root directory:

```bash
# === RAG SYSTEM CONFIGURATION ===

# Pinecone Vector Database (Required)
PINECONE_API_KEY=your_pinecone_api_key_here
PINECONE_INDEX_NAME=albaker-portfolio

# Hugging Face Embeddings (Required)
# Get FREE token: https://huggingface.co/settings/tokens
HUGGINGFACE_API_KEY=your_huggingface_api_key_here

# OpenRouter AI Completions (Required)
# Sign up: https://openrouter.ai/
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_MODEL=openai/gpt-3.5-turbo

# === OPTIONAL SERVICES ===

# Email Service (Resend)
RESEND_API_KEY=your_resend_api_key_here

# Deployment
VERCEL_URL=your_vercel_deployment_url
```

### 3. Setup External Services

#### 🤗 **Hugging Face Setup**
1. Visit [Hugging Face Settings](https://huggingface.co/settings/tokens)
2. Click "New token"
3. Select "Read" access (free tier)
4. Copy token to `.env.local`

#### 🌲 **Pinecone Setup**
1. Create account at [Pinecone](https://www.pinecone.io/)
2. Create new index with:
   - **Name**: `albaker-portfolio`
   - **Dimensions**: `768` (for BAAI/bge-base-en-v1.5)
   - **Metric**: `cosine`
   - **Environment**: `us-east-1-aws` (or your preferred region)
3. Upload your document embeddings with metadata containing `text` field

#### 🚀 **OpenRouter Setup**
1. Sign up at [OpenRouter](https://openrouter.ai/)
2. Generate API key from dashboard
3. Add credits for API usage
4. Copy key to `.env.local`

### 4. Development Server
```bash
# Start development server with Turbopack
npm run dev

# Alternative package managers
yarn dev
pnpm dev
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 5. Production Build
```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 📁 Project Structure

```
AlbakerAMA/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.js     # RAG-powered chatbot API
│   │   ├── about/
│   │   │   └── page.js          # About page
│   │   ├── contact/
│   │   │   └── page.js          # Contact form
│   │   ├── projects/
│   │   │   └── [slug]/
│   │   │       └── page.js      # Dynamic project pages
│   │   ├── globals.css          # Global styles
│   │   ├── layout.js            # Root layout
│   │   └── page.js              # Home page
│   ├── components/
│   │   ├── ui/                  # Reusable UI components
│   │   │   ├── Button.js
│   │   │   ├── Card.js
│   │   │   ├── Input.js
│   │   │   └── Tabs.js
│   │   ├── ChatAssistant.js     # AI chatbot component
│   │   ├── Navbar.js            # Navigation
│   │   └── Footer.js            # Footer
│   └── lib/
│       └── utils.js             # Utility functions
├── public/
│   ├── images/
│   │   └── albaker-profile.jpg  # Profile picture
│   └── Albaker_Ahmed_CV.pdf     # Downloadable CV
├── .env.local                   # Environment variables
├── .env.example                 # Environment template
├── package.json                 # Dependencies
├── tailwind.config.js           # Tailwind configuration
├── next.config.mjs              # Next.js configuration
└── README.md                    # This file
```

## 🤖 RAG System Details

### **How It Works**
1. **Query Processing**: User questions are converted to 768-dimensional embeddings using BAAI/bge-base-en-v1.5
2. **Semantic Search**: Pinecone vector database finds relevant context with cosine similarity
3. **Context Retrieval**: Matching documents (score > 0.5) are retrieved as context
4. **Answer Generation**: OpenRouter API generates responses using retrieved context
5. **Fallback Strategy**: Enhanced local embeddings when external APIs are unavailable

### **Embedding Model Specifications**
- **Model**: `BAAI/bge-base-en-v1.5`
- **Dimensions**: 768
- **Provider**: Hugging Face Inference API
- **Fallback**: Sophisticated local embedding generation
- **Performance**: High-quality semantic understanding

### **Vector Database Configuration**
- **Provider**: Pinecone
- **Index Dimension**: 768
- **Similarity Metric**: Cosine
- **Relevance Threshold**: 0.5
- **Context Limit**: Top 3 matches

## 🎨 Design Philosophy

### **Visual Design**
- **Minimalist Aesthetic**: Clean, professional layout with strategic white space
- **Consistent Typography**: Optimized font hierarchy using Next.js font optimization
- **Responsive First**: Mobile-optimized design that scales beautifully to desktop
- **Accessibility**: WCAG compliant with proper contrast ratios and semantic HTML

### **User Experience**
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Fast Loading**: Optimized images, fonts, and code splitting
- **Smooth Interactions**: Thoughtful animations that enhance rather than distract
- **Intuitive Navigation**: Clear information architecture and user flows

## 🔧 Customization Guide

### **Modifying Content**
```javascript
// Update personal information in src/app/page.js
const personalInfo = {
  name: "Your Name",
  title: "Your Title",
  description: "Your description",
  // ...
}

// Update skills in src/app/page.js
const skillsData = {
  "Your Category": [
    { name: "Your Skill" },
    // ...
  ]
}
```

### **Styling Customization**
```css
/* Modify global styles in src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Your custom styles */
```

### **Adding New Pages**
```bash
# Create new page in src/app/
mkdir src/app/your-page
touch src/app/your-page/page.js
```

## 📈 Performance Optimizations

- **Next.js 15**: Latest framework with improved performance
- **Turbopack**: Ultra-fast bundler for development
- **Image Optimization**: Automatic image optimization with Next.js Image component
- **Font Optimization**: Automatic font loading optimization
- **Code Splitting**: Automatic code splitting for optimal loading
- **API Routes**: Server-side API endpoints for optimal performance

## 🚀 Deployment

### **Recommended: Vercel Platform**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Add all variables from .env.local
```

### **Alternative: Docker**
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### **Environment Variables for Production**
Ensure all environment variables are properly set in your deployment platform:
- `PINECONE_API_KEY`
- `HUGGINGFACE_API_KEY`
- `OPENROUTER_API_KEY`
- `PINECONE_INDEX_NAME`
- `RESEND_API_KEY` (optional)

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome!

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the incredible framework
- **Vercel**: For hosting and deployment platform
- **Hugging Face**: For embedding model API
- **Pinecone**: For vector database services
- **OpenRouter**: For LLM API access
- **Tailwind CSS**: For utility-first styling
- **Framer Motion**: For smooth animations

## 📞 Contact & Support

- **Email**: [aali23@alastudents.org](mailto:aali23@alastudents.org)
- **GitHub**: [@AlbakerAMA](https://github.com/AlbakerAMA)
- **LinkedIn**: [linkedin.com/in/albaker](https://linkedin.com/in/albaker)
- **Portfolio**: [Live Demo](https://your-portfolio-url.vercel.app)

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/AlbakerAMA">Albaker Ahmed</a></p>
  <p>Powered by Next.js 15, React 19, and AI</p>
</div>
