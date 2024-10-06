'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs';
import { Roles } from '@/types/global';
import { setUserRole } from '@/fetchApi';


const Welcome = () => {
  const { isLoaded, user } = useUser();

  if(!user){
    window.location.href = "/sign-in"
  }
  if(user?.publicMetadata.role === "admin" || user?.publicMetadata.role === "student" || user?.publicMetadata.role === "instructor" || user?.publicMetadata.role === "moderator" || user?.publicMetadata.role === "prefect"){
    window.location.href = "/";
  }


  async function setRole(params:Roles) {
    
    try {
      if(user?.id){
       const response = await setUserRole({
          id: user?.id,
          params: {"publicMetadata": {
            "role": params
        }}});

        if(response){
          window.location.href = "/"
        }
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 bg-dark-2 text-white flex flex-col justify-center items-center gap-3'>
      <Image
        src={'/icons/logo-ipmc.png'}
        alt='logo'
        width={100}
        height={100}
        className='rounded-[10px]'
        />
        <h1 className='flex justify-center font-extrabold items-center gap-0 flex-col '>
          
        {isLoaded && <i className='capitalize font-thin'>Hi {user?.username},</i>}
         <b> Welcome to IPMC DOCS</b>
          </h1>

      <div className='min-h-[50vh] flex flex-col items-center'>
        <b>
        Which of these best describe your role?<br/>
        </b>
        <i className='text-red-600 text-sm'>*Please that this role can not be changed</i>
          <div className='flex flex-col gap-4 font-extrabold mt-10'>
            <Button 
              className='flex gap-3 min-w-[100px]'
              onClick={() => setRole('instructor')}
            >
              INSTRUCTOR

              <Image
                src={'/icons/arrow-left.svg'}
                width={20}
                height={20}
                alt='arrow'
              />
            </Button>
            <Button 
              className='flex gap-3 min-w-[100px]'
              onClick={() => setRole('moderator')}
            >
              MODERATOR

              <Image
                src={'/icons/arrow-left.svg'}
                width={20}
                height={20}
                alt='arrow'
              />
            </Button>
            <Button 
              className='flex gap-3 min-w-[100px]'
              onClick={() => setRole('student')}
            >
              STUDENT

              <Image
                src={'/icons/arrow-left.svg'}
                width={20}
                height={20}
                alt='arrow'
              />
            </Button>

            <Button 
              className='flex gap-3 min-w-[100px]'
              onClick={() => setRole('student')}
            >
              Admin

              <Image
                src={'/icons/arrow-left.svg'}
                width={20}
                height={20}
                alt='arrow'
              />
            </Button>
          </div>
            <i className='text-red-600 text-sm max-w-[350px] text-center'>*Beware! Serious verification process which can last for maximum three(03) days will be executed.</i>
      </div>
    </div>
  )
}

export default Welcome