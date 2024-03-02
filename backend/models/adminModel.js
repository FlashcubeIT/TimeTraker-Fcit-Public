import mongoose from 'mongoose'

const adminSchema = mongoose.Schema({
    name:{
        type: String,
        require : true,
        trim: true,
        maxLength: 12
    },
    companyName: {
        type : String,
      
    },
    email:{
        type: String,
        require: true,
        unique: 32
    },
    password : {
        type : String,
        require : true
    },
    phone : {
        type : Number,
        require : true
    },
    role : {
        type : String,
        default : 'admin',
        require : true
    },
    salt : String,
    history : {
        typr : Array,
        default : []
    },
    accessibility:{
        project:{
            type: Boolean,
            default: true
        },
        employe:{
            type: Boolean,
            default: true
        },
        task:{
            type: Boolean,
            default: true
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
            default: true
        },
        timesheets :{
            type: Boolean,
            default: true
        },
        dashboard:{
            type: Boolean,
            default: true
        },
        sync:{
            type: Boolean,
            default: true
        },
        download:{
            type: Boolean,
            default: true
        },
        setupCustomization:{
            type: Boolean,
            default: true
        },
        reports:{
            type: Boolean,
            default: true
        },
        role:{
            type: Boolean,
            default: true 
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

const Admin = mongoose.model("Admin",adminSchema)

export default Admin