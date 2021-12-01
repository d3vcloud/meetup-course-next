import { MongoClient } from "mongodb";

export default async function handler(req, res) {

  const client = await MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kyx4z.mongodb.net/${process.env.DB_NAME}`);

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  const meetupsIds = await meetups.map((meetup) => ({
    params: { id: meetup._id.toString() },
  }));


  return res.status(200).json({ meetupsIds });

}
