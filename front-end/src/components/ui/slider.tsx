import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import {cn} from '@/lib/utils';

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({className, ...props}, ref) => {
	const [hover, setHover] = React.useState(false);
	return (
		<SliderPrimitive.Root
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			ref={ref}
			className={cn(
				'relative flex w-full touch-none select-none items-center',
				className
			)}
			{...props}>
			<SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
				<SliderPrimitive.Range
					className={`${
						hover ? 'opacity-100' : 'opacity-90'
					} absolute h-full bg-primary`}
				/>
			</SliderPrimitive.Track>
			<SliderPrimitive.Thumb
				className={`${
					hover ? 'slace-100 opacity-100' : 'scale-50 opacity-0'
				} transition-all duration-75 block h-4 w-4 rounded-full border border-primary/50 bg-background shadow  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50`}
			/>
		</SliderPrimitive.Root>
	);
});
Slider.displayName = SliderPrimitive.Root.displayName;

export {Slider};
