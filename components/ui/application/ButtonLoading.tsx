'use client'
import { Loader2Icon } from "lucide-react"
import {Button} from "@/components/ui/button"
import {cn} from '@/lib/utils'
const ButtonLoading = ({type,text,loading,className,onClick=null,...props}) => {
  return (
    <Button
    type={type} 
    disabled={loading}
    onClick={onClick} 
    {...props}
    className={cn('',className)}
    >
     {
        loading &&  <Loader2Icon className="animate-spin" />
     }
      {text}
    </Button>
    
  )
}

export default ButtonLoading
