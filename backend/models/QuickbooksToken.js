import mongoose from 'mongoose';

const quickbooksTokenSchema = mongoose.Schema(
    {
        fullToken: {
            
        },
        companyID: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

const QuickbooksToken = mongoose.model('quickbooksToken',quickbooksTokenSchema);

export default QuickbooksToken;