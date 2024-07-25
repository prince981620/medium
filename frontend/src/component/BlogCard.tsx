import { Link } from "react-router-dom";

interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}
export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps)=>{
    return <Link to={`/blog/${id}`}>
    <div className="border-b pb-4 pt-4 w-screen max-w-lg cursor-pointer">
        <div className="flex">
            <div className="mr-2">
            <Avatar name={authorName} size="small"/>
            </div>
            <div className="font-extralight">
                {authorName}
            </div>
            <div className="flex justify-center flex-col pl-2">
                <Circle/>
            </div>
            <div className="pl-2 font-thin text-slate-500">
            {publishedDate}
            </div>
        </div>
        <div className="text-xl font-semibold pt-1">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.length>=100?content.slice(0,100)+"...":content}
        </div>
        <div className="text-slate-600 font-thin text-sm">
            {`${Math.ceil(content.length/100)} min read`}
        </div>
    </div>
    </Link>
}
export function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500">
    </div>
}
export function Avatar({name,size}:{name:string;size:string}){
    return(
    <div className={`${size ==="small"?"w-6 h-6":"w-10 h-10"} relative inline-flex items-center justify-center overflow-hidden bg-gray-300 rounded-full`}>
    <span className={`${size==="small"?"text-xs":"text-md"}font-medium text-gray-600`}>{name[0]}</span>
    </div>
)}