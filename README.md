# 📝 TodoList App

A sleek, interactive, and fun-to-use Todo List application built with React and Tailwind CSS, demonstrating component-based architecture and best practices.

## Features

- **Add Tasks**: Create new todos with a clean input interface
- **Edit Tasks**: Double-click any todo to edit it inline
- **Complete Tasks**: Mark todos as done with a visual checkbox
- **Delete Tasks**: Remove individual todos or clear all at once
- **Persistent Storage**: All data automatically saved to localStorage
- **Real-time Statistics**: Track total, pending, and completed tasks
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Keyboard Shortcuts**: Enter to save, Escape to cancel editing

## Tech Stack

- **React 18** - Component-based UI library
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Custom Hooks** - Reusable localStorage logic
- **Modern JavaScript** - ES6+ features and best practices

## Project Structure

```
src/
├── components/
│   ├── TodoInput.jsx      # Input component for adding new todos
│   ├── TodoItem.jsx       # Individual todo item with edit functionality
│   ├── TodoList.jsx       # Container component for todo list
│   └── TodoStats.jsx      # Statistics display component
├── hooks/
│   └── useLocalStorage.js # Custom hook for localStorage management
├── utils/
│   └── todoUtils.js       # Utility functions for todo operations
├── App.jsx                # Main application component
└── main.jsx              # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/react-todolist.git
cd react-todolist
```

2. Install dependencies:

```bash
npm install
```

3. Configure Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

4. Update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

5. Add Tailwind directives to `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

6. Start the development server:

```bash
npm run dev
```

7. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

### Adding Todos

- Type your task in the input field
- Press Enter or click "Add Task" button

### Editing Todos

- Double-click on any todo text to edit
- Press Enter to save or Escape to cancel
- Use the edit button for alternative access

### Managing Todos

- Click the circle to mark todos as complete/incomplete
- Click the delete button (×) to remove individual todos
- Use "Clear All" to remove all todos at once

### Keyboard Shortcuts

- `Enter` - Save changes or add new todo
- `Escape` - Cancel editing
- `Double-click` - Start editing a todo

## Component Architecture

The application follows a modular component structure:

- **App.jsx** - Manages global state and coordinates child components
- **TodoInput** - Handles new todo creation with controlled input
- **TodoList** - Container component that
- **TodoItem** - Individual todo with editing capabilities
- **TodoStats** - Displays statistics about todos

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## Development Guidelines

- Follow React best practices and hooks patterns
- Use functional components with hooks
- Maintain component single responsibility principle
- Write clear, self-documenting code
- Ensure responsive design for all screen sizes

## Future Enhancements

- [ ] Drag and drop reordering
- [ ] Task categories and filtering
- [ ] Due dates and reminders
- [ ] Dark mode theme
- [ ] Export/import functionality
- [ ] Task priority levels
- [ ] Search and advanced filtering

---

Built with ❤️ using React and modern web technologies
