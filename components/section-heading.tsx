interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: "left" | "center" | "right"
}

export default function SectionHeading({ title, subtitle, align = "left" }: SectionHeadingProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  }

  return (
    <div className={`mb-12 max-w-2xl ${alignmentClasses[align]}`}>
      <h2 className="text-3xl font-bold gradient-text mb-3 font-raleway">{title}</h2>
      {subtitle && <p className="text-muted-foreground font-poppins">{subtitle}</p>}
    </div>
  )
}
