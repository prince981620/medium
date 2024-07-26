import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog }: {blog:Blog})=>{
    return <div>
        <Appbar/>
        <div className="flex justify-center">
        <div className="pt-12 grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl">
            <div className="col-span-8">
                <div className="text-5xl font-extrabold break-words overflow-hidden">
                    {blog.title}
                </div>
                <div className="text-slate-500 pt-2">
                    Posted on : {blog.publishedDate.slice(0,10)}
                </div>
                <div className="pt-4 content break-words overflow-hidden">
                    {blog.content}
                </div>
            </div>
            <div className="col-span-4 border-l">
                            <div className="text-slate-600 pl-2 text-lg">
                                Author
                            </div>
                <div className="flex w-full">
                    <div className="pr-4 pl-4 flex flex-col justify-center">
                    <Avatar name = {blog.author.name || "Anonymous"} size="large"/>
                    </div>
                    <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Hey there<br></br> Welcome! to my blog i wrote something for you.
                            </div>
                        </div>
                </div>
            </div>
            
        </div>
        </div>
    </div>
}