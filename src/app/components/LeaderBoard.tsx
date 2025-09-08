import Image from "next/image";

export default function LeaderBoard() {
    return (
        <div className="w-full min-w-[900px] h-300 bg-red/90 flex flex-col items-center mb-10">
            {/* first 3 goes here */}
            <div className="flex w-8/10 bg-white/10 backdrop-blur-[20px] rounded-2xl mt-30 h-2/6 flex-row items-end gap-2 ">
                {/* 1st user: David */}
                <div className="flex-1 flex  flex-col-reverse h-9/10 ">
                    {/* gradient Silver */}
                    <div className="h-1/2 rounded-tl-lg shadow bg-gradient-to-bl from-gray-500 to-gray-300 " ></div>
                    {/* Infos */}
                    <div className="h-1/2 flex flex-col-reverse justify-between  ">
                        <div className="text-center font-sans text-white font-bold ">
                            Mr Johnson Saved 22 Tons in 3 months he scored: 3023 points
                        </div>
                        <div className="flex flex-row-reverse font-sans text-2xl text-center font-bold ">
                            <div className="flex-3 text-white p-4">David Johnson</div>
                            <div className="flex-1 rounded-full ml-4 relative h-16 w-16">
                                <Image src="/johnson.jpg" alt="card-image" fill className="object-cover opacity-75 rounded-full" priority />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2nd user: George */}
                <div className="flex-1 flex shadow-xl/30 flex-col-reverse  h-9/10 ">
                    {/* gradient Gold */}
                    <div className="h-3/5 rounded-t-lg bg-gradient-to-b from-yellow-400 to-yellow-200 " ></div>
                    <div className="h-2/5 flex flex-col-reverse justify-between  ">
                        <div className="text-center font-sans text-white font-bold ">
                            Mr George Saved 18 Tons in 3 months, he scored: 3800 points
                        </div>
                        <div className="flex flex-row-reverse font-sans text-2xl text-center font-bold ">
                            <div className="flex-3 text-white p-4">George</div>
                            <div className="flex-1 rounded-full ml-4 relative h-16 w-16">
                                <Image src="/george.jpg" alt="card-image" fill className="object-cover opacity-75 rounded-full" priority />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3rd user: Allan */}
                <div className="flex-1 flex flex-col-reverse h-9/10 ">
                    {/* gradient Bronze */}
                    <div className="h-1/4 rounded-tr-lg bg-gradient-to-br from-orange-500 to-yellow-50 " ></div>
                    <div className="h-3/4 flex flex-col-reverse justify-between  ">
                        <div className="text-center font-sans text-white font-bold ">
                            Mr Allan Saved 15 Tons in 3 months he scored: 2600 points
                        </div>
                        <div className="flex flex-row-reverse font-sans text-2xl text-center font-bold ">
                            <div className="flex-3 text-white p-4">Allan</div>
                            <div className="flex-1 rounded-full ml-4 relative h-16 w-16">
                                <Image src="/allan.jpg" alt="card-image" fill className="object-cover opacity-75 rounded-full" priority />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* rest goes here */}
            <div></div>
        </div>
    );
}
