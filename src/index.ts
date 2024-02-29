import app from './app';
import { startConnection } from './db/database';

startConnection();

async function main() {
  await app.listen(app.get('port'), () => {
    console.log(
      `Server is running on port: ${app.get('port')}`,
    );
  });
}

main();
