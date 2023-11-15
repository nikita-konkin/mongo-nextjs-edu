import clientPromise from "../../../../utils/mongodb";
import {NextResponse} from "next/server";



export async function GET(reqwest, {params}) {
    const { daterange } = params
    // console.log(daterange[0])
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
            // .limit(10)
            .toArray();
        
        const muf = data.map( function(p){return p.muf})
        const time = data.map( function(p){return p.time})
        // const timeFormated = data.map( function(p){return {fTime: p.time.toUTCString(), time: p.time}})
        // console.log(Object.keys(timeFormated).map(function(key, val){return timeFormated[key].time}))
        // console.log(muf)
        return NextResponse.json({muf, time});
    } catch (err) {
        return NextResponse.json({message: 'Error', err}, {status: 500});
    }
}
