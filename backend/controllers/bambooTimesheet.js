import axios from "axios";

const getTimesheetBHTOTT = async(req,res) => {
        const config = {
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json',
                // Authorization: "Basic 'sumation2':'Pp4321@#'"
    
            }
        };
    
        const apiKey = "bd8142fd78faf5ed6beb74bd19927b99ecf8ab27"
    
        let allTimesheet = []
        try {
            const data = await axios.get(`https://${apiKey}:x@api.bamboohr.com/api/gateway.php/sumation2/v1/timetracking/record`, config)
            allTimesheet = data.data
        } catch (error) {
            console.log("error from sendEmployeeTTTOBH", error)
        }
    
        // console.log(allEmploye)
        res.status(200).json({
            allTimesheet: allTimesheet
        })
    
}

export {getTimesheetBHTOTT}