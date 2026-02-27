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
    <div className="glass-card text-white rounded-[2rem] shadow-2xl flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-emerald-500/10 border border-white/10 group h-full">
      {/* Image Section */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between p-8">
        <div>
          <h5 className="text-2xl font-bold mb-4 font-outfit text-white group-hover:text-emerald-400 transition-colors">{title}</h5>
          <p className="text-slate-300 text-base leading-relaxed font-medium">{description}</p>
        </div>

        {/* Button Section */}
        <div className="mt-8">
          <a
            href={buttonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full px-6 py-4 glass hover:bg-emerald-500 hover:text-slate-950 text-white font-bold rounded-2xl transition-all duration-300 group-hover:border-emerald-500/50 outline-none"
          >
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
}
