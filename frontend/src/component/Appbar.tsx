import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = ()=>{
    return <div className="px-10 py-4 border-b flex justify-between">
        <Link to={"/blogs"}>
            <div className="text-bold text-lg cursor-pointer">
                 Stories
            </div>
        </Link>
        <div>
        <Link to={"/publish"}>
        <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">New +</button>
        </Link>
        <Avatar name={localStorage.getItem("Username") || "Anonymous" }size="large"/>
        </div>
    </div>
}