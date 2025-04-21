import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

let client: MongoClient;
let db: Db;

export async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, options);
    await client.connect();
    db = client.db("ethiogigs");
  }
  return db;
}
