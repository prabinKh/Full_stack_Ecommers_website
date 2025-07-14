'use client'
import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import Logo from '@/public/assets/images/logo-black.png'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {zSchema} from '@/lib/zodSchema'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import ButtonLoading from '@/components/ui/application/ButtonLoading'
import {z} from 'zod'
import { tr } from 'zod/locales'
import Link from "next/link"

import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import {WEBSITE_REGISTER} from '@/routes/WebsiteRoute'

const LoginPage = () => {
    
    const [isTypePassword, setIstypePassword] = useState(true)

    const [loading,setLoading] = useState(false)

    const formSchema = zSchema.pick(
        {
            email: true,
        }
    ).extend({
        password:z.string().min('3','Password field is required.')
    })
    const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email:"",
      password:""
    },
  })

  const handleLoginSubmit = async(values)=>{
    console.log(values)

  }
  return (
    <div>
        <Card
        className='w-[440]'
        >
            <CardContent>
                <div className='flex justify-center '>
                    <Image
                    src={Logo.src}
                    width={Logo.width}
                    height = {Logo.height}
                    className='max-w-[150px]'
                    alt="Company Logo"

                    
                    />
                </div>
                <div className='text-center'>
                    <h1 className='text-3xl font-semibold'>Login Into Acount</h1>
                    <p>login into your acount by filling out the form bellow</p>
                </div>
                <div className='mt-5'>
                     <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLoginSubmit)} className="space-y-8">
        <div className='mb-4'>
            <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email'  placeholder="Example@gmail.com" {...field} />
              </FormControl>
          
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className='mb-5'>
            <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type={isTypePassword ? 'password':'text'}   placeholder="****" {...field} />
               
              </FormControl>
               <button className='absolute top-1/2 right-2 cursor-pointer' type='button'
               onClick={()=>setIstypePassword(!isTypePassword)}
               >

                    {isTypePassword? 
                     <FaRegEyeSlash/>
                     : 
                     <FaRegEye/>

                    
                }


                </button>
          
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className='mb-2' >
            <ButtonLoading loading={loading} type="submit" text="Login" className='w-full cursor-pointer' />
        </div>

        <div className='text-center'>
            <div className='flex justify-center items-center gap-1'>

                <p>Don't  have acount ?</p>
                <Link href={WEBSITE_REGISTER} className='text-primary underline' >Create acount</Link>
            </div>

            <div className='mt-3'>
                <Link href='' className='text-primary underline' >Forgot Password?</Link>


            </div>
        </div>


      </form>
    </Form>
                </div>

            </CardContent>
            
            
            </Card>      
    </div>
  )
}

export default LoginPage
