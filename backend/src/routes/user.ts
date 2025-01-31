import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signinInput, signupInput } from "@prince981620/medium-common";

export const userRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string;
        JWT_SECRET : string;
    }
}>();

userRouter.post('/signup',async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
   try {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message: "Input are not correct"
      })
    }
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password
      }
    })
    const token = await sign({id: user.id}, c.env.JWT_SECRET);
    return c.json({
      jwt: token
    });
   }catch(e){
    c.status(411);
    return c.text("Invalid");
   }
  })
  
userRouter.post('/signin',async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    try {
      const body = await c.req.json();
      const { success } = signinInput.safeParse(body);
      if(!success){
        c.status(411);
        return c.json({
          message: "Invalid Inputs"
        })
      }
      const user = await prisma.user.findUnique({
        where:{
          email: body.email,
          password: body.password
        },
      })
      if(!user){
        c.status(403);
        return c.json({error: "user not found"});
      }else{
        const token = await sign({id:user.id},c.env.JWT_SECRET);
        return c.json({
          jwt: token
        });
      }
    } catch(e){
      c.status(411);
      return c.text("Invalid");
    }
  })

