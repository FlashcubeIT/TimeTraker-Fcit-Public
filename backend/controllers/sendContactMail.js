import nodemailer from 'nodemailer'
const sendContactMail = async (req, res) => {
 
    const{firstName, lastName, email, number, site} = req.body

        //3. cofigure mail and send it
        async function sendMail() {
            //1. create an email transporter.


            //SMTP (Simple Mail Transfer Protocol)
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'opto3789@gmail.com',
                    pass: 'vevk mwjh zhqu obby'
                }
            })
            // mitr mpks dxfu gnnz

            //2.configure email content.
            const mailOptions = {
                from: 'opto3789@gmail.com',
                to: 'flashcubeit12@gmail.com',
                subject: 'contact ',
                html: `
<p style="font-size: 25px; font-weight: 600; color: black; ">first name =${firstName}</p> <br/>
<p style="font-size: 25px; font-weight: 600; color: black; ">last name =${lastName}</p> <br/>
<p style="font-size: 25px; font-weight: 600; color: black; ">email =${email}</p> <br/>
<p style="font-size: 25px; font-weight: 600; color: black; ">number =${number}</p> <br/>
<p style="font-size: 25px; font-weight: 600; color: black; ">site =${site}</p> <br/>


`
            }

            try {
                 await transporter.sendMail(mailOptions);
              

            } catch (error) {
                console.log('Email send failed with error:', error)
            }
        }
        sendMail()
        res.status(200).json({
            result: "email Send"
        })
    
}


export {sendContactMail}