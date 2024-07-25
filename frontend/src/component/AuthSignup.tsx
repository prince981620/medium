import { SignupInput } from "@prince981620/medium-common";
import { AuthHeader } from "./AuthHeader";
import { LabledInputBox } from "./LabledInputBox";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import {  useNavigate } from "react-router-dom";

export const AuthSignup = ()=>{
    const navigate = useNavigate();
    const [signupInputs,setSignupInputs] =  useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })
    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,signupInputs);
            const jwt = response.data.jwt;
            localStorage.setItem("token",jwt);
            localStorage.setItem("Username",signupInputs.name || "");
            navigate("/blogs")
        }catch(e){
            alert("Error while Signing up")
        }
    }
    return <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <AuthHeader type="signup"/>
                    <div className="pt-8">
                        <LabledInputBox label="Name" placeholder="Krishna" onchange={(e)=>{
                            setSignupInputs(c=>({
                                ...c,
                                name:e.target.value
                            }))
                        }}/>

                        <LabledInputBox label="Email" placeholder="krishna@radha.com" onchange={(e)=>{
                            setSignupInputs(c=>({
                                ...c,
                                email:e.target.value
                            }))
                        }}/>

                        <LabledInputBox type={"password"} label="Password" placeholder="" onchange={(e)=>{
                            setSignupInputs(c=>({
                                ...c,
                                password:e.target.value
                            }))
                        }}/>
                    </div>
                    <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">signup</button>
                </div>
            </div>
    </div>
}
