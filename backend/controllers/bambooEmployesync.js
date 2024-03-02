import axios from "axios";



const sendEmployeeTTTOBH = async () => {
    // const sdk = require('api')('@bamboohr/v1#bcwv33lmzax2b4');
    const config = {
        headers: {
            'content-type': 'application/json',
            // Authorization: "Basic 'sumation2':'Pp4321@#'"

        }
    };

    const apiKey = "bd8142fd78faf5ed6beb74bd19927b99ecf8ab27"

    const employeData = {
        "firstName": "Rohit",
        "lastName": "Das"
    }

    try {
        const data = await axios.post(`https://${apiKey}:x@api.bamboohr.com/api/gateway.php/sumation2/v1/employees/`, employeData, config)
        console.log("data", data)
    } catch (error) {
        console.log("error from sendEmployeeTTTOBH", error)
    }



}




const getEmployeeBHTOTT = async (req, res) => {
    // const sdk = require('api')('@bamboohr/v1#bcwv33lmzax2b4');
    const config = {
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json',
            // Authorization: "Basic 'sumation2':'Pp4321@#'"

        }
    };

    const apiKey = "bd8142fd78faf5ed6beb74bd19927b99ecf8ab27"

    let allEmploye = []
    try {
        const data = await axios.get(`https://${apiKey}:x@api.bamboohr.com/api/gateway.php/sumation2/v1/employees/directory`, config)
        allEmploye = data.data
    } catch (error) {
        console.log("error from sendEmployeeTTTOBH", error)
    }

    // console.log(allEmploye)
    res.status(200).json({
        allEmploye: allEmploye
    })


    const createEmployee = async (name, phone, email, role, companyID, password) => {
        try {
            const { data } = await axios.post('http://localhost:8000/api/user-register', { name: name, phone: phone, email: email, role: role,companyID:companyID,password:password }, config)
            console.log("data from tt", data)
        } catch (error) {
            console.log("add user api", error)
        }
    }

    if (allEmploye.employees.length > 0) {
        allEmploye.employees.forEach((element, index) => {
            if(element.displayName && element.mobilePhone && element.workEmail){
            const name = element.displayName
            const phone = element.mobilePhone
            const email = element.workEmail
            const role = "user"
            const companyID= "653ca166a62fa9bab6e5243a"
            const password = "123456"
            createEmployee(name, phone, email, role, companyID, password)
            }else{
                console.log("na")
            }
        });
    }



}
export { sendEmployeeTTTOBH, getEmployeeBHTOTT }