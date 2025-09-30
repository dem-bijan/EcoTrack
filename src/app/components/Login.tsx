import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter();
  
  
  return (
    <div >
        <button
          className="w-fit text-xl mr-10 relative text-white  font-bold rounded-xl px-6 py-3
               after:absolute after:left-1 after:bottom-1 after:h-0.5 after:w-full 
               after:origin-bottom after:scale-x-5
               after:transition-transform after:duration-400
               hover:after:scale-x-50 after:bg-white" onClick={()=> router.push("./login")} >
          Login
        </button>
        <button
          className="w-fit text-xl mr-10 relative text-white  font-bold  px-6 py-3
               after:absolute after:left-1 after:bottom-1 after:h-0.5 after:w-full 
               after:origin-bottom after:scale-x-5
               after:transition-transform after:duration-400
               hover:after:scale-x-50 after:bg-white"
        >
          Sign Up
        </button>
    </div>
  )
  
}
