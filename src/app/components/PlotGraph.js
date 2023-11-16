
"use client"
import Linechart from "./Linechart";
import React, {useState, useEffect} from "react"
import AnomalyTable from "./AnomalyTable";

async function getGraphPointsData (e, activeEls) {
  let datasetIndex = activeEls[0].datasetIndex;
  let dataIndex = activeEls[0].index;
  let datasetLabel = e.chart.data.datasets[datasetIndex].label;
  let value = e.chart.data.datasets[datasetIndex].data[dataIndex];
  let label = e.chart.data.labels[dataIndex];
  console.log("In click", datasetLabel, label, value);
  }

 const PlotGraph = ({ mufData }) => {
  
  let [dateStart, setDateStart] = useState('') 
  let [dateStop, setDateStop] = useState('')
  let [graphData, setGraphData] = useState({})
  let [graphLables, setGraphLables] = useState({})
  let [anomalyDots, setAnomalyDots] = useState([])

  useEffect(()=>{

    setGraphData(mufData)

  }, [mufData])


  const getRangeData = () => {

    const dateRange = [dateStart, dateStop]
    getFilteredMUF(`${dateStart}/${dateStop}`)
    .then((v)=>{setGraphData(v)})
    
  }

  
  const getFilteredMUF = async (daterange) => {

    try{

      const res = await fetch(
        `http://localhost:3000/api/muf/${daterange}`, 
        {
        cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch topic");
      }

      return res.json();
    } catch (error) {
      console.log("Error", error)
    }

  }

  const postAnomaliesdMUF = async () => {
    await anomalyDots.forEach((v)=>{
    try{

      const res = fetch(`http://localhost:3000/api/muf/anomaly`, {
        method: "POST",
        body: JSON.stringify(v),
        "Content-Type": "application/json",
      });

      if (!res) {
        throw new Error("Failed to post anomalyDots");
      } else {
        setAnomalyDots([])
      }

    } catch (error) {
      console.log("Error", error)
    }
  })

  }

  function callbackSelect(e) {
    for (let node of e.target.children) {
      if (node.value === e.target.value) {
        if (e.target.id == 'date_start'){
          setDateStart(node.getAttribute('id'))
        } else {
          setDateStop(node.getAttribute('id'))
        }
      }
    }
  }

  return (
    <div className="flex space-x-10">
      <div className="flex-col space-y-5 w-[70%] text-center">
        <div className="bg-white">
          <Linechart data = {graphData} setAnomalyDots = {setAnomalyDots} 
            anomalyDots={anomalyDots}/>
        </div>
        <h3>Выбор временного отрезка</h3>
        <div className = "">
          <select id='date_start' className = "mr-10 text-black rounded-xl"
            onClick={callbackSelect}>
            {mufData.timeFormated.map((val)=><option id = {val.time} 
                                key = {val.time}>{val.fTime}</option>)}  
          </select>
          <select id='date_stop' className = "mr-10 text-black rounded-xl" 
            onClick={callbackSelect}>
            {mufData.timeFormated.map((val) => <option id = {val.time} 
                                key = {val.time}>{val.fTime}</option>)}
          </select>
        </div>
        <input
          className="border-2 rounded-xl w-[100%] 
                      max-w-[50%] cursor-pointer"
          type = "button" 
          value = "Plot"
          onClick = {getRangeData}
        />
      </div>
      <AnomalyTable
        anomalyDots = {anomalyDots} 
        setAnomalyDots = {setAnomalyDots}
        postAnomaliesdMUF = {postAnomaliesdMUF}
      />
    </div>
  );
}

export default PlotGraph