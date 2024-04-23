import mongoose, {Schema} from "mongoose";

const StudentSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    hostel:{
        type: Number,
        required: true
    },
    room:{
        type: Number,
        required: true
    },
    admin:{
        type: Schema.Types.ObjectId,
        ref : "Admin"
    }
},
{
    timestamps:true
})
export const Student = mongoose.model("Student", StudentSchema);
