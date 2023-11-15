// import clientPromise from "../../../utils/mongodb";
import MUF from "../../../../app/models/MUF";
import {NextResponse} from "next/server";



export async function POST(req) {
  try {
    const body = await req.json();
    const mufData = body;
    console.log(mufData)
    // const client = await clientPromise;
    // const db = client.db("MUF_2023");

    // await db
    // .collection("days")
    // .find({ time: 
    // {$gte: new Date(daterange[0]), 
    // $lt: new Date(daterange[1])}
    // })
    // .project({muf:1, time:1, _id: 0})
    // .toArray();

      const res = await MUF.updateOne(
          {time: mufData.time},
          {
           // time: mufData.time, anomalyMUF: mufData.anomalyMUF 
            $setOnInsert:  {anomalyMUF: mufData.anomalyMUF},
            // $setOnInsert:  { v} 
          },
          { upsert: true }
      )
    // await MUF.create(mufData)

    return NextResponse.json({ message: res }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
