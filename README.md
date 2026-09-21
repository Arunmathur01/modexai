# 🤖 ModeXAI — Multi-Agent AI Platform

ModeXAI is a full-stack **Multi-Agent AI platform** that provides different AI capabilities through specialized agents. Instead of using a single AI workflow for every request, ModeXAI intelligently routes user queries to the most suitable agent.

Users can chat with AI, search the web, generate code, create PDFs and PowerPoint presentations, and generate images — all from a single platform.

---

## 🚀 Features

- 🤖 Multi-Agent AI Architecture
- 🧠 Intelligent query routing
- 💬 AI Chat
- 🔎 Web Search Agent
- 💻 AI Code Generation
- 📄 PDF Generation
- 📊 PowerPoint Generation
- 🎨 AI Image Generation
- 🔐 Authentication & Authorization
- 🔑 Google Authentication
- 💳 Razorpay Payment Integration
- 🪙 Credit-based usage system
- ☁️ AWS S3 file storage
- ⚡ Redis-based session/conversation handling
- 💾 Persistent conversations
- 👤 User profile and plan management
- 📱 Responsive React UI
- 🐳 Docker-ready architecture
- 🔀 API Gateway based microservice architecture

---

# 🏗️ Architecture

ModeXAI follows a service-oriented architecture where different responsibilities are handled by separate backend services.


                         ┌──────────────────┐
                         │    React Client  │
                         │     Vite + UI    │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │    API Gateway   │
                         │   Authentication │
                         │    Proxy / Route │
                         └────────┬─────────┘
                                  │
              ┌───────────────────┼───────────────────┐
              │                   │                   │
              ▼                   ▼                   ▼
       ┌────────────┐      ┌────────────┐      ┌────────────┐
       │ Auth       │      │ Chat       │      │ Agent      │
       │ Service    │      │ Service    │      │ Service    │
       └────────────┘      └────────────┘      └──────┬─────┘
                                                      │
                         ┌────────────────────────────┼────────────────────┐
                         │                            │                    │
                         ▼                            ▼                    ▼
                  ┌────────────┐              ┌────────────┐       ┌────────────┐
                  │ Chat Agent │              │ Search     │       │ Coding     │
                  │            │              │ Agent      │       │ Agent      │
                  └────────────┘              └────────────┘       └────────────┘
                         │                            │                    │
                         ▼                            ▼                    ▼
                  ┌────────────┐              ┌────────────┐       ┌────────────┐
                  │ PDF Agent  │              │ PPT Agent  │       │ Image Gen  │
                  └────────────┘              └────────────┘       └────────────┘


                 ┌──────────┐       ┌────────────┐
                 │  Redis   │       │ MongoDB    │
                 └──────────┘       └────────────┘
                                          │
                                          ▼
                                     ┌──────────┐
                                     │ AWS S3   │
                                     └──────────┘


🧠 AI Agent System
ModeXAI uses specialized agents for different types of tasks.
Available Agents
Agent	Responsibility
💬 Chat	General conversation and questions
🔎 Search	Current information and web search
💻 Coding	Code generation, debugging and programming tasks
📄 PDF	Generate structured PDF documents
📊 PPT	Generate PowerPoint presentations
🎨 ImageGen	Generate AI images


🔀 Intelligent Agent Routing
ModeXAI uses an AI-powered routing system to determine which agent should handle a user's query.
For example:
User:
"Explain what React Query is"


                ↓

          Router Agent

                ↓

              chat
              
Another example:
User:
"Create a responsive landing page using React and Tailwind"


                ↓

          Router Agent

                ↓

             coding
             
Another:
User:
"Generate a PowerPoint presentation about Kubernetes"


                ↓

          Router Agent

                ↓

              ppt

              
Another:
User:
"What is the latest React version?"


                ↓

          Router Agent

                ↓

             search


             
The router returns only the required agent name:
chat
search
coding
pdf
ppt
imageGen


🧩 Technology Stack
Frontend
- React.js
- Vite
- Tailwind CSS
- Redux Toolkit
- Axios
- React Markdown
- React Syntax Highlighter
- Lucide React
Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Redis
- Axios
- JWT
- REST APIs
AI
- LangChain
- LangGraph
- LLM APIs
- Prompt Engineering
- Multi-Agent Architecture
Storage
- AWS S3
- MongoDB
- Redis
Payments
- Razorpay
DevOps / Tools
- Docker
- Git
- GitHub
- Postman
- VS Code

- 
🏢 Backend Services
ModeXAI is divided into multiple backend services.
1. API Gateway
The API Gateway acts as the entry point for frontend requests.
Responsibilities:
- Route requests to backend services
- Authentication middleware
- Authorization
- Forward user identity
- Service-to-service communication
- Centralized API access
Example:
/api/auth/*
/api/chat/*
/api/agent/*
/api/payment/*
2. Auth Service
Responsible for:
- User registration
- Login
- Logout
- JWT authentication
- Google authentication
- User profile
- Plan management
- Credit management
3. Chat Service
Responsible for:
- Creating conversations
- Fetching conversations
- Storing messages
- Fetching message history
- Conversation management
- AI response handling
4. Agent Service
The Agent Service contains the AI workflows.
It includes:
Router
   │
   ├── Chat Agent
   ├── Search Agent
   ├── Coding Agent
   ├── PDF Agent
   ├── PPT Agent
   └── Image Generation Agent

  
💬 Chat System
Users can create multiple conversations and continue previous chats.
Conversation flow:
User
 │
 ▼
Create Conversation
 │
 ▼
Store Conversation
 │
 ▼
Send Message
 │
 ▼
Agent Router
 │
 ▼
Specialized Agent
 │
 ▼
AI Response
 │
 ▼
Store Message
Previous conversations can be accessed from the sidebar.


💻 Coding Agent
The Coding Agent is designed for programming-related tasks.
It can handle:
- Code generation
- Debugging
- Code explanation
- Code optimization
- Code review
- Multiple programming languages
- Frontend development
- Backend development
Generated code can be displayed in a dedicated code preview interface.
Example:


User Request
     ↓
Coding Agent
     ↓
Generate Files
     ↓
┌──────────────┐
│ index.html   │
│ style.css    │
│ script.js    │
└──────────────┘
     ↓
Code Preview


📄 PDF Agent
The PDF Agent converts AI-generated structured content into PDF documents.
The workflow:


User Request
     ↓
PDF Agent
     ↓
LLM generates structured JSON
     ↓
PDF Generator
     ↓
PDF Buffer
     ↓
AWS S3
     ↓
Signed Download URL


Generated PDFs include structured sections such as:
- Title
- Introduction
- Sections
- Subsections
- Bullet points
- Numbered points
- Conclusion
- References
- 
📊 PowerPoint Agent
The PPT Agent generates presentations from user prompts.
Generated presentations can contain:
- Title slide
- Content slides
- Bullet points
- Numbered lists
- Speaker notes
- Conclusion
- References
- Slide numbering
- ModeXAI footer
Workflow:


User Request
     ↓
PPT Agent
     ↓
Structured JSON
     ↓
PptxGenJS
     ↓
PPTX Buffer
     ↓
AWS S3
     ↓
Signed Download URL



🎨 Image Generation Agent
The Image Generation Agent converts user prompts into AI-generated images.
Workflow:



User Prompt
     ↓
Image Agent
     ↓
Image Prompt Generation
     ↓
Image Generation API
     ↓
Image Buffer
     ↓
AWS S3
     ↓
Signed URL
     ↓
Frontend


Images are stored in AWS S3 instead of keeping them directly on the application server.


☁️ AWS S3 Storage
ModeXAI uses Amazon S3 for generated files.
Supported generated files include:
Images
PDFs
PowerPoint presentations
The application:
1. Generates the file
2. Converts it into a Buffer
3. Uploads it to S3
4. Generates a signed URL
5. Sends the URL to the frontend
Example:


Application
     ↓
Buffer
     ↓
S3 Upload
     ↓
Object Storage
     ↓
Signed URL



Signed URLs provide temporary access to generated files.


💳 Payment & Credit System
ModeXAI uses Razorpay for plan purchases.
Available plans:
Plan	Price	Credits	Validity
Free	₹0	100	30 Days
Starter	₹199	500	30 Days
Pro	₹499	1500	30 Days


Payment flow:


User selects plan
       ↓
Create Order
       ↓
Razorpay Checkout
       ↓
Payment
       ↓
Payment Verification
       ↓
Signature Verification
       ↓
Payment marked as Paid
       ↓
Update User Plan
       ↓
Add Credits



Payment information is stored in MongoDB.

🔐 Payment Security
The frontend sends only the selected plan ID:

{
  "plan": "starter"
}

The backend determines:
Plan
Price
Credits
Validity
from the server-side plan configuration.
This prevents users from manipulating the price or credit amount from the frontend.
Payment verification uses:
razorpay_order_id
razorpay_payment_id
razorpay_signature

⚡ Redis
Redis is used for fast temporary data and session-related operations.
It can be used for:
- Sessions
- Conversation context
- Cached data
- Fast access to frequently used information
Architecture:


Application
     ↓
   Redis
     ↓
Fast temporary data

🔐 Authentication
ModeXAI supports authenticated API access.
The API Gateway validates the authenticated user and forwards the user identity to internal services.
Example:



Frontend
   ↓
API Gateway
   ↓
Authentication Middleware
   ↓
User ID
   ↓
Backend Service


Internal services can receive the authenticated user ID through:
x-user-id

🗂️ Project Structure
A simplified project structure:



ModeXAI/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── features/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   │
│   ├── gateway/
│   ├── auth/
│   ├── chat/
│   └── agent/
│       ├── agents/
│       ├── routes/
│       ├── controllers/
│       ├── utils/
│       └── config/
│
└── README.md


⚙️ Environment Variables
Create .env files for the required services.
Example:
MONGO_URI=your_mongodb_connection
REDIS_URL=your_redis_url

JWT_SECRET=your_jwt_secret

AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_bucket_name

Test_Key_Id=your_razorpay_key_id
Test_Key_Secret=your_razorpay_secret

AUTH_SERVICE_URL=http://localhost:...
Frontend:
VITE_RAZORPAY_API_Key=your_razorpay_key
Never commit .env files or secret keys to GitHub.

Add them to .gitignore:
.env
.env.*
node_modules/
dist/


🛠️ Installation
Clone Repository
git clone https://github.com/your-username/modexai.git

cd modexai
Frontend
cd frontend

npm install

npm run dev
The frontend will run on:
http://localhost:5173
Backend Services
Install dependencies in each backend service:
npm install
Then start the required services.
Example:
npm run dev

🧪 API Testing
APIs can be tested using:
- Postman
- Browser
- Frontend application
Example API flow:
POST /api/auth/login

POST /api/chat/create-conversation

POST /api/chat/send-message

POST /api/payment/create-order

POST /api/payment/verify


🐳 Docker
The application is designed around independent backend services and can be containerized using Docker.
Example:
docker build -t modexai .
Run:
docker run -p 5000:5000 modexai
For a complete multi-service environment, Docker Compose can be used to manage:
Frontend
Gateway
Auth Service
Chat Service
Agent Service
Redis
MongoDB

🔄 Overall Request Flow
A typical AI request follows this architecture:



                    User
                     │
                     ▼
                React Client
                     │
                     ▼
                API Gateway
                     │
                     ▼
                Chat Service
                     │
                     ▼
               Agent Router
                     │
        ┌────────────┼─────────────┐
        │            │             │
        ▼            ▼             ▼
      Chat         Coding        Search
        │            │             │
        └────────────┼─────────────┘
                     │
                     ▼
                    LLM
                     │
                     ▼
                AI Response
                     │
                     ▼
               Store Message
                     │
                     ▼
                React Client

                
📈 Future Improvements
Planned improvements can include:
- Streaming AI responses
- Advanced agent memory
- More AI agents
- Voice conversations
- Better usage analytics
- Subscription management
- Payment webhooks
- Rate limiting
- Advanced caching
- Kubernetes deployment
- Monitoring and logging
- Automated CI/CD pipeline
🤝 Contributing
Contributions are welcome.
git checkout -b feature/new-feature

git add .

git commit -m "Add new feature"

git push origin feature/new-feature
Then create a Pull Request.


📜 License
This project is developed for learning, experimentation, and portfolio purposes.
👨‍💻 Developer
Arun Mathur


