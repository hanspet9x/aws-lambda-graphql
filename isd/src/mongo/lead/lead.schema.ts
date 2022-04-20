import mongoose from "mongoose";
import { mongoTimeStamps } from "../common";
import { InterestSchema } from "../interests/interest.schema";
import { incrementCounter } from "../_hooks/counter";
import { LeadEntity } from "./lead.entity";

export const LeadSchema = new mongoose.Schema<LeadEntity>({
    id: Number,
    email: {type: String, unique: true, alias: "emaily"},
    first_name: String,
    last_name: String,
    phone: {type: String, unique: true},
    interests: [InterestSchema]
}, {...mongoTimeStamps});

LeadSchema.pre("save", function(next){
    incrementCounter(next, "lead", this)
});
