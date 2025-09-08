"use client";
import Login from "./components/Login";
import Card from "./components/card";
import { TypeAnimation } from 'react-type-animation';
import LeaderBoard from "./components/LeaderBoard";

export default function Home() {

  const imageSrc = [
  "https://media.istockphoto.com/id/1340519929/photo/concept-depicting-the-issue-of-carbon-dioxide-emissions-and-its-impact-on-nature-in-the-form.webp?s=2048x2048&w=is&k=20&c=cUkLVMxwNBSrm-WDJjUJK2ySl5y9b4ssNqrCmT1jDyY=",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80","https://media.istockphoto.com/id/1323823418/photo/low-angle-view-thermometer-on-blue-sky-with-sun-shining.webp?s=2048x2048&w=is&k=20&c=vs-wMhpIBhtgOfVrwVCGOIqto--JCLnYkunCXaq0F7c="];
  const CardUrl = ["https://www.bain.com/insights/what-do-consumers-really-want-ceo-sustainability-guide-2024/",
                    "https://www.factmr.com/report/carbon-footprint-management-market",
                    "https://www.openpr.com/news/4154943/carbon-footprint-management-market-rising-demand-and-growth"]
  const TitleCard =["Record-Breaking Crisis (2024 Data):", "Accelerating Danger:" , "The Stark Choice Ahead:"]
  const DescriptionCard = ["The concentration of carbon dioxide in the atmosphere has increased from pre-industrial levels in the 18th century of approximately 278 parts per million to about 420 parts per million today.", 
                           "In the last decade (2015-2024), the annual increase has accelerated to 2.6 ppm per year", "The 2024 UNEP Emissions Gap Report highlights the stark choices we face: limit global warming to 1.5°C, struggle to adapt to 2°C, or face catastrophic consequences at 2.6°C and beyond"]

                      
    return (
    <div className="overflow-y-auto overflow-x-hidden h-screen overscroll-none scroll-smooth">
      <div className="">
        <div className="min-h-[80vh] flex flex-col overflow-hidden relative">
          {/* Video background */}
          <video
            autoPlay
            loop
            playsInline
            preload="auto"
            disableRemotePlayback
            className="fixed  w-full h-full object-cover z-0"
          >
            <source src="/nature.mp4" type="video/mp4" />
          </video>

          {/* Black mask overlay */}
          <div className="fixed  w-full h-full bg-black opacity-20 pointer-events-none" />

          {/* Content */}
          <div className="bg-blue-400 flex-1 ">
            <div className="flex flex-row items-center justify-between relative z-20">
              <div className="flex items-center ml-[4vw] min-h-[16rem] min-w-[16.8rem]">
                <div className="flex flex-col items-start gap-8 mt-8 justify-center p-3 text-white font-semibold text-s leading-snug">
                  422 PPM and Rising
                  <TypeAnimation
                    sequence={[
                      '10,000+ People Cut THEIR Footprint in Half.',
                      5000,
                      'YOUR Next Move Decides Everything',
                      5000,
                      " ", 10,
                      "What's YOUR carbon score?",
                      5000,
                    ]}
                    wrapper="span"
                    speed={20}
                    style={{ fontSize: "1.6em", display: "inline-block" }}
                    repeat={Infinity}
                  />
                </div>
              </div>
              <div className="flex flex-row min-w-[32rem] min-h-[16rem] mr-[4vw] items-center justify-end">
                <Login />
              </div>
            </div>
          </div>

          <div className="relative z-10 flex-12 scale-80 origin-top flex flex-col items-center">
            {/* Mid Content */}
            <div className="text-center text-shadow-lg/30 mt-50 p-3 mb-30 text-white font-semibold text-3xl">
              We Just Hit the Highest CO2 Levels in Human History
              <br />
              422.7 ppm CO2 in 2024 - the largest yearly increase ever recorded
              <br />
              50% higher than pre-industrial levels
              <br />
              We have less than 16 years before irreversible damage
            </div>
            {/*Cards*/}
            <div className="flex flex-row justify-center mt-8 gap-40">
              <Card
                title={TitleCard[0]}
                description={DescriptionCard[0]}
                imageSrc={imageSrc[0]}
                buttonText="Leabsolutearn More"
                buttonUrl={CardUrl[0]}
              />
              <Card
                title={TitleCard[1]}
                description={DescriptionCard[1]}
                imageSrc={imageSrc[1]}
                buttonText="Learn More"
                buttonUrl={CardUrl[1]}
              />
              <Card
                title={TitleCard[2]}
                description={DescriptionCard[2]}
                imageSrc={imageSrc[2]}
                buttonText="Learn More"
                buttonUrl={CardUrl[2]}
              />
            </div>
          </div>
          <div className="relative z-10 w-full flex flex-col items-center mt-20 mb-10">
            <LeaderBoard />
          </div>
        </div>
      </div>
    </div>
  );
}
