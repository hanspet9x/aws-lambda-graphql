import mongoose from 'mongoose';
import {CounterEntity} from './counter.entity';

export const CounterSchema = new mongoose.Schema<CounterEntity>({
  interest: {type: Number, defaultValue: 1},
  lead: {type: Number, defaultValue: 1},
});
