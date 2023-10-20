import {ReactNode} from 'react';

export default function Theme(props: {children: ReactNode}) {
	return (
		<div className="fill-foreground text-foreground bg-primary-foreground">
			{props.children}
		</div>
	);
}
