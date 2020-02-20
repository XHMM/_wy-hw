import { createServer, Server } from 'http';
import * as express from 'express';
import { Application, Request, Response, NextFunction } from 'express';
import * as cors from 'cors';
import { todosRouter } from './routers/todos';

export default class App {
  private readonly app: Application;
  private readonly server: Server;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.init();
  }

  async listen(port: number | string): Promise<void> {
    await new Promise((resolve, reject) => {
      this.server.on('error', err => {
        reject(err);
      });
      this.server.listen(port, () => {
        resolve();
      });
    });
  }
  private init(): void {
    this.app.use(cors());
    this.app.use(express.json());

    // register business router here
    this.app.use(todosRouter);

    this.app.use((err, req: Request, res: Response, next: NextFunction) => {
      console.error('error occurred:');
      console.error(err);
      res.status(500).send('Server Error');
    });
  }
}


