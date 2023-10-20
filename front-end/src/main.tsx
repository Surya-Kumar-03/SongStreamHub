import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Index from '.';
import {ThemeProvider} from '@/components/theme-provider';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
			<Index />
		</ThemeProvider>
	</React.StrictMode>
);
