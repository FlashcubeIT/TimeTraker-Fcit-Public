import Project from '../models/projectModel.js'



const createProject = async (req, res) => {
    try {
        // console.log("req body", req.body)

        // distrack object came from front-end in register page 
        const { project, status, companyID, description, billable, lastIndex } = req.body;

        if (billable == "true") {
            var newBillable = true
        } else {
            var newBillable = false
        }
        // chacking admin exist or  not 
        const projectExist = await Project.findOne({ project, companyID })
        if (projectExist) {
            if (lastIndex != false) {
                res.status(200).json({
                    result: "project is alrady exist"
                })
            }
        }
        else {
            const newProject = await Project.create({
                project: project,
                status: status,
                companyID: companyID,
                billable: newBillable,
                description: description
            })

            if (newProject) {
                if (lastIndex != false) {
                    res.status(201).json({
                        _id: newProject._id,
                        project: newProject.project,
                        status: newProject.status,
                        companyID: newProject.companyID,
                        billable: newProject.billable,
                        description: newProject.description
                    })
                }
            }
        }

    } catch (error) {
        console.log("error from register api", error)
        if (lastIndex != false) {
            res.status(500).json({
                result: "project is alrady exist"
            })
        }
    }
}

const getAllProject = async (req, res) => {
    try {
        const companyID = req.query.companyID
        const projects = await Project.find({ companyID })

        if (projects) {
            res.status(200).json({
                projects: projects
            })
        }
    } catch (error) {
        console.log("error from project api", error)
        res.status(401).json({
            result: "faild to get projects"
        })
    }
}

const deletedProjectController = async (req, res) => {
    try {
        const projectID = req.query.projectID
        try {
            const deletedProject = await Project.findByIdAndRemove(projectID);

            if (deletedProject) {
                res.status(200).json({
                    deletedProject: deletedProject
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                deletedProject: error
            })
        }

    }
    catch (error) {
        console.log("error from delete timesheet api", error)
        res.status(400).json({
            message: "error from delete timesheet api",
            error: error
        })
    }
}


const editProject = async (req, res) => {
    const { _id, billable, description, project } = req.body
    
  
  
    try {
  
  
        const projectExist = await Project.findOne({ _id: _id })
  
        if (projectExist) {
        
                try {
                    const updatedProject = await Project.findOneAndUpdate({ _id: _id }, {
                        billable: billable,
                        description: description,
                        project: project,
                    }, { new: true })
                    if (updatedProject) {
                        res.status(200).json({
                            updatedProject: updatedProject
                        })
                    }
                } catch (error) {
                    console.log("error from update Project Api")
                    res.status(400).json({
                        message: "error from update Project api",
                        error: error
                    })
                }
        }
    }
    catch (error) {
        console.log("error while updating the Project", error)
        res.status(400).json({
            message: "error while updating the Project",
            error: error
        })
    }
  }
  
  



export { createProject, getAllProject, deletedProjectController, editProject }

