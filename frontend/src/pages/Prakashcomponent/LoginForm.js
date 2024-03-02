import React, { useState, useContext, useEffect } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './LoginForm.css'
import { MyContext } from '../../context/MyProvider'
import timerTrakerlogo from "../../img/TimeTrakerLogo.png"
import signInWithIntuiteDefault from '../../img/Sign_in_transparent_btn_tall_default.svg'
import signInWithIntuiteHover from '../../img/Sign_in_blue_btn_tall_hover.svg'


const LoginForm = () => {


    const [hoverImg, setHoverImg] = useState(false)



    const { setLoading } = useContext(MyContext);

    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    }

    const [formData, setFromData] = useState({});

    const navigate = useNavigate()



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFromData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };




    const login = async (formData) => {
        try {
            setLoading(true)
            const { data } = await axios.post(`http://localhost:8000/api/user-login`, formData, config)
            if (data.admin) {
                setLoading(false)
                localStorage.setItem('adminLoginInfo', JSON.stringify(data.admin));
                const adminLoginInfo = JSON.parse(localStorage.getItem('adminLoginInfo'));
                if (adminLoginInfo?.accessibility?.myTimesheets === true) {
                    navigate('/admin-dashboard-v2')
                }
            } else {
                setLoading(false)
                localStorage.setItem('userLoginInfo', JSON.stringify(data.user));
                const userLoginInfo = JSON.parse(localStorage.getItem('userLoginInfo'));
                if (userLoginInfo) {
                    navigate('/my-time')
                }
            }
        }
        catch (error) {
            setLoading(false)
            console.log("error from user login", error)
            alert('invalid email and password')
        }
    }






    const handleSubmit = async (e) => {
        e.preventDefault();
        login(formData)

    }

    // sign in with intuite 

    const [dataFormQuick, setDataFormQuick] = useState("");



    function authorizeUri() {


        axios
            .get(
                "http://localhost:8000/authUri",
                function (uri) {
                }
            )
            .then(function (authUri) {
                // Launch Popup using the JS window Object
                var parameters = "location=1,width=800,height=650";
                // parameters += ",left=" + (screen.width - 800) / 2 + ",top=" + (screen.height - 650) / 2;
                var win = window.open(authUri.data, "connectPopup", parameters);
                // var pollOAuth = window.setInterval(function () {
                //     try {
                //         if (win.document.URL.indexOf("code") != -1) {
                //             window.clearInterval(pollOAuth);
                //             win.close();
                //             window.location.reload();
                //         }
                //     } catch (e) {
                //         console.log(e);
                //     }
                // }, 100);
            });
    }


    async function retrieveToken() {
        // Generate the authUri
        try {
            setLoading(true)
            const res = await axios.get("http://localhost:8000/retrieveToken", config);
            if (res?.data?.token?.access_token) {
                setDataFormQuick(res?.data);
                setLoading(false)
                return

            } else {
                setTimeout(retrieveToken, 2000)
            }


        } catch (error) {
            setLoading(true)
            console.log("error", error)
        }
    }



    const signInWithIntuite = (e) => {
        e.preventDefault();
        retrieveToken()
        authorizeUri();
    }

    const oauthClientNull = async () => {
        try {
            await axios.get(
                `http://localhost:8000/oauthClient-null`,
                config
            );
        } catch (error) {
            console.log("error from getAllBankAccount", error);
        }
    }

    useEffect(() => {

        const getUserInfoFormQB = async () => {
            try {
                const { data } = await axios.get('http://localhost:8000/getUserInfoFormQB', config)
                if (data.notVarifyed) {
                    alert('Your email address is not varifyed in QuickBooks')
                }
                if (data.loginData) {

                    saveTokenInBackend()

                    async function saveTokenInBackend() {
                        setLoading(true)
                        oauthClientNull()

                        try {
                            const saveQBData = await axios.post(
                                `http://localhost:8000/api/update-qb-token?companyID=${data.loginData._id}`,
                                dataFormQuick,
                                config
                            );
                            if (saveQBData) {
                                localStorage.setItem('adminLoginInfo', JSON.stringify(data.loginData));
                                const adminLoginInfo = JSON.parse(localStorage.getItem('adminLoginInfo'));
                                setLoading(false)
                                if (adminLoginInfo?.accessibility?.dashboard === true) {
                                    navigate('/admin-dashboard-v2')
                                }
                            }
                        } catch (error) {
                            setLoading(false)
                            console.log("error from saveTokenInBackend", error);
                        }
                    }





                }
            } catch (error) {
                console.log(error)
                alert('not able to login please try again')
            }
        }



        const checkRealmId = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/sign-in-with-intuite/?realmId=${dataFormQuick.token.realmId}`, config)
                if (data.superAdmin) {
                    localStorage.setItem('adminLoginInfo', JSON.stringify(data.superAdmin));
                    const adminLoginInfo = JSON.parse(localStorage.getItem('adminLoginInfo'));
                    if (adminLoginInfo?.accessibility?.myTimesheets === true) {
                        navigate('/admin-dashboard-v2')
                    }
                }
                if (data.message == 'notAuthorized') {
                    getUserInfoFormQB()
                }
            } catch (error) {
                console.log(error)
            }
        }
        checkRealmId()
    }, [dataFormQuick])

    useEffect(() => {
        const adminloginInfo = JSON.parse(localStorage.getItem("adminLoginInfo"));
        const userLoginInfo = JSON.parse(localStorage.getItem("userLoginInfo"));
        if (adminloginInfo) {
            navigate('/admin-dashboard-v2')
        }

        if (userLoginInfo) {
            navigate('/my-time')
        }
    }, [])

    return (
        <div className='login_form_main_parent' >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                {/* <h3 className='logo_right_log'>Logo</h3> */}
                <img style={{ width: '70px' }} src={timerTrakerlogo} alt='' />

                <p className='right_heading_log '>Simplify your time and expense management today.</p>
                {/* <p className='right_heading_log2'>No credit card required. Cancel anytime.</p> */}
            </div>
            <div className='form_parent_log'>
                <Form onSubmit={handleSubmit} className='mt-4' >
                    <Row>
                        <Form.Group className="mb-1 form-group-email" controlId="formGroupEmail">
                            <Form.Label>Email<i className="fa-sharp fa-light fa-asterisk"></i></Form.Label>
                            <Form.Control onChange={handleChange} name="email" type="email" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group className='form-group-email' as={Col} controlId="formGroupEmail">
                            <Form.Label>Password<i className="fa-sharp fa-light fa-asterisk"></i></Form.Label>
                            <Form.Control onChange={handleChange} name="password" type="password" />
                        </Form.Group>
                    </Row>

                    <div className="d-grid gap-5 headBtn1">
                        <Button type='submit'>Login</Button>
                        <Button style={{ border: '1px solis #64E48E' }} onClick={() => { navigate('/forgot-password') }} className='btnhover'>Forgot Password?</Button>
                        {/* <Button style={{ border: '1px solis #64E48E' }} onClick={signInWithIntuite} className=' btnhover btnhover-intuite'>Sign in With Intuite</Button> */}
                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            <img onMouseEnter={() => (setHoverImg(true))} style={{ height: "32px", cursor: "pointer" }} onMouseLeave={() => (setHoverImg(false))} onClick={signInWithIntuite} src={hoverImg ? signInWithIntuiteHover : signInWithIntuiteDefault} />
                        </div>
                    </div>
                    <div className='head-bottom-text1'>
                        <p className='text  mt-1' style={{ fontSize: '15px', marginBottom: "0px" }} >Already have an account ?  <span style={{ cursor: 'pointer', fontFamily: 'Inter', fontSize: '15px' }} onClick={() => { navigate('/signup') }}>Sign up here</span> </p>

                    </div>

                </Form>
            </div>
            <div>
                <p className='need_ass' style={{ fontSize: "16px", fontFamily: 'Inter', marginTop: "0px" }}> <span style={{ color: "#2385DF", cursor: 'pointer', fontFamily: 'Inter' }}> Need Assistance ?</span></p>
            </div>

        </div>
    )
}

export default LoginForm
