import { Appbar } from "../component/Appbar"
import { BlogCard } from "../component/BlogCard"
import { BlogSkeleton } from "../component/BlogSkeleton";
import { useBlogs } from "../hooks"

export const Blogs = ()=>{
    const {loading,blogs} = useBlogs();
    if(loading){
        return <div>
            <BlogSkeleton/>
        </div>
    }
    return (
        <div>
        <Appbar/>
        <div className="flex justify-center p-4">
            <div>
                {blogs.reverse().map(blog =><BlogCard 
                id={blog.id}
                authorName={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={blog.publishedDate.slice(0,10)}
            />
        )}
            </div>
        </div>
        </div>
    )
}