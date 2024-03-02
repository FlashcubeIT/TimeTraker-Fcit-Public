import mongoose from 'mongoose';

const timesheetSchema = mongoose.Schema(
    {
        userID: {
            type: String,
            required: true,
        },
        companyID: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },

        task: {
            type: String,
            require: true
        },
        project: {
            type: String,
            require: true
        },
        hours: {
            type: Number,
            require: true
        },
        state: {
            type: String,
            require: true,
            default: 'hold'
        },
        description: {
            type: String,
        },
        name: {
            type: String,
        },
        userName:{
            type: String,
            require: true 
        },
        sendToQb : {
            type: Boolean,
            default: false
        },
        fromQb: {
            type: String,
        },
        billable: {
            type: Boolean ,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Timesheet = mongoose.model('Timesheet', timesheetSchema);

export default Timesheet;