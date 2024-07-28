import { Link } from "react-router-dom"



export const Landing = ()=>{
    return <div className="container mx-auto px-4">
        <div className="flex justify-between px-10 py-4 border-b w-full">
            <div className="text-bold text-lg bg pt-2">
                 Story | Medium-Clone
            </div>
        <div>
        <Link to={"/signin"}>
        <button type="button" className="text-slate-600 hover:bg-blue-200 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Signin</button>
        </Link>
        <Link to={"/signup"}>
        <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Get Started</button>
        </Link>
        </div>
    </div>
    <div className="pt-10 grid grid-cols-12">
        <div className="text-9xl col-span-9 font-serif">
            Human<br/>
            stories & ideas
        </div>
        <div className="col-span-3 invisible lg:visible">
            <img src="https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png" alt="Story..."/>
        </div>
    </div>
    <Link to={"/signup"}>
        <button type="button" className="ml-5 text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Start Reading...</button>
    </Link>
    </div>
}