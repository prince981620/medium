import { Link } from "react-router-dom"

export const AuthHeader = ({type}:{type:string})=>{
    return (
        <div className="px-10">
                        <div className="text-3xl font-extrabold">
                        {type==="signup"?"Create an account":"Login your account"}
                        </div>
                        <div className="px-4 max-w-md text-base font-normal text-slate-500">
                        {type==="signup"?"Have an account?":"Don't have an account?"}
                        <Link className="pl-2 underline" to={type==="signup"?"/signin":"/signup"}>{type==="signup"?"Login":"Signup"}</Link>
                        </div>
                    </div>
    )
}