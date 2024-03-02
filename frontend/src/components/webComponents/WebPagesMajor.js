import React, {useEffect} from 'react'
import Navbar from '../Navbar'
import { Grid } from '@mui/material'
import './WebPagesMajor.css'
import { useNavigate } from 'react-router-dom'
import Footer from '../Footer'
import Footer2 from '../Footer2'
import hero_b from "./images/hero_b.svg"
import hero_b_rev from  "./images/hero_b_rev.svg"



const WebPagesMajor = ({ data }) => {

    const navigate = useNavigate()
    const web = true
    useEffect(() => {
        // Scroll to the top of the page on component mount (page reload)
        window.scrollTo(0, 0);
      }, []); 
    return (
        <div>
            {/* section 1 */}
            <Navbar data={web} />




            {/* section 2  */}
            {data && !data.rev ?
                <Grid className='hero_section' container>
                    <Grid className='web_hero_left_item' item sx={12} md={6} lg={6}>
                        <div className='web_hero_left_div'>
                            <h3 className='web_hero_left_heading'>{data && data.hero_head}</h3>
                            <div className='web_hero_left_p_parent'>
                                <p className='web_hero_left_p'>
                                    {data && data.hero_text}
                                </p>
                            </div>
                            <div className=" time-text web_hero_btn_1">
                                <button onClick={() => { navigate('/signup') }}>Start a free trial</button>
                            </div>
                        </div>
                    </Grid>
                    <Grid className='web_hero_right' item sx={12} md={6} lg={6}>
                        <img className='web_hero_right_img1' src={data && data.hero_img} alt='' />
                        <img className='web_hero_right_img2' src={hero_b} alt='' />
                    </Grid>
                    <div className="web_hero_btn_2 time-text">
                        <button onClick={() => { navigate('/signup') }}>Start a free trial</button>
                    </div>
                </Grid>


                :
                <Grid style={{flexDirection : "row-reverse"}} className='hero_section' container>
                    <Grid className='web_hero_left_item_rev' item sx={12} md={6} lg={6}>
                        <div className='web_hero_left_div'>
                            <h3 className='web_hero_left_heading_rev'>{data && data.hero_head}</h3>
                            <div className='web_hero_left_p_parent_rev'>
                                <p className='web_hero_left_p_rev'>
                                    {data && data.hero_text}
                                </p>
                            </div>
                            <div className=" time-text web_hero_btn_1 btn_rev">
                                <button onClick={() => { navigate('/signup') }}>Start a free trial</button>
                            </div>
                        </div>
                    </Grid>
                    <Grid className='web_hero_right' item sx={12} md={6} lg={6}>
                        <img className='web_hero_right_img1' src={data && data.hero_img} alt='' />
                        <img className='web_hero_right_img2_rev' src={hero_b_rev} alt='' />
                    </Grid>
                    <div className="web_hero_btn_2 time-text">
                        <button onClick={() => { navigate('/signup') }}>Start a free trial</button>
                    </div>
                </Grid>
            }


            {/* section 3  */}

            <div className='section3'>
                <p className='section3_heading'>{data && data.section3_heading}</p>
                <div className='section3_des_parent'>
                    <p className='section3_des'>{data && data.section3_des}</p>
                </div>
            </div>


            {/* section 4  */}

            {data && !data.rev ?


                <div>

                    <div className='time-container section_4'>
                        <div className="time-text">
                            <div className='icon-img'>
                                <h6>{data && data.section_4_head_1}</h6>
                                {/* <img src={IconImg} alt="" /> */}
                            </div>
                            <h5>{data && data.section_4_head_2}</h5>
                            <p className='section_4_para'>{data && data.section_4_para}</p>

                            {
                                data && data.section_4_para_data && data.section_4_para_data.map((item, index) => {
                                    return (
                                        <ul key={index} className="time-text">
                                            {/* <i class="fa-solid fa-circle section_4_icon"></i> */}
                                            <li className='section_4_para_data'> <span className='li_head'>{item.head}</span> {item.body}</li>
                                        </ul>
                                    )
                                })
                            }

                            {/* <button onClick={()=>{navigate('/signup')}}>Start a free trial</button> */}
                        </div>

                        <div className="time-img img_for_web_pages_parent">
                            <div className="time-img1 img_for_web_pages_parent">
                                <img className='img_for_web_pages' src={data && data.section_4_img} alt="" />
                            </div>


                        </div>
                    </div>





                    {/* section 5  */}
                    <div className='job-container section_4 section_5_mb'>
                        <div className="job-text">
                            <h5>{data && data.section_5_head_2}</h5>
                            <p className='section_5_para'>{data && data.section_5_para_1}</p>
                            <p className='section_5_para'>{data && data.section_5_para_2}</p>
                            <button className='section_5_btn_1' onClick={() => { navigate('/signup') }}>30-Day Free Trial</button>
                        </div>



                        <div className="time-img img_for_web_pages_parent">
                            <div className="time-img1 img_for_web_pages_parent">
                                <img className='img_for_web_pages' src={data && data.section_5_img} alt="" />
                                {/* <div className="timeImg_new timeImg2">
                        <img src={arrow1} alt="" />
                    </div> */}
                            </div>
                        </div>
                        <div className="job-text">
                            <button className='section_5_btn_2' onClick={() => { navigate('/signup') }}>30-Day Free Trial</button>
                        </div>
                    </div>

                </div> : <div>

                    <div className='job-container section_4'>
                        <div className="job-text">
                            <div className='icon-img'>
                                <h6>{data && data.section_4_head_1}</h6>
                                {/* <img src={IconImg} alt="" /> */}
                            </div>
                            <h5>{data && data.section_4_head_2}</h5>
                            <div className='for_rev_text'>
                                <p className='section_4_para'>{data && data.section_4_para}</p>

                                {
                                    data && data.section_4_para_data && data.section_4_para_data.map((item, index) => {
                                        return (
                                            <ul key={index} className="time-text">
                                                <li className='section_4_para_data'> <span className='li_head'>{item.head}</span> {item.body}</li>
                                            </ul>
                                        )
                                    })
                                }
                            </div>
                            {/* <button onClick={()=>{navigate('/signup')}}>Start a free trial</button> */}
                        </div>

                        <div className="time-img">
                            <div className="time-img1">
                                <img className='img_for_web_pages' src={data && data.section_4_img} alt="" />
                            </div>


                        </div>
                    </div>





                    {/* section 5  */}
                    <div className=' time-container section_4 section_5_mb'>
                        <div className=" time-text">
                            <h5>{data && data.section_5_head_2}</h5>
                            <p className='section_5_para'>{data && data.section_5_para_1}</p>
                            <p className='section_5_para'>{data && data.section_5_para_2}</p>
                            <button className='section_5_btn_1' onClick={() => { navigate('/signup') }}>30-Day Free Trial</button>
                        </div>



                        <div className="time-img">
                            <div className="time-img1">
                                <img className='img_for_web_pages' src={data && data.section_5_img} alt="" />
                                {/* <div className="timeImg_new timeImg2">
                        <img src={arrow1} alt="" />
                    </div> */}
                            </div>
                        </div>
                        <div className="job-text">
                            <button className='section_5_btn_2' onClick={() => { navigate('/signup') }}>30-Day Free Trial</button>
                        </div>
                    </div>



                </div>
            }


            {/* section 5  */}

            <Footer />
            <Footer2 />


        </div>
    )
}

export default WebPagesMajor
