"use client"
// На вход функция принимает props стэйта anomalyDots и функции для 
// отправки массива аномальных точек в БД
const AnomalyTable = ({anomalyDots, setAnomalyDots, postAnomaliesdMUF}) => {
  // Функция точечного удаления строк из массива anomalyDots
  const removeDot = (e) => {
    // Определяем значение точки, которую выбрал пользователь
    // из массива
    const dotToRemove = e.target.textContent.split(' ')[0]
    // Методом filter оставляем все точки, кроме той
    // которая выбрана для удлаения
    const result = anomalyDots.filter((obj) => obj.time  !== dotToRemove)
    // Задаем новый списое anomalyDots
    setAnomalyDots(result)

  }
  // Создаем массив объектов уникальных точек, для удаления дублирования данных в таблице.
  // Для этого используем методы map, на первом создается set данных, при предварительном
  // преобразовании в формат JSON (Set позволяет оставить только уникальные комбианции
  // ключ: значение), следующий метод map формирует обратно массиф объектов, но уже без 
  // дублирования.
  let uniqueDots = [...new Set(anomalyDots.map(i => JSON.stringify(i)))].map(i => JSON.parse(i));
  return(
    // Базовый контейнер таблицы
    <div className="flex-col">
      <h3>Списко аномалий</h3>
      {/*Формирование структуры таблицы*/}
      <table className="min-h-[5%] w-[100%] border-separate font-extralight" 
              key='anomalyTable'>
        <tbody>
          {/*Заголовок*/}
          <tr>
            <th className="border-2 rounded-xl font-extralight" >time</th>
            <th className="border-2 rounded-xl font-extralight" >anomalyMUF</th>
          </tr>
          {/*Данные*/}
          {uniqueDots.map((v)=>
            <tr onClick={removeDot} key={v.time}>
              <th className="border-2 rounded-xl font-extralight" >{v.time}</th>
              <th className="border-2 rounded-xl font-extralight" >{v.anomalyMUF}</th>
            </tr>
            )}
        </tbody>
      </table>
      {/*Кнопка отправки данных и очистки таблицы*/}
      <input type="button" 
      value="Отправить" 
      onClick = {postAnomaliesdMUF}
      className="border-2 rounded-xl min-w-full cursor-pointer"
      />
    </div>

    )
}


export default AnomalyTable