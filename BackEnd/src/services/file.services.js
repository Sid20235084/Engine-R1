// writeGeneratedFiles.js
import fs from 'fs';
import path from 'path';

/**
 * Recursively writes the fileTree structure into the specified base directory.
 * Each entry in fileTree is expected to be in the format:
 * { "file": { "contents": "file content here" } }
 *
 * @param {Object} fileTree - The JSON mapping of file paths to file objects.
 * @param {string} basePath - The base directory where the files will be created.
 */
function writeFilesFromTree(fileTree, basePath = '.') {
  for (const [filePath, fileData] of Object.entries(fileTree)) {
    const fullPath = path.join(basePath, filePath);
    if (fileData?.file?.contents !== undefined) {
      const dir = path.dirname(fullPath);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(fullPath, fileData.file.contents.trim(), 'utf8');
      console.log(`Created: ${fullPath}`);
    } else if (typeof fileData === 'object') {
      writeFilesFromTree(fileData, fullPath);
    }
  }
}

export default writeFilesFromTree;
