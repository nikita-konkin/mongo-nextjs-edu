import clientPromise from "../../../utils/mongodb";
import {NextResponse} from "next/server";

export async function GET() {

    try {
        const client = await clientPromise;
        const db = client.db("MUF_2023");
        // Подключение к БД
        const data = await db
            .collection("days") // Выбор к коллекции
            .find({}) // Выбор всех записей
            .project({muf:1, time:1, _id: 0}) // Фильтрация колонок muf и time
            .toArray();
        // Асинхронный запрос к БД.
        const muf = data.map(function(p){return p.muf})

        const time = data.map(function(p){return p.time})
        const timeFormated = data.map( function(p){
          return {fTime: p.time.toUTCString(), time: p.time}
        })

        return NextResponse.json({muf, timeFormated, time});
    } catch (err) {
        console.log(err);
        return NextResponse.json({message: 'Error', err}, {status: 500});
    }
}

