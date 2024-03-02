import mongoose from 'mongoose';

const expenseSchema = mongoose.Schema(
    {
        date: {
            type: String,
            required: true,
            maxlength: 32
        },
        expense : {
            type : String,
            required: true,
        },
        state : {
            type: String,
            required: true,
            default: 'hold'
        },
        companyID: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Admin',
            required: true
        },
        amount:{
            type: Number,
            required: true,
        },
        description:{
            type: String,
        },
        userID: {
            type: String,
            required: true,
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        userName:{
            type: String,
            required: true,
        },
        merchant:{
            type: String,
        },
        project:{
            type: String,
        },
        expenseReport:{
            type: String,
        },
        paidBy:{
            type: String,
        },
        billable:{
            type: Boolean,
            default: true
        },
        sendToQb : {
            type: Boolean,
            default: false
        },
        fromQb: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

const Expense = mongoose.model('Expense',expenseSchema);

export default Expense;