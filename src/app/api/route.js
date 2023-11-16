import clientPromise from "../../utils/mongodb";
import {NextResponse} from "next/server";

export async function GET() {

    try {
        const client = await clientPromise;
        const db = client.db("MUF_2023");

        const data = await db
            .collection("days")
            .find({})
            .project({muf:1, time:1, _id: 0})
            .toArray();
        
        const muf = data.map( function(p){return p.muf})
        const time = data.map( function(p){return p.time})
        const timeFormated = data.map( function(p){
          return {fTime: p.time.toUTCString(), time: p.time}
        })

        return NextResponse.json({muf, timeFormated, time});
    } catch (err) {
        return NextResponse.json({message: 'Error', err}, {status: 500});
    }
}

