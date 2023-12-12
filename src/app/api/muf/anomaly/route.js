import MUF from "../../../../app/models/MUF";
import {NextResponse} from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const mufData = body;

      const res = await MUF.updateOne(
          {time: mufData.time},
          {
            $setOnInsert:  {anomalyMUF: mufData.anomalyMUF},
          },
          { upsert: true }
      )

    return NextResponse.json({ message: res }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
