import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

let client: MongoClient;
let db: Db;

export async function connectToDatabase(): Promise<Db> {
  if (!client) {
    client = new MongoClient(uri, options);
    await client.connect(); // Will automatically connect.
    db = client.db("ethiogigs"); // Make sure you're connected to the correct database.
  }

  return db;
}
