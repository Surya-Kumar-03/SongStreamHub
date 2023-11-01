import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Check, ChevronsUpDown} from 'lucide-react';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
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
import {useEffect, useState} from 'react';
import {cn} from '@/lib/utils';

interface InterfaceArtist {
	label: string;
	value: string;
}

function ArtistDropDown(props: {artists: InterfaceArtist[]}) {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('');
	const [searchString, setSearchString] = useState('');

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between">
					{value
						? props.artists.find((artist) => artist.value === value)?.label
						: 'Select artist...'}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput
						placeholder="Search artist..."
						value={searchString}
						onChangeCapture={(e) => {
							setSearchString(e.target?.value);
						}}
					/>
					<CommandEmpty className="w-full p-2">
						<div className="w-full justify-start py-1 hover:bg-accent p-1 rounded-sm h-full">
							<span>Add</span>
							<span className="truncate max-w-sm"> "{searchString}" </span>
							<span>as a new Artist</span>
						</div>
					</CommandEmpty>
					<CommandGroup>
						{props.artists.map((artist) => (
							<CommandItem
								key={artist.value}
								value={artist.value}
								onSelect={(currentValue) => {
									setValue(currentValue);
									setOpen(false);
								}}>
								<Check
									className={cn(
										'mr-2 h-4 w-4',
										value === artist.value ? 'opacity-100' : 'opacity-0'
									)}
								/>
								{artist.label}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

export default function UploadSong() {
	const uploadSong = () => {};

	const [artistList, setArtistList] = useState<InterfaceArtist[]>([]);

	useEffect(() => {
		setArtistList([
			{
				label: 'Aryan Amish',
				value: 'aryan_amish',
			},
			{
				label: 'ABC',
				value: 'abc',
			},
			{
				label: 'ABCD',
				value: 'abcd',
			},
		]);
	}, []);

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
							<ArtistDropDown artists={artistList} />
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
