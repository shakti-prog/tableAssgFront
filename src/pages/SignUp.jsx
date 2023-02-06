import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUp() {
  const navigate = useNavigate();

  function handleNavig(e) {
    navigate("signin");
  }

  function handleChange(property, value) {
    let newDetails = { ...signUpDetails };
    if (newDetails.hasOwnProperty(property)) {
      newDetails[property] = value;
    }
    setSignUpDetails(newDetails);
  }

  function checkValidity(email, phone, name) {
    const emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const emailValidity = emailRegex.test(email);
    const phoneValidity = phoneRegex.test(phone);
    const nameValidity = String(name).length > 3 ? true : false;
    return emailValidity & phoneValidity & nameValidity;
  }

  const [signUpDetails, setSignUpDetails] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    department: "department1",
  });

  async function SubmitDetails() {
    const validity = checkValidity(signUpDetails.email,signUpDetails.phone,signUpDetails.name);
    if (!validity) {
      alert("Incorrect Details");
      return;
    }
    await fetch("http://localhost:9000/register", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        signUpDetails,
      }),
    })
      .then(async (response) => await response.json())
      .then((data) => {
        const gotData = Object.values(data)[0];
        if(gotData !== undefined && gotData.token == null){
             console.log("User exists already");
        }
        else{
             console.log("Sign Up successfull " + gotData.token);
        }
      })
      .catch((error) => {
         alert("Sign Up Unsucessfull");
      });
 
    setSignUpDetails({
      name: "",
      email: "",
      password: "",
      department: "department1",
      phone: "",
    });
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("password").value = "";
    document.getElementById("department").value = "";
  }

  return (
    <>
      <div
        className="absolute top-0 w-full h-full bg-gray-900 "
        style={{
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4 mt-24">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="rounded-t mb-0 px-6 py-6 ">
                <div className="text-center mb-3">
                  <h6 className="text-gray-600 text-sm font-bold">Sign Up</h6>
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
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Name"
                      style={{ transition: "all .15s ease" }}
                      onChange={(e) =>
                        handleChange(e.target.id, e.target.value)
                      }
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Phone number
                    </label>
                    <input
                      type="text"
                      id="phone"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Phone Number"
                      style={{ transition: "all .15s ease" }}
                      onChange={(e) =>
                        handleChange(e.target.id, e.target.value)
                      }
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      htmlFor="Department"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Department
                    </label>
                    <select
                      id="department"
                      name="department"
                      autoComplete="country-name"
                      onChange={(e) =>
                        handleChange(e.target.id, e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>Department1</option>
                      <option>Department2</option>
                      <option>Department3</option>
                      <option>Department4</option>
                    </select>
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Name"
                      style={{ transition: "all .15s ease" }}
                      onChange={(e) =>
                        handleChange(e.target.id, e.target.value)
                      }
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
                      id="password"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Password"
                      style={{ transition: "all .15s ease" }}
                      onChange={(e) =>
                        handleChange(e.target.id, e.target.value)
                      }
                    />
                  </div>
                  <div class="flex items-center space-x-3 mt-4 mb-4">
                    <p>Already have an account ?</p>
                    <button
                      onClick={handleNavig}
                      class="bg-blue-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 px-3 py-1 rounded"
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={SubmitDetails}
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-gray-300"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-gray-300"
                >
                  <small>Create new account</small>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
