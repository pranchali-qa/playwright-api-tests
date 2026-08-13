import fs from 'fs';

//utility function returns json file data
export function readJson(filePath: string) {
    JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const requestData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return requestData;
}