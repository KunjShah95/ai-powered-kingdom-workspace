import chokidar from 'chokidar';
import path from 'path';
import { WebSocketService } from './websocket.service';

export class FileWatcherService {
    private watcher: chokidar.FSWatcher | null = null;
    private wsService: WebSocketService;
    private watchDir: string;

    constructor(watchDir: string) {
        this.wsService = WebSocketService.getInstance();
        this.watchDir = path.resolve(watchDir);
        this.initializeWatcher();
    }

    private initializeWatcher(): void {
        console.log(`Initializing file watcher for: ${this.watchDir}`);

        this.watcher = chokidar.watch(this.watchDir, {
            ignored: [
                /(^|[\/\\])\../, // ignore dotfiles
                '**/node_modules/**',
                '**/dist/**',
                '**/.git/**',
                '**/backend/**' // avoid infinite loops if backend is inside watch dir
            ],
            persistent: true,
            ignoreInitial: true
        });

        this.watcher
            .on('add', (filePath) => this.handleFileChange('add', filePath))
            .on('change', (filePath) => this.handleFileChange('change', filePath))
            .on('unlink', (filePath) => this.handleFileChange('unlink', filePath));

        console.log('File watcher initialized');
    }

    private handleFileChange(event: string, filePath: string): void {
        const relativePath = path.relative(this.watchDir, filePath);
        console.log(`File ${event}: ${relativePath}`);

        this.wsService.broadcast('file:change', {
            event,
            path: relativePath,
            timestamp: new Date().toISOString()
        });
    }
}
