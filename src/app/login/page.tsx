

export default function Login() {
  return (
    <div className="bg-blue-200 h-[100vh] grid place-items-center w-full overflow-hidden">
        <div className="w-1/3 h-3/4 rounded-2xl mx-auto p-30 flex flex-col animated-gradient">
          <div className="text-6xl text-signature text-shadow-blue-600 text-center font-sans">Welcome !</div>
          <div className="mt-20 flex-1 items-center  justify-center flex flex-col">
            <input type="email" placeholder="UserName" className=" h-12 rounded-lg px-3 border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-6"/>
            <input type="email" placeholder="Email" className=" h-12 rounded-lg px-3 border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-6"/>
            <input type="email" placeholder="Password" className=" h-12 rounded-lg px-3 border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-6"/>
            <input type="email" placeholder="Confirmed Password" className=" h-12 rounded-lg px-3 border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-6"/>
            </div>
          </div>      
    </div>
  )
  
}