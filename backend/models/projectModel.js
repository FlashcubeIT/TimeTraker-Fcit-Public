import mongoose from 'mongoose';

const projectSchema = mongoose.Schema(
    {
        project: {
            type: String,
            required: true,
            maxlength: 32
        },
        status : {
            type : String,
            required: true,
            default : 'active'
        },
        companyID: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Admin',
            required: true
        },
        billable: {
            type: Boolean,
            required: true
        },
        description: {
            type : String
        }
    },
    {
        timestamps: true
    }
);

const Project = mongoose.model('Project',projectSchema);

export default Project;