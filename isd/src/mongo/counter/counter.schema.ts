import mongoose from 'mongoose';
import {CounterEntity} from './counter.entity';

export const CounterSchema = new mongoose.Schema<CounterEntity>({
  id: {type: Number, default: 1, index: true},
  interest: {type: Number},
  lead: {type: Number},
});
