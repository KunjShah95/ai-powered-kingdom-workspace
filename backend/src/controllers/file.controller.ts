import { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';

const ROOT_DIR = path.resolve(process.cwd(), '..'); // Assuming backend is in a subdir of project root

export class FileController {
    static async listFiles(req: Request, res: Response) {
        try {
            // This is a simplified list. For a full tree, we'd need a recursive function.
            // For now, let's just return the root structure or a specific path if provided.
            const dirPath = req.query.path ? path.resolve(ROOT_DIR, String(req.query.path)) : ROOT_DIR;

            // Security check
            if (!dirPath.startsWith(ROOT_DIR)) {
                return res.status(403).json({ error: 'Access denied' });
            }

            const files = await fs.readdir(dirPath, { withFileTypes: true });
            const fileList = files.map(file => ({
                name: file.name,
                isDirectory: file.isDirectory(),
                path: path.relative(ROOT_DIR, path.join(dirPath, file.name))
            }));

            res.json(fileList);
        } catch (error) {
            res.status(500).json({ error: 'Failed to list files' });
        }
    }

    static async readFile(req: Request, res: Response) {
        try {
            const filePath = path.resolve(ROOT_DIR, req.params.filepath);

            if (!filePath.startsWith(ROOT_DIR)) {
                return res.status(403).json({ error: 'Access denied' });
            }

            const content = await fs.readFile(filePath, 'utf-8');
            res.json({ content });
        } catch (error) {
            res.status(404).json({ error: 'File not found' });
        }
    }

    static async writeFile(req: Request, res: Response) {
        try {
            const filePath = path.resolve(ROOT_DIR, req.params.filepath);
            const { content } = req.body;

            if (!filePath.startsWith(ROOT_DIR)) {
                return res.status(403).json({ error: 'Access denied' });
            }

            await fs.writeFile(filePath, content, 'utf-8');
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Failed to write file' });
        }
    }
}
