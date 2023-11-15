import clientPromise from "../../utils/mongodb";
import {NextResponse} from "next/server";


export async function GET() {

    try {
        const client = await clientPromise;
        const db = client.db("MUF_2023");

        const data = await db
            .collection("days")
            .find({})
            // .find({ time: 
            // {$gte: new Date('2020-01-02T21:00:10.000+00:00'), $lt: new Date('2020-01-02T21:25:10.000+00:00')}
            // })
            .project({muf:1, time:1, _id: 0})
            // .limit(10)
            .toArray();
        
        const muf = data.map( function(p){return p.muf})
        const time = data.map( function(p){return p.time})
        const timeFormated = data.map( function(p){return {fTime: p.time.toUTCString(), time: p.time}})
        // console.log(Object.keys(timeFormated).map(function(key, val){return timeFormated[key].time}))

        return NextResponse.json({muf, timeFormated, time});
    } catch (err) {
        // console.log('error');
        console.log(err);
        return NextResponse.json({message: 'Error', err}, {status: 500});
    }
}

