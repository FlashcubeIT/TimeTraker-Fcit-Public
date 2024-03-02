import Task from "../models/taskModel.js";



 const createTask = async(req , res)=>{
   try {
    // console.log("req body", req.body)

    // distrack object came from front-end in register page 
    const { task, status, companyID } = req.body;

    // chacking admin exist or  not 
    const taskExist = await Task.findOne({task, companyID})
    if(taskExist){
        res.status(400).json({
            result : "task is alrady exist"
        })
    }
    const newTask = await Task.create({
       task : task,
       status : status,
       companyID: companyID
    })

    if (newTask){
        res.status(201).json({
            _id : newTask._id,
            task : newTask.task,
            status : newTask.status,
            companyID : newTask.companyID
        })
    }


   } catch (error) {
    console.log("error from register api", error)
   }
}

const getAllTask = async(req, res ) =>{
    try {
        const  companyID  = req.query.companyID
        const tasks = await Task.find({companyID })

        if(tasks){
            res.status(200).json({
                tasks:tasks
            })
        }else{
              res.status(401).json({
                result: "faild to get task"
              })  
        }
    } catch (error) {
        console.log("error from task api", error)
    }
}

const deleteTask = async(req, res ) =>{

    const  taskID  = req.query.taskID
    try{
    const deletedTask = await Task.findByIdAndRemove(taskID);

    if(deletedTask){
        res.status(200).json({
            deletedTask:deletedTask
        })
    }
}
catch(error){
    console.log(error)
    res.status(400).json({
        deletedTask:error
    })

}
}

const editTask = async (req, res) => {
    const { _id, hours, description, project, task, date } = req.body
    
  
  
    try {
  
  
        const taskExist = await Task.findOne({ _id: _id })
  
        if (taskExist) {
            if (taskExist.state == "hold") {
                try {
                    const updatedTask = await Task.findOneAndUpdate({ _id: _id }, {
                        // hours: hours,
                        // description: description,
                        // project: project,
                        // task: task,
                        // date: date
                    }, { new: true })
                    if (updatedTask) {
                        res.status(200).json({
                            updatedTask: updatedTask
                        })
                    }
                } catch (error) {
                    console.log("error from update Task Api")
                    res.status(400).json({
                        message: "error from update Task api",
                        error: error
                    })
                }
  
            } else {
                res.status(200).json({
                    message: "can't update this Task"
                })
            }
        }
    }
    catch (error) {
        console.log("error while updating the Task", error)
        res.status(400).json({
            message: "error while updating the Task",
            error: error
        })
    }
  }
  
  


export {createTask , getAllTask, deleteTask, editTask}

