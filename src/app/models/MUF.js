import mongoose, {Schema} from "mongoose";

mongoose.connect(process.env.MONGODB_LOCAL);
mongoose.Promise = global.Promise;


const anomaliesSchema = new Schema(
{
  time: { type : Date},
  anomalyMUF: { type : Number },
}
);

const MUF = mongoose.models.anomalies || 
  mongoose.model("anomalies", anomaliesSchema);

export default MUF;