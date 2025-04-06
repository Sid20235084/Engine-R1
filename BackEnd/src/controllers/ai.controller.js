import generateCode from '../services/ai.service.js';
import writeFilesFromTree from '../services/file.services.js' // Ensure correct import path
import path from 'path';

const BASE_DIR = path.join(process.cwd(), 'generated-mern-app');

export const getResponse = async (req, res) => {
  try {
    const { Instructions } = req.body;

    if (!Instructions) {
      return res.status(400).json({ error: 'Instruction is required' });
    }

    console.log("Generating MERN project files...");
    const response = await generateCode(Instructions);

    // Check if fileTree exists in the response
    if (!response.fileTree) {
      console.error("No fileTree found in response:", response);
      return res.status(500).json({ error: 'Failed to generate file tree.' });
    }

    // Write the entire file tree to the BASE_DIR
    writeFilesFromTree(response.fileTree, BASE_DIR);

    console.log(`✅ Project files have been generated in ${BASE_DIR}`);
    console.log(`\nNext steps:`);
    console.log(`1. For the backend: Navigate to ${BASE_DIR}/server, run 'npm install', and create a .env file based on .env.example.`);
    console.log(`2. For the frontend: Navigate to ${BASE_DIR}/client, run 'npm install', and start the development server using 'npm run dev'.`);

    // Return a JSON response with success message and next steps
    res.status(200).json({
      message: 'Project files generated successfully.',
      nextSteps: [
        `Navigate to ${BASE_DIR}/server, run 'npm install', and create a .env file based on .env.example.`,
        `Navigate to ${BASE_DIR}/client, run 'npm install', and start the development server using 'npm run dev'.`
      ]
    });
  } catch (error) {
    console.error('Error in getResponse:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
