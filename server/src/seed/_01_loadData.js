import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const loadData = async (fileName = 'data.json') => {

    // resolves to same folder as this file
    const filePath = path.join(__dirname, fileName);
    const fileData = fs.readFileSync(filePath, 'utf-8');

    const jsDataArray = JSON.parse(fileData);

    console.log(`📄 Loaded (${jsDataArray.length}) records...`);

    return jsDataArray;
}