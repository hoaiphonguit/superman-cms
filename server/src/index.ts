import App from './server';
import { connectToServer } from './db/conn';
// Start the server
const port = Number(process.env.PORT || 5000);
App.listen(port, () => {
  // perform a database connection when server starts
  connectToServer();
  console.log(`Server is running on port: ${port}`);
});
