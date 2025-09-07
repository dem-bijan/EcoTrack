import Image from "next/image";


export default function  Logo({src}:{src:string}) {
    return (
        <div className="min-w-[21rem] min-h-[21rem] h-[35vh] overflow-hidden ">
            <Image src={src} alt="Profile Image" width={4300} height={3400} className="object-cover aspect-1 w-full h-full"/>
        </div>
    )   
}