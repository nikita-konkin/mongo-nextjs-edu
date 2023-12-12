import PlotGraph from "./components/PlotGraph";

const getMUF = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/muf", {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch MUF")
        }
        
        return res.json()

    } catch (error) {
        console.log("Error", error)
    }
};


export default async function Home() {

    const mufData = await getMUF()

    console.log(mufData)
    
    return (
      <main className="flex min-h-screen max-w-7xl 
                      my-10 mx-auto flex-col space-y-5 font-ledger">
        <div className="w-full">
          <h1 className="text-left text-3xl">
          Анализ временного ряда  
          </h1>
          <h2 className="text-xl mt-2 bg-sky-900 rounded min-w-xl">
          Поиск аномалий МПЧ
          </h2>
        </div>
        <PlotGraph mufData={mufData} />
      </main>
    )
}