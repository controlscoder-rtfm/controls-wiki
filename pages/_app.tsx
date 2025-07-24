import type { AppProps } from ‘next/app’;
import Head from ‘next/head’;
import ‘../styles/globals.css’;

export default function App({ Component, pageProps }: AppProps) {
return (
<>
<Head>
<title>Controls Wiki</title>
<meta name="description" content="A comprehensive wiki for control systems" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="icon" href="/favicon.ico" />
</Head>
<div className="min-h-screen bg-white dark:bg-gray-900">
<nav className="border-b border-gray-200 dark:border-gray-700">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex justify-between h-16">
<div className="flex items-center">
<a href="/" className="text-xl font-bold text-gray-900 dark:text-white">
Controls Wiki
</a>
</div>
</div>
</div>
</nav>
<main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
<Component {…pageProps} />
</main>
</div>
</>
);
}
