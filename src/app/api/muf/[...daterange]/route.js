import clientPromise from "../../../../utils/mongodb";
import {NextResponse} from "next/server";



export async function GET(reqwest, {params}) {
  const { daterange } = params

  try {
    const client = await clientPromise;
    const db = client.db("MUF_2023");

    const data = await db
      .collection("days")
      .find({ time: 
      {$gte: new Date(daterange[0]), 
      $lt: new Date(daterange[1])}
      })
      .project({muf:1, time:1, _id: 0})
      .toArray();
    
    const muf = data.map( function(p){return p.muf})
    const time = data.map( function(p){return p.time})

    return NextResponse.json({muf, time});

  } catch (err) {
      return NextResponse.json({message: 'Error', err}, {status: 500});
  }
}
