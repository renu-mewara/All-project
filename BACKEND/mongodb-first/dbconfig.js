const { MongoClient } = require('mongodb');


// Connection URL
const url = 'mongodb+srv://renumewara98_db_user:WpPwd5HNagyDtvdt@cluster0.fkcdakx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(url);

// Database Name
const dbName = 'mongodb_practice';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);

  // the following code examples can be pasted here...

  return db;
}

module.exports = main;