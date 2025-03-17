# Kanban Board

A modern, responsive Kanban board application built with Vite, React, Redux, and react‑beautiful‑dnd. This project allows you to manage tasks across different stages — *To Do*, *In Progress*, *Peer Review*, and *Done* — with drag-and-drop functionality, a search feature to filter tasks by title, and a modal to add new tasks.

## Features

- **Kanban Board Layout:**  
  Four columns representing different task stages:
  - To Do
  - In Progress
  - Peer Review
  - Done

- **Task Cards:**  
  Each task card displays a title and a brief description. Cards are draggable between columns.

- **Drag and Drop:**  
  Implemented using [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd), allowing tasks to be moved easily between stages.

- **Search Functionality:**  
  A search bar filters tasks across all columns based on the task title.

- **Add New Tasks:**  
  A floating button opens a modal form that allows users to add a new task (which starts in the "To Do" column).

- **Responsive and Dynamic Design:**  
  The UI features modern design elements, interactive hover effects, animations, and a Kanban-inspired background.

- **State Management:**  
  Global state is managed using Redux (via Redux Toolkit).

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or above)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/kanban-board.git
   cd kanban-board
