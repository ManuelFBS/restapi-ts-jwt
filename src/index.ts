import app from './app';
import { startConnection } from './db/database';

async function main() {
  startConnection();

  await app.listen(app.get('port'), () => {
    console.log(
      `Server is running on port: ${app.get('port')}`,
    );
  });
}

main();
