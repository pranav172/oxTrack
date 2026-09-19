# OxTrack

### A personal CRM for managing the software engineering job search.

OxTrack is a modern job-search management application designed to help candidates organize job applications, track hiring progress, manage recruiter information, prepare for interviews, and understand their job-search activity through analytics.

Instead of managing applications across spreadsheets, bookmarks, notes, and calendars, OxTrack brings the core job-search workflow into one focused workspace.

---

## ✨ Features

### 📋 Application Management

Create and manage job applications with important information including:

- Company
- Role
- Location
- Remote status
- Salary range
- Application status
- Job URL
- Recruiter information
- Notes
- Next action
- Role description

Applications can be created, edited, viewed, and removed from the dashboard.

---

### 📊 Kanban Job Pipeline

Visualize applications throughout the hiring process using a Kanban-style workflow.

```text
Saved
  ↓
Applied
  ↓
Screening
  ↓
Interview
  ↓
Final Round
  ↓
Offer

Rejected applications can also be tracked separately.

This makes it easy to understand the current state of the entire job search at a glance.

🔎 Search & Organization

Quickly find applications and navigate through the job-search workspace without relying on scattered spreadsheets or documents.

👤 Recruiter Tracking

Recruiter information can be stored directly alongside an application.

Track:

Recruiter name
Recruiter email
Application-specific notes
Follow-up actions

This allows each application to retain the context surrounding the hiring process.

🎯 Next Actions

Applications can contain a specific next action, such as:

Follow up with recruiter
Prepare for interview
Complete a take-home assignment
Send a referral request
Check application status

This turns the tracker into an actionable workflow rather than simply a list of applications.

🎤 Interview Tracking

Track interviews associated with the job-search process.

Interview information includes:

Interview date
Interview type
Interviewer
Completion status
Preparation focus

The interview preparation interface provides structured preparation material for different interview categories.

📈 Job Search Analytics

OxTrack provides analytics to help understand job-search activity.

The analytics experience includes information such as:

Total applications
Application activity
Interviews
Offers
Rejections
Application status distribution
Interview conversion
Application trends

The goal is to make the job search measurable rather than relying entirely on intuition.

🧠 Why OxTrack?

Job hunting is often fragmented across multiple tools.

LinkedIn
   ↓
Find jobs

Company Careers Page
   ↓
Submit applications

Spreadsheet
   ↓
Track applications

Notes
   ↓
Interview preparation

Calendar
   ↓
Interview dates

Email
   ↓
Recruiter communication

OxTrack brings the core tracking workflow into a single workspace.

The product is based on a simple idea:

Treat the job search like a pipeline instead of a collection of disconnected applications.

🎨 Design Philosophy

OxTrack follows a productivity-focused interface inspired by modern developer and productivity tools.

The design focuses on:

Clear visual hierarchy
High information density without visual clutter
Consistent spacing
Reusable UI components
Clear application states
Responsive layouts
Subtle animations
Smooth transitions
Fast interactions
Minimal visual noise

Motion is intentionally restrained and primarily used to communicate state changes and hierarchy.

Examples include:

Application card hover states
Modal entrance animations
Drawer transitions
Backdrop transitions
Staggered list animations
Drag-and-drop feedback
🏗️ Architecture

OxTrack is built as a component-driven Next.js application.

                    ┌─────────────────────┐
                    │      Next.js App    │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
        Applications       Analytics        Interviews
              │                │                │
              └────────────────┼────────────────┘
                               │
                               ▼
                        Zustand Store
                               │
                ┌──────────────┴──────────────┐
                │                             │
                ▼                             ▼
          Application State              UI State
          • Applications                 • Drawer
          • Status                       • Forms
          • Interviews                   • Selection
          • Recruiters                   • Editing

The project separates:

UI components
Application state
Domain types
Utility functions
Analytics calculations
Animation definitions
Mock application data

This structure keeps the application modular and makes individual features easier to extend.

🛠️ Tech Stack
Technology	Purpose
Next.js	Application framework
React	User interface
TypeScript	Type safety
Tailwind CSS	Styling
Framer Motion	UI animations
Zustand	Client-side state management
Lucide React	Icons
📁 Project Structure
oxTrack/
│
├── app/
│   ├── analytics/
│   ├── companies/
│   ├── interviews/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── app-card.tsx
│   ├── app-drawer.tsx
│   ├── app-form.tsx
│   ├── analytics.tsx
│   ├── kanban.tsx
│   ├── search-bar.tsx
│   ├── sidebar.tsx
│   ├── timeline.tsx
│   └── ui.tsx
│
├── lib/
│   ├── data.ts
│   ├── motion.ts
│   ├── stats.ts
│   ├── store.ts
│   ├── types.ts
│   └── utils.ts
│
├── public/
│
├── package.json
└── README.md
🚀 Getting Started
Prerequisites

Make sure you have installed:

Node.js 18+
npm
Git
Clone the Repository
git clone https://github.com/pranav172/oxTrack.git

Navigate into the project:

cd oxTrack

Install dependencies:

npm install

Start the development server:

npm run dev

Open the application at:

http://localhost:3000
⚙️ Available Scripts
Development
npm run dev

Starts the Next.js development server.

Production Build
npm run build

Creates an optimized production build.

Production Server
npm start

Starts the production server after building the application.

📊 Core Workflow

The primary OxTrack workflow is:

                 Discover Job
                      │
                      ▼
                Save Application
                      │
                      ▼
                    Apply
                      │
                      ▼
                 Screening
                      │
                      ▼
                  Interview
                      │
                      ▼
                 Final Round
                  /       \
                 /         \
                ▼           ▼
           Rejected        Offer

At each stage, the user can maintain relevant information and define the next action.

🔮 Future Improvements

Potential future versions of OxTrack could include:

User authentication
PostgreSQL persistence
Cloud synchronization
REST API
Email integration
Calendar integration
Browser extension for saving jobs
Automatic job importing
Resume-to-job matching
AI-powered job analysis
Recruiter follow-up reminders
Application success-rate analysis
Automated interview preparation
Notification system
📌 Project Status

OxTrack is an actively developed portfolio project.

The current version focuses on the core job-search workflow, application management, Kanban pipeline management, interview tracking, analytics, and a modern productivity-oriented interface.

👨‍💻 Author
Pranav Raj

B.Tech Information Technology
Manipal University Jaipur

Portfolio:
https://www.pranavraj.xyz

GitHub:
https://github.com/pranav172

License

This project is licensed under the MIT License.