export default function Image({
	className,
	src,
	...props
}: {
	className: string;
	src: string;
}) {
	return <img className={className} src={src} {...props} />;
}
