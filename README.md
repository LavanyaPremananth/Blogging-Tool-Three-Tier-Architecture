# Blogging Tool - Three-Tier Architecture

This project implements a feature-rich blogging tool using a three-tier architecture consisting of the Presentation Layer (Client), the Application Layer (Server), and the Data Layer (Database). The tool allows authors to create, edit, and publish articles with a rich text editor and includes Bootstrap integration for responsive and visually appealing design.

## Website Architecture

- **Presentation Layer (Client):**
  - Built using HTML, CSS, and JavaScript.
  - Communicates with the server through RESTful API endpoints.
  - Enables viewing articles, creating new articles, editing existing articles, and managing author settings.

- **Application Layer (Server):**
  - Built using Node.js and Express.js.
  - Handles client requests, business logic, and interactions with the database.
  - Provides RESTful API endpoints for CRUD operations on articles and author settings.

- **Data Layer (Database):**
  - Uses SQLite for storing articles and author settings.
  - Server communicates with the database for read and write operations.

## Features

### Quill - Rich Text Editor Extension

- Implemented using the Quill library for enhanced article editing.
- Supports formatting options like bold, italic, lists, headers, colors, alignment, links, images, and videos.
- Updates the hidden form field with editor content dynamically.

### Bootstrap Integration

- Enhances front-end development and design.
- Provides responsive design features for optimal user experience across devices.
- Uses Bootstrap components (e.g., buttons, forms, cards) for a polished user interface.
- Leverages Bootstrap's grid system for organized content layout.
- Utilizes utility classes for specific layout and alignment requirements.

## Noteworthy Aspects

### Code Organization & Readability

- Well-commented codebase with explanations for complex logic.
- Reusable partial EJS templates to reduce code duplication and ensure consistency.
- Minimizes callback hell with structured and concise callback functions for maintainability.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/blogging-tool.git

2. Install dependencies:

  ```bash
    cd blogging-tool
    npm install
  ```

4. Start the server:

  ```bash
    npm start
  ```

6. Open the application in your browser:

    http://localhost:3000

# Additional Notes
This project demonstrates a practical implementation of a three-tier architecture for a blogging platform.
Contributions and feedback are welcome.
