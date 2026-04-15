# JumpIn - Quantum Manufacturing Onboarding Platform

A comprehensive electrotechnician onboarding management platform built with modern web technologies. Transform new hires from beginners to certified professionals through structured, measurable onboarding experiences.

## 🌟 Key Features

- **Interactive Dashboard** - Real-time visibility into onboarding progress and work readiness metrics
- **Configurable Programs** - Three pre-configured scenarios (STARTER, ENABLED, MASTER) with customizable parameters
- **Maturity Assessment** - Visual pyramid-based skill level tracking from beginner to independent working
- **Skills Discovery** - Identify and catalog skill development needs with impact-effort scoring
- **Prioritization Matrix** - 2x2 impact-effort matrix for voting and prioritizing development initiatives
- **Development Canvas** - Comprehensive planning tool with metrics, milestones, scope, and risk management
- **Action Tracking** - Task management with progress monitoring, due dates, and ownership assignment
- **Shift Scheduling** - 2-week rotation calendar for supervised hands-on training shifts
- **Participant Management** - Team member tracking with attendance status and role definitions
- **Mentors** - Integrated mentor directory from Salesforce via HCL Volt MX Foundry
- **Data Persistence** - Automatic localStorage persistence across browser sessions

## 🛠️ Technology Stack

- **Vite** - Lightning-fast build tool and development server
- **React 18** - Modern UI library with functional components and hooks
- **TypeScript** - Type-safe development with comprehensive type definitions
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **React Router** - Client-side routing with nested layouts
- **Recharts** - Data visualization library for progress charts
- **Lucide React** - Beautiful, consistent icon system

## 🎨 Design System

### Colors
- **Primary (Indigo)**: #6366f1 - Main brand color for buttons, links, and emphasis
- **Accent (Teal)**: #14b8a6 - Secondary highlights and call-to-action elements
- **Neutral (Gray)**: 50-950 scale - Text, backgrounds, and borders

### Typography
- **Font Family**: Inter (Google Fonts) with system fallbacks
- **Weights**: 300-800 for hierarchy and emphasis
- **Responsive**: Scales appropriately across mobile, tablet, and desktop

### Components
- Consistent spacing (4px base unit)
- Smooth transitions and hover states
- Accessible focus indicators
- Mobile-first responsive design

## 📁 Project Structure

```
easy-jumpin/
├── public/
│   └── favicon.svg              # Custom Quantum Manufacturing logo
├── src/
│   ├── components/
│   │   ├── Layout.tsx           # Main layout with sidebar navigation
│   │   ├── Modal.tsx            # Reusable modal component
│   │   └── Toast.tsx            # Notification toast system
│   ├── data/
│   │   └── mockData.ts          # Seed data and scenario configurations
│   ├── lib/
│   │   └── AppContext.tsx       # Global state management with React Context
│   ├── pages/
│   │   ├── Overview.tsx         # Dashboard homepage
│   │   ├── Setup.tsx            # Onboarding configuration
│   │   ├── Participants.tsx    # Team member management
│   │   ├── RealityCheck.tsx    # Maturity pyramid assessment
│   │   ├── Discovery.tsx        # Skills identification
│   │   ├── Prioritization.tsx  # Impact-effort matrix
│   │   ├── Canvas.tsx           # Development planning
│   │   ├── Actions.tsx          # Task tracking
│   │   ├── Schedule.tsx         # Shift calendar
│   │   └── Settings.tsx         # Configuration and scenarios
│   ├── types/
│   │   └── index.ts             # TypeScript type definitions
│   ├── App.tsx                  # Root component with routing
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles and Tailwind imports
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd /home/node/txai-projects/project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173/app-91c9d9f2c2ba5040b74013d67c9682ac/`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📖 Usage Guide

### 10-Step Walkthrough

1. **Start at Overview** - Review the dashboard showing program statistics, readiness trajectory, and phase timeline
2. **Configure Setup** - Define program name, mentor, format, package level, duration, outputs, and constraints
3. **Add Participants** - Create team member profiles with roles and attendance status
4. **Assess Maturity** - Set current and target skill levels on the maturity pyramid (Beginner → Independent Working)
5. **Discover Skills** - Add skill development needs with impact/effort scores and automatic quadrant assignment
6. **Prioritize** - Vote on skills in the 2x2 matrix (Quick Wins, Strategic Bets, Fill-in Jobs, Money Pits)
7. **Plan on Canvas** - Define success metrics, scope, solution approach, timeline, resources, and risks
8. **Create Actions** - Add tasks with owners, due dates, and completion tracking
9. **Review Schedule** - Check the 2-week shift rotation calendar with status indicators
10. **Adjust Settings** - Update branding, load different scenarios, or reset demo data

### Data Persistence

All changes are automatically saved to browser localStorage:
- Survives page refreshes
- Persists across browser sessions
- Unique to each browser/device
- Can be reset via Settings page

### Demo Scenarios

Three pre-configured scenarios for different team sizes and complexity:

- **STARTER** (45 min, 3 participants) - Basic onboarding for small teams
- **ENABLED** (60 min, 4 participants) - Standard program with full workshop
- **MASTER** (90 min, 5 participants) - Comprehensive with executive oversight

## 🏗️ Architecture Overview

### SPA Design
Single-page application with client-side routing for instant navigation without page reloads.

### State Management
- **React Context API** - Global state provider wrapping entire application
- **localStorage Integration** - Automatic persistence on every state change
- **Immutable Updates** - Functional state updates prevent mutation bugs

### Data Flow
1. User interacts with UI component
2. Component calls context method (e.g., `addParticipant`)
3. Context updates state immutably
4. State change triggers localStorage save
5. All subscribed components re-render
6. Toast notification confirms action

### Responsive Design
- **Mobile-first approach** - Base styles for mobile, enhanced for larger screens
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Collapsible sidebar** - Hamburger menu on mobile, fixed on desktop
- **Responsive grids** - Stack on mobile, multi-column on tablet/desktop
- **Touch-friendly** - Large tap targets, swipe gestures

## 🎯 Key Patterns

### Consultative Tone
All copy emphasizes empowerment, measurable outcomes, and professional development rather than just task completion.

### Enterprise SaaS Aesthetics
- Clean, professional interface
- Consistent spacing and alignment
- Clear visual hierarchy
- Generous white space
- Subtle shadows and depth

### Mock Interactions
All CRUD operations work fully:
- Add, edit, delete participants, actions, use cases
- Update configuration and canvas
- Toggle completion status
- Vote on prioritization items
- Load/reset scenarios

## 🌐 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## ⚡ Performance Notes

- **Fast initial load** - Vite's optimized bundling and code splitting
- **Instant navigation** - Client-side routing with no page reloads
- **Efficient re-renders** - React Context with selective subscriptions
- **localStorage caching** - State restored instantly on reload
- **Lazy loading ready** - Architecture supports code splitting for larger apps

## 🔌 HCL Volt MX Foundry Integration

The application integrates with **HCL Volt MX Foundry** to access mentor information from Salesforce.

### Mentors Page

The Mentors page displays contact information from Salesforce through the SF-MQ-Leona Integration Service:

- **Real-time data** - Fetches mentor contacts directly from Salesforce
- **Contact details** - Name, title, department, email, phone numbers
- **Expandable cards** - View detailed information including location and languages
- **Statistics** - Real-time counts of total mentors and contact availability
- **Refresh capability** - Manual refresh to get latest data

### Configuration

Set up your Foundry connection by updating the `.env` file:

```bash
# Foundry Service Host (from your Swagger export)
VITE_FOUNDRY_SERVICE_HOST=dsta-dev.demo-hclvoltmx.net/services

# Foundry App Credentials (from Foundry Console)
VITE_FOUNDRY_APP_KEY=your_app_key_here
VITE_FOUNDRY_APP_SECRET=your_app_secret_here
```

**To get your credentials:**
1. Log in to HCL Volt MX Foundry Console
2. Navigate to your application
3. Copy the **App Key** and **App Secret**
4. Paste them into your `.env` file

### Architecture

- **Service Client** - `SFMQLeonaClient.ts` handles API communication
- **React Hook** - `useMentors.ts` manages data fetching and state
- **TypeScript Types** - Full type safety with `Contact` interface
- **Error Handling** - User-friendly error messages for configuration issues

### Available Services

- **Contact_get** - Retrieve mentor/contact information
- **Account_get** - Retrieve account information
- **Account_update** - Update account records

## 🔮 Future Enhancements

1. **User Authentication** - Login/logout with role-based access control
2. **Real Backend Integration** - Replace localStorage with API calls to server database
3. **Multi-tenant Support** - Separate data per organization with tenant isolation
4. **PDF Export** - Generate formatted reports from Canvas and Action plans
5. **Email Notifications** - Automated reminders for upcoming deadlines
6. **Advanced Analytics** - Trends, comparisons, and predictive insights
7. **Mobile App** - Native iOS/Android apps with offline support
8. **Collaborative Editing** - Real-time multi-user editing with WebSockets
9. **Template Library** - Pre-built onboarding templates for different roles
10. **Integration Ecosystem** - Connect with HRMS, LMS, and calendar systems

## 👏 Credits

**Built by Leona - Vibe coding Agent from HCL Software**

This application demonstrates modern React development practices, comprehensive TypeScript usage, and professional UI/UX design patterns.

## 📄 License

**Proprietary - Quantum Manufacturing Internal Use**

This software is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

---

For questions, support, or feature requests, contact the Quantum Manufacturing IT team.
