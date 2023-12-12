"use client"
// Импорт компонента построения графика
import Linechart from "./Linechart";
// Импорт модулей useState и useEffect
import React, { useState, useEffect } from "react"
// Испорт компонента работы с выбранными аномалиями МПЧ
import AnomalyTable from "./AnomalyTable";

// Функция получает на вход весь датасет МПЧ из БД
// средствами porps (mufData)
const PlotGraph = ({ mufData }) => {
    // Начало диапазона хранения даты для построения графика
    let [dateStart, setDateStart] = useState('')
    // Конец диапазона хранения даты для построения графика
    let [dateStop, setDateStop] = useState('')
    // Датасет на основе которого строится график
    let [graphData, setGraphData] = useState({})
    // Массив хранения массива отмеченных точек МПЧ (на графике)
    let [anomalyDots, setAnomalyDots] = useState([])

    useEffect(() => {
        // Задаем датасет для построения графика 
        // при загркузке страницы
        setGraphData(mufData)

    }, [])

    // Функция отправки запроса на получения значений
    // МПЧ за интересующий диапазон дат
    const getRangeData = () => {

        getFilteredMUF(`${dateStart}/${dateStop}`)
            .then((v) => { setGraphData(v) })

    }

    // Аснихронная функция для отправки запроса в БД
    // для получения диапазона МПЧ за интересующий
    // диапазон дат
    const getFilteredMUF = async (daterange) => {

        try {

            const res = await fetch(
                `http://localhost:3000/api/muf/${daterange}`, {
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
    // Асинхронная функция для отправи запроса в БД
    // длясохранения массива аномальных точек МПЧ
    const postAnomaliesdMUF = async () => {
        // Отправка POST запроса для каждого
        // значения массива anomalyDots
        await anomalyDots.forEach((v) => {
            try {

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

    // Функция фиксирования начальной и конечной
    // даты для запроса getFilteredMUF
    function callbackSelect(e) {
        // В цикле выполняется поиск выбранной
        // пользователем даты по событию
        for (let node of e.target.children) {
            if (node.value === e.target.value) {
                if (e.target.id == 'date_start') {
                    // После выполнения условия совпадения
                    // дочернего объекта с целевым и с
                    // id = date_start заносим в стэйт dateStart
                    // выбранную пользователем дату
                    setDateStart(node.getAttribute('id'))
                } else {
                    setDateStop(node.getAttribute('id'))
                }
            }
        }
    }

    return (
      // Базовый контейнер
      <div className="flex space-x-10">
          {/*Контейнер для хранениягрфика и селекторов*/}
          <div className="flex-col space-y-5 w-[70%] text-center">
            {/*Контейнер для графика с белым фоном*/}
            <div className="bg-white">
              <Linechart data = {graphData} setAnomalyDots = {setAnomalyDots} 
                anomalyDots={anomalyDots}/>
            </div>
            {/*Блок выбора диапазона дат*/}
            <h3>Выбор временного отрезка</h3>
            <div>
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
            {/*Кнопка отправки запроса*/}
            <input
              className="border-2 rounded-xl w-[100%] 
              max-w-[50%] cursor-pointer"
              type = "button" 
              value = "Plot"
              onClick = {getRangeData}
            />
          </div>
          {/*Компонент работы с таблицами*/}
          <AnomalyTable
            anomalyDots = {anomalyDots} 
            setAnomalyDots = {setAnomalyDots}
            postAnomaliesdMUF = {postAnomaliesdMUF}
          />
      </div>
    );
}

export default PlotGraph