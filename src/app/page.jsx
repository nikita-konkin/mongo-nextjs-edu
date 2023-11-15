import Image from 'next/image'
import PlotGraph from "./components/PlotGraph";



const getMUF = async () => {
  try {
    const res = await fetch("http://localhost:3000/api",{
      cache: "no-store",
    });
    if (!res.ok){
      throw new Error("Failed to fetch MUF")
    }

    return res.json()

  } catch (error) {
    console.log("Error", error)
  }
};



export default async function Home() {

  const mufData = await getMUF()

  return (
    <main className="flex min-h-screen max-w-7xl my-10 mx-auto flex-col space-y-5 font-ledger">
      <div className="w-full">
        <h1 className="text-left text-3xl">
        Ионозонд ПГТУ 
        </h1>
        <h2 className="text-xl mt-2 bg-sky-900 rounded min-w-xl">
        Прогнозирование параметров радиотрассы
        </h2>
      </div>
      {/*<content className="flex w-full h-full m-0">*/}
      <PlotGraph mufData={mufData} />

{/*          <div>
            <h3>Шаг прогноза</h3>
            <div className="m-1">
              <select id='pred_days_step' className="mr-10 text-black">
                <option value="">Volvo</option>
              </select>
              <select id='pred_time_step'>
                <option value="">Volvo</option>
              </select>
            </div>
          </div>
          <div>
            <h3>Модель прогнозирования</h3>
            <div className="m-1">
              <label>Модель : </label>
              <select id='pred_model'>
                <option value="">Volvo</option>
              </select>
            </div>
          </div>
          <div>
            <h3>Период накопления (тренировки)</h3>
            <div className="m-1">
              <select id='train_date_start' className="mr-10">
                <option value="">Volvo</option>
              </select>
              <select id='train_date_stop'>
                <option value="">Volvo</option>
              </select>
            </div>
          </div>*/}

{/*        <result className="bg-sky-100 w-1/2 h-3/4">
        <Linechart data={data}/>
        </result>*/}
      {/*</content>*/}
    </main>
  )
}
