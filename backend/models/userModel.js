import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name:{
        type: String,
        require : true,
        trim: true,
    },
    email:{
        type: String,
        unique: 32,
        require : true,
    },
    password : {
        type : String,
        require : true
    },
    companyID: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    phone : {
        type : String,
        require : true,
    },
    role : {
        type : String,
        default : 'user'
    },
    salt : String,
    history : {
        typr : Array,
        default : []
    },
    accessibility:{
        project:{
            type: Boolean,
            default: false
        },
        employe:{
            type: Boolean,
            default: false
        },
        task:{
            type: Boolean,
            default: false
        },
        myTimesheets:{
            type: Boolean,
            default: true
        },
        myExpenses:{
            type: Boolean,
            default: true
        },
        expenses:{
            type: Boolean,
            default: false
        },
        timesheets :{
            type: Boolean,
            default: false
        },
        dashboard:{
            type: Boolean,
            default: false
        },
        sync:{
            type: Boolean,
            default: false
        },
        download:{
            type: Boolean,
            default: false
        },
        setupCustomization:{
            type: Boolean,
            default: false
        },
        reports:{
            type: Boolean,
            default: false
        },
        role:{
            type: Boolean,
            default: false
        },
        profile:{
            type: Boolean,
            default: true 
        }
    }
},{
    timestamps : true
}
)

// userSchema.methods.matchPassword = async function(enteredPassword){
//     return password
// }

const User = mongoose.model("User",userSchema)

export default User