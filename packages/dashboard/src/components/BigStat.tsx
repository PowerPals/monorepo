export default function BigStat({
	stat,
	title,
	className,
}: { stat: number; title?: string; className?: string }) {
	return (
		<div className={`flex items-center text-center flex-col ${className}`}>
			<p className="text-8xl">{stat}</p>
			{title && <p>{title}</p>}
		</div>
	);
}
