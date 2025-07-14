'use client'
import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import Logo from '@/public/assets/images/logo-black.png'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { zSchema } from '@/lib/zodSchema'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import ButtonLoading from '@/components/ui/application/ButtonLoading'
import { z } from 'zod'
import Link from 'next/link'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa6'
import { WEBSITE_LOGIN } from '@/routes/WebsiteRoute'
import axios from 'axios'

const RegisterPage = () => {
  const [isTypePassword, setIsTypePassword] = useState(true)
  const [loading, setLoading] = useState(false)

  const formSchema = zSchema.pick({
      name: true,
      email: true,
      password: true,
    })
    .extend({
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match.',
      path: ['confirmPassword'],
    })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const handleRegisterSubmit = async (values) => {
    try {
      setLoading(true)
      const { data: registerResponse } = await axios.post('/api/auth/register', values)
      if (!registerResponse.success) {
        throw new Error(registerResponse.message || 'Registration failed')
      }
      form.reset()
      alert(registerResponse.message || 'Registration successful!')
    } catch (error) {
      alert(error.message || 'An error occurred during registration')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[440px]">
        <CardContent className="p-6">
          <div className="flex justify-center">
            <Image
              src={Logo}
              width={150}
              height={150}
              className="max-w-[150px]"
              alt="Company Logo"
            />
          </div>
          <div className="text-center mt-4">
            <h1 className="text-3xl font-semibold">Register Account</h1>
            <p>Create a new account by filling out the form below</p>
          </div>
          <div className="mt-5">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleRegisterSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="example@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type={isTypePassword ? 'password' : 'text'}
                          placeholder="****"
                          {...field}
                        />
                      </FormControl>
                      <button
                        className="absolute top-8 right-2 cursor-pointer"
                        type="button"
                        onClick={() => setIsTypePassword(!isTypePassword)}
                      >
                        {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type={isTypePassword ? 'password' : 'text'}
                          placeholder="****"
                          {...field}
                        />
                      </FormControl>
                      <button
                        className="absolute top-8 right-2 cursor-pointer"
                        type="button"
                        onClick={() => setIsTypePassword(!isTypePassword)}
                      >
                        {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <ButtonLoading
                  loading={loading}
                  type="submit"
                  text="Create Account"
                  className="w-full cursor-pointer"
                />
                <div className="text-center">
                  <div className="flex justify-center items-center gap-1">
                    <p>Already have an account?</p>
                    <Link href={WEBSITE_LOGIN} className="text-primary underline">
                      Login Account
                    </Link>
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

export default RegisterPage