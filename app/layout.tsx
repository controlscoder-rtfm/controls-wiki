'use client';

import '../globals.css';
import { allPages } from '.contentlayer/generated';
import { useEffect, useState } from 'react';

export default function RootLayout({ children }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('dark');
    if (stored !== null) setDark(stored === 'true');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('dark', dark.toString());
  }, [dark]);

  return (
    <html>
      <body className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <aside className="w-64 bg-gray-100 dark:bg-gray-800 p-4">
          <h2 className="text-xl font-bold mb-4">Controls Wiki</h2>
          <button
            onClick={() => setDark(!dark)}
            className="mb-4 px-3 py-1 border rounded"
          >
            {dark ? 'Light Mode' : 'Dark Mode'}
          </button>
          <ul>
            {allPages.map((page) => (
              <li key={page._id} className="mb-1">
                <a href={page.slug} className="hover:underline">
                  {page.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex-1 overflow-auto p-8 prose dark:prose-invert">
          {children}
        </main>
      </body>
    </html>
  );
}
