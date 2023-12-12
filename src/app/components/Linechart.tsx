"use client"
import React, { useState } from 'react';
// Импортируем доступные методы 
// для работы с графиком
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
// Импорт методя для построения 
// линейных зависимостей
import { Line } from 'react-chartjs-2';
// Глобальная регистрация плагинов
// для работы с графиком
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export default function Linechart(props) {
    // Стэйт хранения массива аномальных точек МПЧ
    let [anomalyDots, setAnomalyDots] = useState([])
    // Функция формирования массива аномальных точек МПЧ 
    const callback = (e, activeEls) => {
        // activeEls возвращает данные по выбранноч точке графика.
        // datasetIndex содержит индекс датасета
        let datasetIndex = activeEls[0].datasetIndex;
        // dataIndex модержит индекс конкретной точки датасета
        let dataIndex = activeEls[0].index;
        // datasetLabel содержит название датасета
        // в текущей л.р. только один датасет МПЧ
        let datasetLabel = e.chart.data.datasets[datasetIndex].label;
        // value содержит конкретное значение МПЧ
        let value = e.chart.data.datasets[datasetIndex].data[dataIndex];
        // label содержит дату
        let label = e.chart.data.labels[dataIndex];
        // Выполняем полученый через props
        // стэйт, а именно добавляем к новые точки МПЧ
        // с сохранением предыдущих
        props.setAnomalyDots(
            [...props.anomalyDots, { time: label, anomalyMUF: value }]
        )
    }
    // Опции графика
    const options = {
        onClick: callback,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            customCanvasBackgroundColor: {
                color: 'lightGreen',
            },
            title: {
                display: true,
                text: 'Временной ход МПЧ',
            },
        },
    };
    // Переменная для хранения подписей для
    // оси абсцисс
    const labels = props.data.time
    // Объект содержащий данныя для 
    // создания линейного графика
    const data = {
        labels,
        datasets: [{
            label: 'МПЧ',
            // метод формирования одномерного массива
            // на основе объекта
            data: [].concat.apply([], props.data.muf),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }, ],
    };

    return (
        <Line options={options} data={data} />
    );
}