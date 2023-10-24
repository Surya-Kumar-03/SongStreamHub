import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {ScrollArea} from '@/components/ui/scroll-area';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

export default function UploadSong() {
	const uploadSong = () => {};
	return (
		<Sheet>
			<SheetTrigger asChild>
				<div className="cursor-pointer">Upload Song</div>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Upload Song</SheetTitle>
					<SheetDescription>Upload your Favorite Song</SheetDescription>
				</SheetHeader>
				<ScrollArea className="h-auto">
					<div className="flex flex-col gap-3 p-2">
						<div className="flex felx-grow">
							<Label className="w-1/2 flex items-center">Song Title</Label>
							<Input type="text" placeholder="Title" name="songtName" />
						</div>
						<div className="flex felx-grow">
							<Label className="w-1/2 flex items-center">Artist Name</Label>
							<Input type="text" placeholder="Artist Name" name="artistName" />
						</div>
						<div className="flex felx-grow">
							<Label className="w-1/2 flex items-center">song</Label>
							<Input type="file" accept=".mp3,audio/*" name="audio" />
						</div>
						<div className="flex felx-grow">
							<Label className="w-1/2 flex items-center">Cover Photo</Label>
							<Input type="file" accept="image/png, image/jpeg" name="image" />
						</div>
					</div>
				</ScrollArea>

				<SheetFooter>
					<SheetClose asChild>
						<Button type="submit" onClick={uploadSong}>
							Upload
						</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
