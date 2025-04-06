import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_KEY });

function escapeControlChars(str) {
  // This regex matches control characters (except newline \n and tab \t)
  return str.replace(/[\x00-\x08\x0B-\x1F\x7F]/g, (c) => {
    return '\\u' + ('000' + c.charCodeAt(0).toString(16)).slice(-4);
  });
}

async function generateCode(Instructions) {
  let resultText = '';
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro-exp-03-25',
      contents: `${Instructions}`,
      config: {
        systemInstruction: `
        You are a senior MERN stack developer with 10+ years of experience.
        Your responses must always return a JSON object with these keys:
        - "text": a description of the generated project
        - "fileTree": a mapping of file paths to file contents (each file has a "file": { "contents": "..." } structure)
        - "buildCommand": an object with fields "mainItem" and "commands" (for reference only)
        - "startCommand": an object with fields "mainItem" and "commands" (for reference only)

        Please generate a full MERN stack project with the following specifications:

        Backend:
        - Use Express, MongoDB, and Mongoose.
        - Create a modular folder structure with folders such as routes, controllers, models, middlewares, and config.
        - Implement a simple user authentication system with routes under /api/users (supporting GET and POST).
        - Define a User model with fields: name, email, password.
        - Use dotenv and cors.
        - Generate a .env.example file in the server folder with these keys and placeholder values:
            PORT=5000
            MONGO_URI=your_mongo_uri_here
            JWT_SECRET=your_jwt_secret_here
        - Include a package.json with a "start" script.

        Frontend:
        - Use React with Vite and TailwindCSS.
        - Create a simple UI with a Home page and a Users page that fetches data from /api/users.
        - Use a modular folder structure in the client folder.
        - Generate a .env.example file in the client folder if any environment variables are needed.
        - Include a package.json with a "dev" script.

        General:
        - Do not install dependencies or run the server; only generate all necessary files.
        - Return the fileTree in JSON format with every file's contents.
        - Do not use file names like routes/index.js; use descriptive file names instead.

        Return the output in JSON exactly in the following format:

        {
          "text": "Description of the file structure",
          "fileTree": {
            "server/app.js": { "file": { "contents": "..." } },
            "server/package.json": { "file": { "contents": "..." } },
            "server/.env.example": { "file": { "contents": "..." } },
            "client/index.html": { "file": { "contents": "..." } },
            "client/src/App.jsx": { "file": { "contents": "..." } },
            "client/package.json": { "file": { "contents": "..." } },
            "client/.env.example": { "file": { "contents": "..." } }
          },
          "buildCommand": { "mainItem": "npm", "commands": ["install"] },
          "startCommand": { "mainItem": "node", "commands": ["app.js"] }
        }
        `,
      },
    });

    resultText = await response.text;

    // Strip markdown code fences if present
    resultText = resultText.trim();
    if (resultText.startsWith('```')) {
      const lines = resultText.split('\n');
      lines.shift();
      lines.pop();
      resultText = lines.join('\n').trim();
    }

    // Escape control characters in the text
    resultText = escapeControlChars(resultText);

    return JSON.parse(resultText);
  } catch (error) {
    console.error("❌ Response is not valid JSON. Raw output:\n", resultText);
    console.error("Error:", error.message || error);
    return { error: 'Failed to parse Gemini response.' };
  }
}

export default generateCode;
