import 'colors';
import { Server } from 'http';
import app from './app';
import config from './app/config';

let server: Server;

async function main() {
  try {
    const server: Server = app.listen(config?.port, () => {
      console.log(
        'Healtrax is connected to database successfully'.rainbow.bold
      );
    });
  } catch (err) {
    console.log(err);
  }
}
main();

//if any error happens in async code, it will be caught here
process.on('unhandledRejection', () => {
  console.log(
    `unahandledRejection is detected , healtrax server is shutting down ...`
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

//if any error happens in sync code, it will be caught here
process.on('uncaughtException', () => {
  console.log(
    `uncaughtException is detected , healtrax server is shutting down ...`
  );
  process.exit(1);
});
