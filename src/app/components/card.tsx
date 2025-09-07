import Image from "next/image";

interface CardProps {
  title: string;
  description: string;
  imageSrc: string;
  buttonText?: string;
  buttonUrl?: string;
}

export default function Card({
  title,
  description,
  imageSrc,
  buttonText = "Learn More",
  buttonUrl = "#",
}: CardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-xs text-white rounded-2xl shadow-xl w-96 flex flex-col mt-6 overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-2xl">
      {/* Image Section */}
      <div className="relative h-56 w-full">
        <Image
          src={imageSrc}
          alt="card-image"
          fill
          className="object-cover opacity-75"
          priority
        />
        {/* Optional overlay for modern look */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between p-6">
        <div>
          <h5 className="text-2xl font-bold mb-3 text-zinc-400 ">{title}</h5>
          <p className="text-gray-50 text-base leading-relaxed">{description}</p>
        </div>
        {/* Button Section (always at the bottom) */}
        <div className="mt-6 flex justify-end">
          <a
            href={buttonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium shadow hover:bg-blue-700 transition"
          >
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
}