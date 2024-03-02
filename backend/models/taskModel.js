import mongoose from 'mongoose';

const taskSchema = mongoose.Schema(
    {
        task: {
            type: String,
            required: true,
            maxlength: 32
        },
        status : {
            type : String,
            default : 'active'
        },
        companyID: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Admin',
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Task = mongoose.model('Task',taskSchema);

export default Task;