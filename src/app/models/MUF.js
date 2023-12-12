import mongoose, {Schema} from "mongoose";

mongoose.connect(process.env.MONGODB_LOCAL);
mongoose.Promise = global.Promise;
// Подключение к БД

const anomaliesSchema = new Schema(
  {
    time: { type : Date},
    anomalyMUF: { type : Number },
  }
);
// Инициализация схемы с колонкой времени и 
// аномального МПЧ, с соответствующими типами
// данных
const MUF = mongoose.models.anomalies || 
  mongoose.model("anomalies", anomaliesSchema);
// Вернем модель при условии если она уже 
// существует в БД, в противном случае создадим
// и вернем 
export default MUF;