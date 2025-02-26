# Namma-Mail

A modern email client built with React and TypeScript.

## Features

- 📧 Email composition with rich text editing
- 👥 Contact management with custom tags and categories
- 📁 Email organization with folders (inbox, sent, drafts)
- 🏷️ Email labeling and categorization
- 📎 File attachments support
- ⭐ Star/bookmark important emails
- 🌓 Light/Dark theme support
- 🔍 Advanced search functionality
- 📱 Responsive design

## Tech Stack

- React + TypeScript
- Vite for build tooling
- TailwindCSS for styling
- Radix UI for accessible components
- shadcn/ui for UI components
- React Icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Typescript
- npm or yarn

### Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/pawan-r4ju/Namma-Mail.git
    cd Namma-Mail
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Run the development server:**
    ```sh
    npm run dev
    ```

4. **Build for production:**
    ```sh
    npm run build
    ```

5. **Preview the production build:**
    ```sh
    npm run preview
    ```

## Project Structure

The project structure is organized as follows:

```
Namma-Mail/
├── public/                 # Static assets
├── src/                    # Source code
│   ├── assets/             # Images, fonts, etc.
│   ├── components/         # Reusable UI components
│   ├── contexts/           # React context providers
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   ├── services/           # API service calls
│   ├── styles/             # Global styles and TailwindCSS configurations
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main App component
│   ├── index.tsx           # Entry point
│   └── ...                 # Other files
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies and scripts
├── README.md               # Project documentation
├── tailwind.config.js      # TailwindCSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## Configuration
- **Vite Config:** `vite.config.ts`
- **TypeScript Config:** `tsconfig.json`
- **Tailwind CSS Config:** `tailwind.config.js`
- **Component Aliases:** `components.json`

