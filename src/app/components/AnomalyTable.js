"use client"

const AnomalyTable = ({anomalyDots, setAnomalyDots, postAnomaliesdMUF}) => {

  const removeDot = (e) => {

    const dotToRemove = e.target.textContent.split(' ')[0]
    const result = anomalyDots.filter((obj) => obj.time  !== dotToRemove)
    setAnomalyDots(result)

  }

  let uniqueDots = [...new Set(anomalyDots.map(i => JSON.stringify(i)))].map(i => JSON.parse(i));
  return(

    <div className="flex-col">
      <h3>Списко аномалий</h3>
      <table className="min-h-[5%] w-[100%] border-separate font-extralight" 
              key='anomalyTable'>
        <tbody>
          <tr>
            <th className="border-2 rounded-xl font-extralight" >time</th>
            <th className="border-2 rounded-xl font-extralight" >anomalyMUF</th>
          </tr>

          {uniqueDots.map((v)=>
            <tr onClick={removeDot} key={v.time}>
              <th className="border-2 rounded-xl font-extralight" >{v.time}</th>
              <th className="border-2 rounded-xl font-extralight" >{v.anomalyMUF}</th>
            </tr>
            )}
        </tbody>
      </table>
      <input type="button" 
      value="Отправить" 
      onClick = {postAnomaliesdMUF}
      className="border-2 rounded-xl min-w-full cursor-pointer" 

      />
    </div>

    )
}


export default AnomalyTable