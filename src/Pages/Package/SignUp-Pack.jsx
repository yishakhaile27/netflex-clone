import React, { useEffect, useState } from 'react';
import { PiCheckCircleFill } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import style from './SignUp-Pack.module.css';
import SignUpNav from '../../components/Register-Navbar/SignUp-Nav';
import SignUpFooter from '../../components/Register-Footer/SignUp-Footer';
import Swal from 'sweetalert2';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../../Services/firebase';

const Package = () => {
    const [selectedPlan, setSelectedPlan] = useState('Premium');
    const [choosePackage, setChoosePackage] = useState('Premium');
    const [errors, setErrors] = useState(null);
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const selectionDate = new Intl.DateTimeFormat('en-US', options).format(now);
    const navigate = useNavigate();


    const getBoxShadow = (plan) => {
        return selectedPlan === plan ? '0px 5px 20px rgba(0, 0, 0, 0.5)' : '';
    };

    const show = (plan) => {
        return selectedPlan === plan ? 'block' : 'none';
    };

    const color = (plan) => {
        return selectedPlan === plan ? '#e50914' : '#4c4c4c';
    };

    const Premium_Header = (plan) => {
        return {
            background: selectedPlan === plan ? 'radial-gradient(140.76% 131.96% at 100% 100%, rgb(229, 9, 20) 0%, rgba(74, 42, 150, 0.5) 73.57%, rgba(74, 42, 150, 0) 100%), rgb(29, 82, 157)' : 'white',
            border: selectedPlan === plan ? 'none' : '1px solid #767676',
        };
    };

    const Standard_Header = (plan) => {
        return {
            background: selectedPlan === plan ? 'radial-gradient(140.76% 131.96% at 100% 100%, rgb(176, 56, 220) 0%, rgba(74, 42, 150, 0.5) 73.57%, rgba(74, 42, 150, 0) 100%), rgb(29, 82, 157)' : 'white',
            border: selectedPlan === plan ? 'none' : '1px solid #767676',
        };
    };

    const Basic_Header = (plan) => {
        return {
            background: selectedPlan === plan ? 'radial-gradient(140.76% 131.96% at 100% 100%, rgb(109, 59, 227) 0%, rgba(74, 42, 150, 0.5) 73.57%, rgba(74, 42, 150, 0) 100%), rgb(29, 82, 157)' : 'white',
            border: selectedPlan === plan ? 'none' : '1px solid #767676',
        };
    };

    const Mobile_Header = (plan) => {
        return {
            background: selectedPlan === plan ? 'radial-gradient(140.76% 131.96% at 100% 100%, rgb(33, 114, 227) 0%, rgba(74, 42, 150, 0.5) 73.57%, rgba(74, 42, 150, 0) 100%), rgb(29, 82, 157)' : 'white',
            border: selectedPlan === plan ? 'none' : '1px solid #767676',
        };
    };

    const Headertext = (plan) => {
        return selectedPlan === plan ? 'white' : 'black';
    };

    const [details, setDetails] = useState({
        price: 'US$9.99',
        quality: 'Best',
        resolution: '4K (Ultra HD) + HDR',
        devices: 'TV, computer, mobile phone, tablet',
        simultaneousWatch: '4',
        downloadDevices: '6',
    });

    const handlePlanClick = (plan) => {
        setSelectedPlan(plan);
        setChoosePackage(plan); // Set the selected package here
        updateDetails(plan); // Update details based on plan click
        setErrors(null);
    };

    const updateDetails = (plan) => {
        if (plan === 'Premium') {
            setDetails({
                price: 'US$9.99',
                quality: 'Best',
                resolution: '4K (Ultra HD) + HDR',
                devices: 'TV, computer, mobile phone, tablet',
                simultaneousWatch: '4',
                downloadDevices: '6',
            });
        } else if (plan === 'Standard') {
            setDetails({
                price: 'US$7.99',
                quality: 'Great',
                resolution: '1080p (Full HD)',
                devices: 'TV, computer, mobile phone, tablet',
                simultaneousWatch: '2',
                downloadDevices: '2',
            });
        } else if (plan === 'Basic') {
            setDetails({
                price: 'US$3.99',
                quality: 'Good',
                resolution: '720p (HD)',
                devices: 'TV, computer, mobile phone, tablet',
                simultaneousWatch: '1',
                downloadDevices: '1',
            });
        } else if (plan === 'Mobile') {
            setDetails({
                price: 'US$2.99',
                quality: 'Fair',
                resolution: '480p',
                devices: 'mobile phone, tablet',
                simultaneousWatch: '1',
                downloadDevices: '1',
            });
        }
    };

    const handleChoosePackage = async () => {
        const user = auth.currentUser;
        if (user && choosePackage) {
            try {
                const userDoc = doc(db, `users`, user.uid);
                await setDoc(userDoc, { packageInfo: { name: choosePackage, selectedDate: selectionDate} }, { merge: true });
                navigate('/choose-avater');
            } catch (error) {
                console.error('Error choosing package:', error);
                setErrors('Failed to choose package');
            }
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            Swal.fire({
                title: "Reminder",
                text: "Since this website is a Netflix clone, it doesn't handle any kind of payment.",
                icon: "warning",
                confirmButtonColor: "#e60914ff",
            });
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <SignUpNav />
            <div className={style.plane_container}>
                <span>STEP 2 OF 3</span>
                <h1>Choose the plan that’s right for you</h1>
                <div className={style.type}>
                    <div className={style.plan_list}>
                        <div className={`${style.plan_best} ${style.selected}`} style={{ boxShadow: getBoxShadow('Premium') }} onClick={() => handlePlanClick('Premium')}>
                            <div className={style.Premium_pop}  style={{ background: color('Premium') }}>
                                <p>Most Popular</p>
                            </div>
                            <div className={style.Premium_Header}>
                                <h2>Premium</h2>
                                <h3>4K + HDR</h3>
                                <div style={{ display: show('Premium') }}>
                                    <PiCheckCircleFill />
                                </div>
                            </div>
                            <div className={style.detail}>
                                    <span>Monthly price</span>
                                    <p className={style.price}>US$9.99</p>
                                <div className={style.br}></div>
                                    <span>Video and sound quality</span>
                                    <p>Best</p>
                                <div className={style.br}></div>
                                    <span>Resolution</span>
                                    <p>4K (Ultra HD) + HDR</p>
                                <div className={style.br}></div>
                                    <span>Spatial audio (immersive sound)</span>
                                    <p>Included</p>
                                <div className={style.br}></div>
                                    <span>Supported devices</span>
                                    <p>TV, computer, mobile phone, tablet</p>
                                <div className={style.br}></div>
                                    <span>Devices your household can watch at the same time</span>
                                    <p>4</p>
                                <div className={style.br}></div>
                                    <span>Download devices</span>
                                    <p>6</p>
                            </div>
                        </div>

                        <div className={style.plan} style={{ boxShadow: getBoxShadow('Standard') }} onClick={() => handlePlanClick('Standard')}>
                            <div className={style.Standard_Header} >
                                <h2>Standard</h2>
                                <h3>1080p</h3>
                                <div style={{ display: show('Standard') }}>
                                    <PiCheckCircleFill />
                                </div>
                            </div>
                            <div className={style.detail}>
                                    <span>Monthly price</span>
                                    <p className={style.price}>US$7.99</p>
                                <div className={style.br}></div>
                                    <span>Video and sound quality</span>
                                    <p>Great</p>
                                <div className={style.br}></div>
                                    <span>Resolution</span>
                                    <p>1080p (Full HD)</p>
                                <div className={style.br}></div>
                                    <span>Supported devices</span>
                                    <p>TV, computer, mobile phone, tablet</p>
                                <div className={style.br}></div>
                                    <span>Devices your household can watch at the same time</span>
                                    <p>2</p>
                                <div className={style.br}></div>
                                    <span>Download devices</span>
                                    <p>2</p>
                            </div>
                        </div>

                        <div className={style.plan} style={{ boxShadow: getBoxShadow('Basic') }} onClick={() => handlePlanClick('Basic')}>
                            <div className={style.Basic_Header}>
                                <h2>Basic</h2>
                                <h3>720p</h3>
                                <div style={{ display: show('Basic') }}>
                                    <PiCheckCircleFill />
                                </div>
                            </div>
                            <div className={style.detail}>
                                    <span>Monthly price</span>
                                    <p className={style.price}>US$3.99</p>
                                <div className={style.br}></div>
                                    <span>Video and sound quality</span>
                                    <p>Good</p>
                                <div className={style.br}></div>
                                    <span>Resolution</span>
                                    <p>720p (HD)</p>
                                <div className={style.br}></div>
                                    <span>Supported devices</span>
                                    <p>TV, computer, mobile phone, tablet</p>
                                <div className={style.br}></div>
                                    <span>Devices your household can watch at the same time</span>
                                    <p>1</p>
                                <div className={style.br}></div>
                                    <span>Download devices</span>
                                    <p>1</p>
                            </div>
                        </div>

                        <div className={style.plan} style={{ boxShadow: getBoxShadow('Mobile') }} onClick={() => handlePlanClick('Mobile')}>
                            <div className={style.Mobile_Header}>
                                <h2>Mobile</h2>
                                <h3>480p</h3>
                                <div style={{ display: show('Mobile') }}>
                                    <PiCheckCircleFill />
                                </div>
                            </div>
                            <div className={style.detail}>
                                    <span>Monthly price</span>
                                    <p className={style.price}>US$2.99</p>
                                <div className={style.br}></div>
                                    <span>Video and sound quality</span>
                                    <p>Fair</p>
                                <div className={style.br}></div>
                                    <span>Resolution</span>
                                    <p>480p</p>
                                <div className={style.br}></div>
                                    <span>Supported devices</span>
                                    <p>mobile phone, tablet</p>
                                <div className={style.br}></div>
                                    <span>Devices your household can watch at the same time</span>
                                    <p>1</p>
                                <div className={style.br}></div>
                                    <span>Download devices</span>
                                    <p>1</p>
                            </div>
                        </div>
                    </div>

                    <div className={style.plan_list_hide}>
                        <div className={style.plan_list_small }>
                            <div className={`${style.plan_best} ${style.selected}`}>
                                <div className={style.Premium_pop}  style={{ background: color('Premium') }}>
                                    <p>Most Popular</p>
                                </div>
                                <div className={style.Premium_Header} style={{ boxShadow: getBoxShadow('Premium'), ...Premium_Header('Premium') }} onClick={() => handlePlanClick('Premium')}>
                                    <h2 style={{color:Headertext('Premium')}}>Premium</h2>
                                    <h3 style={{color:Headertext('Premium')}}>4K + HDR</h3>
                                    <div style={{ display: show('Premium') }}>
                                        <PiCheckCircleFill />
                                    </div>
                                </div>
                            </div>

                            <div className={style.plan}>
                                <div className={style.Standard_Header} style={{ boxShadow: getBoxShadow('Standard'), ...Standard_Header('Standard') }} onClick={() => handlePlanClick('Standard')} >
                                    <h2 style={{color:Headertext('Standard')}}>Standard</h2>
                                    <h3 style={{color:Headertext('Standard')}}>1080p</h3>
                                    <div style={{ display: show('Standard') }}>
                                        <PiCheckCircleFill />
                                    </div>
                                </div>
                            </div>

                            <div className={style.plan}>
                                <div className={style.Basic_Header} style={{ boxShadow: getBoxShadow('Basic'), ...Basic_Header('Basic') }} onClick={() => handlePlanClick('Basic')}>
                                    <h2 style={{color:Headertext('Basic')}}>Basic</h2>
                                    <h3 style={{color:Headertext('Basic')}}>720p</h3>
                                    <div style={{ display: show('Basic') }}>
                                        <PiCheckCircleFill />
                                    </div>
                                </div>
                            </div>

                            <div className={style.plan} >
                                <div className={style.Mobile_Header} style={{ boxShadow: getBoxShadow('Mobile'), ...Mobile_Header('Mobile') }} onClick={() => handlePlanClick('Mobile')}>
                                    <h2 style={{color:Headertext('Mobile')}}>Mobile</h2>
                                    <h3 style={{color:Headertext('Mobile')}}>480p</h3>
                                    <div style={{ display: show('Mobile') }}>
                                        <PiCheckCircleFill />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={style.detail}>
                            <div  className={style.plan_best_text}>
                                <div>
                                    <span>Monthly price</span>
                                    <p className={style.price}>{details.price}</p>
                                </div>
                                <div className={style.br}></div>
                                <div>
                                    <span>Video and sound quality</span>
                                    <p>{details.quality}</p>
                                </div>
                                <div className={style.br}></div>
                                <div>
                                    <span>Resolution</span>
                                    <p>{details.resolution}</p>
                                </div>
                                <div className={style.br}></div>

                                {selectedPlan !== 'Standard' && selectedPlan !== 'Mobile' && selectedPlan !== 'Basic' && (
                                    <>
                                        <div>
                                            <span>Spatial audio (immersive sound)</span>
                                            <p>Included</p>
                                        </div>
                                        <div className={style.br}></div>
                                    </>
                                )}
                                <div>
                                    <span>Supported devices</span>
                                    <p>{details.devices}</p>
                                </div>
                                <div className={style.br}></div>
                                <div>
                                    <span>Devices your household can watch at the same time</span>
                                    <p>{details.simultaneousWatch}</p>
                                </div>
                                <div className={style.br}></div>
                                <div>
                                    <span>Download devices</span>
                                    <p>{details.downloadDevices}</p>
                                </div>
                            </div>
                        </div>

                        <div className={style.text}>
                            <p>HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content is available in all resolutions. See our <a href="">Terms of Use</a> for more details.</p><br/>
                            <p>Only people who live with you may use your account. Watch on 4 different devices at the same time with Premium, 2 with Standard, and 1 with Basic and Mobile.</p>
                        </div>
                    </div>
                </div>
                    <button onClick={handleChoosePackage}>Next</button>
                {errors && <p className={style.error}>{errors}</p>}
            </div>
            <SignUpFooter />
        </div>
    );
}

export default Package;
