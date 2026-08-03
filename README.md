# DevFlow

DevFlow is a modern productivity web application designed to help users manage tasks, notes, and personal progress through a clean and visually appealing dashboard. It provides a practical all-in-one workspace for organizing daily work with a responsive and user-friendly interface.

## Overview

DevFlow combines several productivity tools in one place:
- Task management
- Note-taking and review
- A dashboard for tracking progress and activity
- Secure authentication using Firebase
- A responsive experience for desktop and mobile devices

## Key Features

- User registration and login with Firebase Authentication
- Task management with create, update, delete, and progress tracking
- Notes management with sorting, filtering, and deletion options
- Dashboard views including:
  - Daily progress
  - Upcoming deadlines
  - Recent activity
  - Productivity insights
  - A Quote of the Day card that loads a random quote from an external API
- User settings and preferences
- Responsive design suitable for different screen sizes

## Tech Stack

- React.js
- Vite
- React Router
- Firebase Authentication and Firestore
- External API integration for the Quote of the Day card
- Recharts for data visualization
- CSS Modules for styling
- Lucide React for icons

## Project Structure

```bash
src/
├── components/
│   ├── common/
│   ├── layouts/
│   └── ui/
├── context/
├── firebase/
├── pages/
│   ├── Auth/
│   ├── Dashboard/
│   ├── Notes/
│   ├── Settings/
│   └── Tasks/
├── services/
├── styles/
└── utils/
```

## Prerequisites

Before getting started, make sure you have:
- Node.js 18 or later
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd DevFlow
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Firebase Setup

This project uses Firebase for Authentication and Firestore. If you want to run your own version, update the configuration in:

```bash
src/firebase/config.js
```

Replace the existing Firebase values with your own project credentials.

## Usage

After logging in, you can:
- Create and manage tasks
- Write and organize notes
- Track your progress from the dashboard
- Customize your account settings

## Contributing

Contributions, suggestions, and pull requests are welcome. If you encounter any issues, please open a new issue in the repository.

## License

This project is intended for educational and development purposes and can be modified or extended based on your needs.
