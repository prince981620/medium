import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode,sign,verify } from 'hono/jwt'
import { createblogInput, updateblogInput } from "@prince981620/medium-common";


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET : string;
    },
    Variables: {
        userId : any;
    }
}>();

blogRouter.use("/*",async (c,next)=>{
    try {
        const auth = c.req.header("authorization");
        if(!auth){
            c.status(401);
            return c.json({error: "unauthorised error"})
        }
        const token = auth.split(" ")[1];
        const user = await verify(token,c.env.JWT_SECRET)
        if(!user){
            c.status(401);
            return c.json({error: "unauthorised"})
        }
        c.set("userId", user.id);
        await next();
    }catch(e){
        c.status(403);
        return c.json({Error :"Authentication Error"})
    }

})

blogRouter.post('/',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json();
        const { success } = createblogInput.safeParse(body);
        if(!success){
            c.status(411);
            return c.json({
                message: "invalid inputs"
            })
        }
    
        const response = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: c.get("userId")
            }
        })
        if(response.id){
            return c.json({
                id: response.id
            })
        }else{
            return c.json({error : "server error"})
        }
    } catch(e){
        return c.json({error : "server error in blog creation"})
    }
})
blogRouter.put('/',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json();
        const { success } = updateblogInput.safeParse(body);
        if(!success){
            c.status(411);
            return c.json({
                message: "Invalid Inputs"
            })
        }
        const editResponse = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
        if(editResponse.id){
            return c.json({
                id: editResponse.id
            })
        }else {
            return c.json({error: "update error"})
        }
    }catch(e){
        return c.json({error: "update error in blog update"})
    }
})

// todo: add pagination
blogRouter.get('/bulk',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    try {
        const allBlog = await prisma.post.findMany();
        if(allBlog){
            c.status(400);
            return c.json({allBlog});
        }else {
            c.status(411);
            return c.json({message:"Blog not found"})
        }
    }catch(e){
        return c.json({Error:"Error while getting all blogs"})
    }
})

blogRouter.get('/:id',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    try {
        const id = c.req.param("id");
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            }
        })
        if(blog){
            c.status(400);
            return c.json({blog})
        }else {
            return c.json({msg: "invalid blog id"})
        }
    }catch(e) {
        return c.json({Error: "error whiile getting this blog"})
    }
})