import mongoose from "mongoose";
import { CounterEntity } from "./counter.entity";
import { CounterSchema } from "./counter.schema";

export const CounterModel = mongoose.model<CounterEntity>('counter', CounterSchema)