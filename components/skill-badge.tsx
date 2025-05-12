interface SkillBadgeProps {
  name: string
  level: number // 1-5
}

export default function SkillBadge({ name, level }: SkillBadgeProps) {
  return (
    <div className="cyber-border p-3 flex flex-col items-center">
      <span className="text-sm font-medium mb-1">{name}</span>
      <div className="flex space-x-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`h-1.5 w-3 rounded-full ${i < level ? "bg-primary" : "bg-muted"}`} />
        ))}
      </div>
    </div>
  )
}
