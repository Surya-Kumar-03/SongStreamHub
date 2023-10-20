import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {Button} from '@/components/ui/button';
import {Icon} from '@iconify/react';

export default function SocialsLinks() {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<div>Share</div>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Liked Our Project? Share with Others</AlertDialogTitle>
					<AlertDialogDescription>
						<div className="flex">
							<a
								href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse"
								target="_blank">
								<Button variant="ghost" className="w-14 h-14">
									<Icon icon="logos:facebook" className="w-full h-full" />
								</Button>
							</a>
							<a
								target="_blank"
								href="https://twitter.com/intent/tweet?text=Hello%20world&ulr=abc">
								<Button variant="ghost" className="w-14 h-14">
									<Icon icon="simple-icons:x" className="w-full h-full" />
								</Button>
							</a>
						</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Close</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
