import mongoose from "mongoose";
import { CounterModel } from "../counter/counter.model";
import {CounterEntity} from './../counter/counter.entity';

export function incrementCounter(
    next: mongoose.CallbackWithoutResultAndOptionalError,
    counterColumn: keyof CounterEntity,
    pathColumn: number
    ){
    CounterModel.findByIdAndUpdate(
        {_id: 'entityId'},
        {$inc: {[counterColumn]: 1}},
        (error, doc) => {
            if(error) return next(error);
            if(doc)pathColumn = doc[counterColumn];
            next();
        }
    )
}