import mongoose from 'mongoose';
import {InterestEntity} from './interest.entity';
import {InterestSchema} from './interest.schema';

export const InterestModel = mongoose.model<InterestEntity>('interest', InterestSchema);
