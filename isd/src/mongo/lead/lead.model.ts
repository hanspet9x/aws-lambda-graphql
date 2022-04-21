import mongoose from 'mongoose';
import {LeadEntity} from './lead.entity';
import {LeadSchema} from './lead.schema';

export const LeadModel = mongoose.model<LeadEntity>('lead', LeadSchema);
