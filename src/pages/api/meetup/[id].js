import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  
  const { id } = req.query;

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kyx4z.mongodb.net/${process.env.DB_NAME}`
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(id) });
  
  client.close();

  return res.status(200).json({ selectedMeetup });
}
