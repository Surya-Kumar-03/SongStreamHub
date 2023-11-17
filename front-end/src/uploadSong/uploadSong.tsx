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
import {
	getStorage,
	ref,
	getDownloadURL,
	uploadBytesResumable,
	deleteObject,
	getMetadata,
} from 'firebase/storage';
import {app, storage} from '../firebaseConfig';
import Image from '@/components/ui/image';

interface InterfaceArtist {
	label: string;
	value: string;
}

const getMediaDuration = (mediaUrl: string, mediaType: string) => {
	return new Promise((resolve, reject) => {
		const media =
			mediaType === 'audio' ? new Audio() : document.createElement('video');
		media.src = mediaUrl;
		media.onloadedmetadata = () => {
			resolve(media.duration);
		};
		media.onerror = (error) => {
			reject(error);
		};
	});
};

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
							// @ts-ignore
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

	const [previousAudioUrl, setPreviousAudioUrl] = useState<string>('');
	const [previousImageUrl, setPreviousImageUrl] = useState<string>('');
	const deleteLastUploadedFile = async () => {
		try {
			if (previousAudioUrl !== '' && previousAudioUrl !== AudioUrl) {
				console.log('Delete called for', previousAudioUrl);
				const audioRef = ref(storage, previousAudioUrl);
				await deleteObject(audioRef);
			}

			if (previousImageUrl !== '' && previousImageUrl !== imageUrl) {
				const imageRef = ref(storage, previousImageUrl);
				await deleteObject(imageRef);
			}
		} catch (error) {
			console.error('Error deleting the file:', error);
		}
	};

	// Song Upload
	const [AudioDisplay, setAudioDisplay] = useState('Upload Your Song Here*');
	const [AudioUrl, setAudioUrl] = useState('');
	const uploadAudio = (e: any) => {
		setUploading(true);
		setAudioDisplay('Uploading, Please wait!');
		const uploadFile = e.target.files[0];
		const storageRef = ref(storage, `/audios/${Date.now()}-${uploadFile.name}`);
		const uploadTask = uploadBytesResumable(storageRef, uploadFile);
		uploadTask.on(
			'state_changed',
			() => {
				// This function is optional and can be used to track progress of the upload
			},
			(error) => {
				console.error(error);
				setUploading(false);
				setAudioDisplay('Try Again, Please!');
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref)
					.then((url) => {
						setAudioUrl(url);
						setUploading(false);
						setAudioDisplay('Song Upload Successful!');
						setPreviousAudioUrl(AudioUrl);
						const audioDur = getMediaDuration(AudioUrl, 'audio');
					})
					.catch((error) => {
						console.error(error);
						setUploading(false);
					});
			}
		);
	};

	// Poster Upload
	const [imageDisplay, setImageDisplay] = useState('Upload your Song Poster Here*');
	const [uploading, setUploading] = useState(false);
	const [imageUrl, setImageUrl] = useState(
		'https://yt3.googleusercontent.com/vCqmJ7cdUYpvR0bqLpWIe8ktaor4QafQLlfQyTuZy-M9W_YafT8Wo9kdsKL2St1BrkMRpVSJgA=s900-c-k-c0x00ffffff-no-rj'
	);
	const uploadImage = (e: any) => {
		setUploading(true);
		setImageDisplay('Uploading, Please wait!');
		const uploadPoster = e.target.files[0];
		const storageRef = ref(storage, `/images/${Date.now()}-${uploadPoster.name}`);
		const uploadTask = uploadBytesResumable(storageRef, uploadPoster);
		uploadTask.on(
			'state_changed',
			() => {
				// This function is optional and can be used to track progress of the upload
			},
			(error) => {
				console.error(error);
				setUploading(false);
				setImageDisplay('Try Again, Please!');
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref)
					.then((url) => {
						setImageUrl(url);
						setUploading(false);
						setImageDisplay('Song Poster Upload Successful!');
						setPreviousImageUrl(imageUrl);
					})
					.catch((error) => {
						console.error(error);
						setUploading(false);
					});
			}
		);
	};

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

	useEffect(() => {
		if (AudioUrl !== '' && AudioUrl !== previousAudioUrl) {
			deleteLastUploadedFile();
		}
		if (imageUrl !== '' && imageUrl !== previousImageUrl) {
			deleteLastUploadedFile();
		}
	}, [AudioUrl, imageUrl]);


	// TODO IMPORTANT call deleteLastUploadedFile() if they click on close

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
						<div className="flex flex-col gap-3 felx-grow">
							<Label className="w-1/2 flex items-center">{AudioDisplay}</Label>
							<input accept="audio/*" multiple type="file" onChange={uploadAudio} />
						</div>
						<div className="flex flex-col gap-2 felx-grow">
							<Label className="w-1/2 flex items-center">{imageDisplay}</Label>
							<input
								accept="image/*"
								multiple
								type="file"
								name="upload-file"
								onChange={uploadImage}
							/>
						</div>
						<Image className="w-48 h-48" src={imageUrl}></Image>
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
