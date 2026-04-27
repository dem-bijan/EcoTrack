import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

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
    <div
      className="flex flex-col overflow-hidden rounded-2xl h-full transition-all duration-300 group"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.12)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 40px -8px rgba(0,0,0,0.5)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-border)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6">
        <h5 className="text-base font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
          {title}
        </h5>
        <p className="text-sm text-slate-400 leading-relaxed flex-1">{description}</p>

        <div className="mt-6">
          <a
            href={buttonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-emerald-400 transition-colors group/link"
          >
            {buttonText}
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
