import Icon from '@/components/icon';
import Theme from '@/components/ui/theme';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarLabel,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from '@/components/ui/menubar';
import {MoonIcon, SunIcon} from '@radix-ui/react-icons';
import {useTheme} from '../components/theme-provider';
import React from 'react';
import {Button} from '../components/ui/button';
import SocialsLinks from './socials_link';
import {TrashIcon} from '@radix-ui/react-icons';
import {Link} from 'react-router-dom';

function ThemeChanger() {
	const {setTheme} = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="w-9 px-0">
					<SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-75 dark:-rotate-90 dark:scale-0" />
					<MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-75 dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export function NavBar() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="w-full h-full p-5 flex justify-between">
				<Theme>
					<div className="w-10 h-10">
						<Icon.logo className="text-white" />
					</div>
				</Theme>
				<ThemeChanger />
			</div>
		</header>
	);
}

export function Menu() {
	return (
		<>
			<Menubar className="sticky top-0 z-50">
				<div className="flex justify-between w-full">
					<div className="flex items-center">
						<MenubarMenu>
							<MenubarTrigger>
								<b>Music</b>
							</MenubarTrigger>
							<MenubarContent>
								<MenubarItem>
									About Music <MenubarShortcut>⌘ D</MenubarShortcut>
								</MenubarItem>
								<MenubarItem>New Window</MenubarItem>
							</MenubarContent>
						</MenubarMenu>

						<MenubarMenu>
							<MenubarTrigger>
								<SocialsLinks />
							</MenubarTrigger>
						</MenubarMenu>

						<MenubarMenu>
							<MenubarTrigger className="hidden md:block">Account</MenubarTrigger>
							<MenubarContent forceMount>
								<MenubarLabel inset>Switch Account</MenubarLabel>
								<MenubarSeparator />
								<MenubarRadioGroup value="benoit">
									<MenubarRadioItem value="andy">
										<div className="flex justify-between w-full">
											<div>Andy</div>
											<div className="rounded-full text-muted-foreground hover:text-foreground cursor-pointer hover:bg-primary-foreground p-1 flex justify-center items-center">
												<TrashIcon />
											</div>
										</div>
									</MenubarRadioItem>
									<MenubarRadioItem value="benoit">
										<div className="flex justify-between w-full">
											<div>Benoit</div>
											<div className="rounded-full text-muted-foreground hover:text-foreground cursor-pointer hover:bg-primary-foreground p-1 flex justify-center items-center">
												<TrashIcon />
											</div>
										</div>
									</MenubarRadioItem>
									<MenubarRadioItem value="Luis">
										<div className="flex justify-between w-full">
											<div>Luis</div>
											<div className="rounded-full text-muted-foreground hover:text-foreground cursor-pointer hover:bg-primary-foreground p-1 flex justify-center items-center">
												<TrashIcon />
											</div>
										</div>
									</MenubarRadioItem>
								</MenubarRadioGroup>
								<MenubarSeparator />
								<Link to="/">
									<MenubarItem inset>Add Account...</MenubarItem>
								</Link>
							</MenubarContent>
						</MenubarMenu>
					</div>
					<div>
						<ThemeChanger />
					</div>
				</div>
			</Menubar>
		</>
	);
}
