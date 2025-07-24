import { allDocs, Doc } from ‘contentlayer/generated’;
import { GetStaticProps } from ‘next’;
import Link from ‘next/link’;
import { format } from ‘date-fns’;

interface HomeProps {
docs: Doc[];
}

export default function Home({ docs }: HomeProps) {
if (!docs || docs.length === 0) {
return (
<div className="text-center py-12">
<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
Controls Wiki
</h1>
<p className="text-gray-600 dark:text-gray-400">
No documentation found. Add some .mdx files to the content/docs directory.
</p>
</div>
);
}

return (
<div>
<div className="text-center mb-12">
<h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
Controls Wiki
</h1>
<p className="text-xl text-gray-600 dark:text-gray-400">
Your comprehensive guide to control systems
</p>
</div>

```
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {docs.map((doc) => (
      <Link
        key={doc._id}
        href={doc.url}
        className="block p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {doc.title}
        </h2>
        {doc.description && (
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            {doc.description}
          </p>
        )}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          {doc.date && (
            <span>{format(new Date(doc.date), 'MMM dd, yyyy')}</span>
          )}
          {doc.tags && doc.tags.length > 0 && (
            <div className="flex gap-1">
              {doc.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    ))}
  </div>
</div>
```

);
}

export const getStaticProps: GetStaticProps = async () => {
// Filter out unpublished docs and sort by date
const publishedDocs = allDocs
.filter((doc) => doc.published !== false)
.sort((a, b) => {
if (a.date && b.date) {
return new Date(b.date).getTime() - new Date(a.date).getTime();
}
return a.title.localeCompare(b.title);
});

return {
props: {
docs: publishedDocs,
},
};
};
