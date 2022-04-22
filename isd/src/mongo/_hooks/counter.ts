import mongoose from 'mongoose';
import {CounterModel} from '../counter/counter.model';
import {CounterEntity} from './../counter/counter.entity';

export function incrementCounter(
    next: mongoose.CallbackWithoutResultAndOptionalError,
    counterColumn: keyof CounterEntity,
    model: any,
) {
  console.log('Triggered hooks', counterColumn);
  if (model.isNew) {
    CounterModel.findOneAndUpdate(
        {id: 1},
        {$inc: {[counterColumn]: 1}},
        {upsert: true, new: true},
        (error: mongoose.CallbackError, doc: CounterEntity) => {
          console.log('couunter entity', doc);
          if (error) return next(error);
          if (doc)model.id = doc[counterColumn];
          next();
        },
    );
  }
}
