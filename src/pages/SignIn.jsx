import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {

    let navigate = useNavigate();

    function handleNavig(e) {
        navigate('/');
    }

    function handleSubmit(){
        const validity = checkValidity(signInDetails.email);
        if(!validity){
            alert("Invalid Details");
            return;
        }
        alert(signInDetails.email + " " + signInDetails.password);
        setSignInDetails({
            email:"",
            password:""
        })
        document.getElementById("email").value = ""
        document.getElementById("password").value = ""



    }

    function checkValidity(email){
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return emailRegex.test(email);

    }

    function handleChange(property,value){
      let newDetails = {...signInDetails};
      if(newDetails.hasOwnProperty(property)){
        newDetails[property] = value;
        setSignInDetails(newDetails);
      }


    }

    const [signInDetails,setSignInDetails] = useState({
        email:"",
        password:""
    })



    return (
        <>
            <div
                className="absolute top-0 w-full h-full bg-gray-900 "
                style={{

                    backgroundSize: "100%",
                    backgroundRepeat: "no-repeat"
                }}
            ></div>
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12 px-4 mt-24">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                            <div className="rounded-t mb-0 px-6 py-6 ">
                                <div className="text-center mb-3">
                                    <h6 className="text-gray-600 text-sm font-bold">
                                        Sign In
                                    </h6>
                                </div>
                                <hr className="mt-6 border-b-1 border-gray-400" />
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">

                                <form>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                            placeholder="Email"
                                            style={{ transition: "all .15s ease" }}
                                            id="email"
                                            onChange={(e)=>handleChange(e.target.id,e.target.value)}
                                            
                                        />
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                            placeholder="Password"
                                            style={{ transition: "all .15s ease" }}
                                            id="password"
                                            onChange={(e)=>handleChange(e.target.id,e.target.value)}
                                        />
                                    </div>
                                    <div>
                                    </div>
                                    <div class="flex items-center space-x-3 mt-4 mb-4">
                                        <p>Don't have an account ?</p>
                                        <button onClick={handleNavig} class="bg-blue-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 px-3 py-1 rounded">
                                            Sign Up
                                        </button>
                                    </div>

                                    <div className="text-center mt-6">
                                        <button
                                            className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                            type="button"
                                            style={{ transition: "all .15s ease" }}
                                            onClick={handleSubmit}
                                        >
                                            Sign In
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>

    )

}


export default SignIn;