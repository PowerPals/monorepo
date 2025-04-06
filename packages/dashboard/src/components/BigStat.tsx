import { useMemo } from "react"

export default function BigStat({
  stat,
  title,
  className,
}: { stat: number; title?: string; className?: string }) {
  const formatted = useMemo(() => {
    return Intl.NumberFormat(undefined, {
      style: "decimal",
      maximumFractionDigits: 2,
    }).format(stat)
  }, [stat])

  return (
    <div className={`flex items-center text-center flex-col ${className}`}>
      <p className="text-8xl">{formatted}</p>
      {title && <p>{title}</p>}
    </div>
  )
}
