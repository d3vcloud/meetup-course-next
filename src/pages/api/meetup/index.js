import { MongoClient } from 'mongodb';
// import db from "../../../utils/database";
// /api/meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(`mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_PASSWORD }@cluster0.kyx4z.mongodb.net/${ process.env.DB_NAME }`);

    const db = client.db(); 

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    //close connection with database
    client.close();

    return res.status(201).json({ message: "Meetup inserted!", result });

  } else if (req.method === "GET") {

    const client = await MongoClient.connect(`mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_PASSWORD }@cluster0.kyx4z.mongodb.net/${ process.env.DB_NAME }`);

    const db = client.db(); 

    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find().toArray();

    client.close();


    return res.status(200).json({meetups});
  }
}

export default handler;
