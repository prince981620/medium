import { SigninInput } from "@prince981620/medium-common";
import { useState } from "react";
import { AuthHeader } from "./AuthHeader";
import { LabledInputBox } from "./LabledInputBox";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const AuthSignin = ()=>{
    const navigate = useNavigate();
    const [signinInputs,setSigninInputs] =  useState<SigninInput>({
        email: "",
        password: ""
    })
    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`,signinInputs);
            const jwt = response.data.jwt;
            localStorage.setItem("token",jwt);
            localStorage.setItem("Username",signinInputs.email || "Anonymous");
            navigate("/blogs")
        }catch(e){
            alert("Error while Signing in")
        }
    }
    return <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <AuthHeader type="signin"/>
                    <div className="pt-8">
                        <LabledInputBox label="Email" placeholder="krishna@radha.com" onchange={(e)=>{
                            setSigninInputs(c=>({
                                ...c,
                                email:e.target.value
                            }))
                        }}/>

                        <LabledInputBox type={"password"} label="Password" placeholder="" onchange={(e)=>{
                            setSigninInputs(c=>({
                                ...c,
                                password:e.target.value
                            }))
                        }}/>
                    </div>
                    <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">signin</button>
                </div>
            </div>
    </div>
}