interface Props {
  title: string;
  subtitle?: string;
  gradient?: string;
  tall?: boolean;
}

export default function PhotoCard({ title, subtitle, gradient = "bg-gradient-to-br from-green to-ink", tall }: Props) {
  return (
    <div className={`relative rounded-card overflow-hidden shadow-md ${tall ? "h-80" : "h-56"} ${gradient} flex items-end p-4`}>
      {/* <img src="..." alt={title} className="absolute inset-0 w-full h-full object-cover" /> */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
      <div className="relative">
        <p className="text-cream font-semibold">{title}</p>
        {subtitle && <p className="text-cream/70 text-sm">{subtitle}</p>}
      </div>
    </div>
  );
}
