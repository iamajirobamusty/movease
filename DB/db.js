import { MongoClient } from 'mongodb';

const url = 'mongodb://127.0.0.1';
const client = new MongoClient(url);

const dbName = 'movease';

async function main() {
    await client.connect();
    console.log('Connected succesfully');
    const db = client.db(dbName);
    const collection = db.collection('users');

    return 'done.';
}

main().then(console.log).catch(console.error).finally(() => client.close());