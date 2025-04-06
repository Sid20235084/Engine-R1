
---

```markdown
# ⚙️ MERN AI Code Generator

A full-stack web application that allows users to input custom project requirements, which are then sent to a Gemini AI model to generate boilerplate project files (e.g., MERN stack setup) and write them to the filesystem.

---

## 🧠 Features

- ✍️ Accepts user instructions in plain English
- 🤖 Uses Gemini AI to generate project structure and code
- 📁 Automatically saves generated files into folders (`/client`, `/server`, etc.)
- 🖥️ Rich code editor with live markdown preview (upcoming)
- 🔒 Environment-variable-based configuration

---

## 🛠 Tech Stack

### ⚛️ Frontend
- React (Vite)
- Tailwind CSS
- PrismJS (for code highlighting)
- `react-simple-code-editor`
- `react-markdown` + `rehype-highlight` (for preview)

### 🖧 Backend
- Node.js + Express
- Gemini AI API
- `fs` module for file generation
- `dotenv` for config management

### 🗃️ Others (Upcoming)
- MongoDB
- Cloudinary

---

## 🚀 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sid20235084/Engine-R1.git
   ```

2. **Install dependencies:**

   - In the `frontend/` folder:
     ```bash
     npm install
     ```

   - In the `backend/` folder:
     ```bash
     npm install
     ```

3. **Create a `.env` file in the backend directory:**

   ```env
   GOOGLE_GEMINI_KEY="your-gemini-api-key"
   ```

4. **Start the servers:**

   - **Frontend (Vite):**
     ```bash
     npm run dev
     ```

   - **Backend (Express):**
     ```bash
     nodemon server.js
     ```

---

## 📸 Sample Screenshot

<p align="center">
  <a href="https://drive.google.com/file/d/1_8xYZsP4bmLxZwoIYBpmtweWdnfqaweu/view?usp=drivesdk" target="_blank">Preview</a>
  
</p>



🚧 Upcoming Features

    🔄 File Download Option
    Allow users to download the generated project files as a ZIP archive.

    🗂️ Generated Code File Tree View
    Show a real-time interactive file tree of the generated code in the UI.

    ✏️ Live File Editor
    Add a multi-tab code editor where users can modify generated files directly in the browser.

    ☁️ Cloud Storage Integration
    Save generated projects to the cloud (e.g., Firebase, AWS S3, or Cloudinary).

    🧠 Project Templates
    Offer predefined templates (e.g., "E-commerce App", "Blog Site") for quick setup.

    📝 Documentation Generator
    Automatically generate a README.md, .env.example, and API docs based on the project.

    📊 Project Analytics
    Show usage stats like number of generated projects, popular templates, etc.

    🔐 Authentication System
    Add user login/registration and save user-specific projects.

    🌍 Multi-language Support
    Allow users to generate code in multiple backend/frontend languages (e.g., Django, Flask, Vue).

    🔄 Regenerate Specific Files
    Let users modify a specific instruction and regenerate just one file or component.

    📬 Email Delivery
    Email the generated project as a ZIP to the user.

    📦 One-Click Deployment
    Deploy the generated app to platforms like Vercel, Netlify, or Render.