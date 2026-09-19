# OxTrack

> A personal CRM for managing the software engineering job search.

OxTrack is a modern job-search management application that helps candidates organize applications, track hiring progress, manage recruiter information, prepare for interviews, and understand job-search activity through analytics.

Instead of managing applications across spreadsheets, bookmarks, notes, calendars, and email, OxTrack brings the core job-search workflow into one focused workspace.

---

## ✨ Features

### 📋 Application Management

Create and manage job applications with all the important information in one place:

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

Applications can be created, edited, viewed, and removed directly from the dashboard.

### 📊 Kanban Job Pipeline

Visualize applications throughout the hiring process with a Kanban-style workflow:

```text
Saved → Applied → Screening → Interview → Final Round → Offer
```

Rejected applications can also be tracked separately, making it easy to understand the current state of the entire job search at a glance.

### 🔎 Search & Organization

Quickly find applications and navigate through the job-search workspace without relying on scattered spreadsheets or documents.

### 👤 Recruiter Tracking

Store recruiter information alongside each application, including:

- Recruiter name
- Recruiter email
- Application-specific notes
- Follow-up actions

This keeps the context surrounding each hiring process connected to the relevant application.

### 🎯 Next Actions

Add a specific next action to every application, such as:

- Follow up with a recruiter
- Prepare for an interview
- Complete a take-home assignment
- Send a referral request
- Check application status

This turns OxTrack into an actionable workflow rather than simply a list of applications.

### 🎤 Interview Tracking

Track interviews associated with the job-search process, including:

- Interview date
- Interview type
- Interviewer
- Completion status
- Preparation focus

The interview preparation interface provides structured preparation material for different interview categories.

### 📈 Job-Search Analytics

OxTrack provides analytics to help make the job search measurable rather than relying entirely on intuition.

The analytics experience includes:

- Total applications
- Application activity
- Interviews
- Offers
- Rejections
- Application status distribution
- Interview conversion
- Application trends

---

## 🧠 Why OxTrack?

Job hunting is often fragmented across multiple tools:

| Tool | Purpose |
| --- | --- |
| LinkedIn | Find jobs |
| Company careers pages | Submit applications |
| Spreadsheets | Track applications |
| Notes | Prepare for interviews |
| Calendars | Track interview dates |
| Email | Manage recruiter communication |

OxTrack brings this core tracking workflow into a single workspace.

> Treat the job search like a pipeline instead of a collection of disconnected applications.

---

## 🎨 Design Philosophy

OxTrack follows a productivity-focused interface inspired by modern developer and productivity tools.

The design focuses on:

- Clear visual hierarchy
- High information density without visual clutter
- Consistent spacing
- Reusable UI components
- Clear application states
- Responsive layouts
- Subtle animations
- Smooth transitions
- Fast interactions
- Minimal visual noise

Motion is intentionally restrained and primarily used to communicate state changes and hierarchy. Examples include:

- Application-card hover states
- Modal entrance animations
- Drawer transitions
- Backdrop transitions
- Staggered list animations
- Drag-and-drop feedback

---

## 🏗️ Architecture

OxTrack is built as a component-driven Next.js application.

```text
                         ┌─────────────────────┐
                         │      Next.js App    │
                         └──────────┬──────────┘
                                    │
                  ┌─────────────────┼─────────────────┐
                  │                 │                 │
                  ▼                 ▼                 ▼
            Applications        Analytics        Interviews
                  │                 │                 │
                  └─────────────────┼─────────────────┘
                                    │
                                    ▼
                             Zustand Store
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
             Application State                 UI State
             • Applications                     • Drawer
             • Status                           • Forms
             • Interviews                       • Selection
             • Recruiters                        • Editing
```

The project separates:

- UI components
- Application state
- Domain types
- Utility functions
- Analytics calculations
- Animation definitions
- Mock application data

This structure keeps the application modular and makes individual features easier to extend.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| --- | --- |
| [Next.js](https://nextjs.org/) | Application framework |
| [React](https://react.dev/) | User interface |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [Framer Motion](https://motion.dev/) | UI animations |
| [Zustand](https://zustand.docs.pmnd.rs/) | Client-side state management |
| [Lucide React](https://lucide.dev/) | Icons |

---

## 📁 Project Structure

```text
oxTrack/
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
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js 18+](https://nodejs.org/)
- npm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/pranav172/oxTrack.git
   ```

2. Navigate to the project directory:

   ```bash
   cd oxTrack
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the application at [http://localhost:3000](http://localhost:3000).

---

## ⚙️ Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Next.js development server. |
| `npm run build` | Creates an optimized production build. |
| `npm start` | Starts the production server after building the application. |

---

## 📊 Core Workflow

The primary OxTrack workflow is:

```text
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
   /     \
  /       \
 ▼         ▼
Rejected  Offer
```

At each stage, users can maintain relevant information and define the next action.

---

## 🔮 Future Improvements

Potential future versions of OxTrack could include:

- User authentication
- PostgreSQL persistence
- Cloud synchronization
- REST API
- Email integration
- Calendar integration
- Browser extension for saving jobs
- Automatic job importing
- Resume-to-job matching
- AI-powered job analysis
- Recruiter follow-up reminders
- Application success-rate analysis
- Automated interview preparation
- Notification system

---

## 📌 Project Status

OxTrack is an actively developed portfolio project.

The current version focuses on the core job-search workflow, application management, Kanban pipeline management, interview tracking, analytics, and a modern productivity-oriented interface.

---

## 👨‍💻 Author

**Pranav Raj**  
B.Tech Information Technology  
Manipal University Jaipur

- **Portfolio:** [pranavraj.xyz](https://www.pranavraj.xyz)
- **GitHub:** [@pranav172](https://github.com/pranav172)

---

## 📄 License

This project is licensed under the MIT License.
