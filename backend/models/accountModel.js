import mongoose from 'mongoose';

const accountSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type : {
            type : String,
        },
        qbID: {
            type: String,
            required: true,
        },
        companyID: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Admin',
            required: true
        },
        profile: {
            type: String,
            required: true,
            default : 'inactive'
        }
    },
    {
        timestamps: true
    }
);

const Account = mongoose.model('account',accountSchema);

export default Account;