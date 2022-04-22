import mongoose from 'mongoose';
import {mongoTimeStamps} from '../common';
import {incrementCounter} from '../_hooks/counter';
import {InterestEntity} from './interest.entity';

export const InterestSchema = new mongoose.Schema<InterestEntity>({
  id: {type: Number},
  lead_id: Number,
  message: String,
}, {...mongoTimeStamps});

InterestSchema.pre('save', function(next) {
  incrementCounter(next, 'interest', this);
});
