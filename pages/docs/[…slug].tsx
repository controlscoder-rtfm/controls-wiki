import { allDocs, Doc } from ‘contentlayer/generated’;
import { GetStaticPaths, GetStaticProps } from ‘next’;
import { useMDXComponent } from ‘next-contentlayer/hooks’;
import Head from ‘next/head’;
import Link from ‘next/link’;
import { format } from ‘date-fns’;

interface DocPageProps {
doc: Doc;
}

const mdxComponents = {
a: ({ href, …props }: any) => {
if (href?.startsWith(‘http’)) {
return <a href={href} target=”_blank” rel=“noopener noreferrer” {…props} />;
}
return <Link href={href} {…props} />;
},
h1: ({ …props }) => (
<h1 className=“text-4xl font-bold text-gray-900 dark:text-white mb-6” {…props} />
),
h2: ({ …props }) => (
<h2 className=“text-3xl font-semibold text-gray-900 dark:text-white mb-4 mt-8” {…props} />
),
h3: ({ …props }) => (
<h3 className=“text-2xl font-semibold text-gray-900 dark:text-white mb-3 mt-6” {…props} />
),
p: ({ …props }) => (
<p className=“text-gray-700 dark:text-gray-300 mb-4 leading-relaxed” {…props} />
),
ul: ({ …props }) => (
<ul className=“list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1” {…props} />
),
ol: ({ …props }) => (
<ol className=“list-decimal list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1” {…props} />
),
code: ({ …props }) => (
<code className=“bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono” {…props} />
),
pre: ({ …props }) => (
<pre className=“bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4” {…props} />
),
blockquote: ({ …props }) => (
<blockquote className=“border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400 mb-4” {…props} />
),
};

export default function DocPage({ doc }: DocPageProps) {
const MDXContent = useMDXComponent(doc.body.code);

return (
<>
<Head>
<title>{doc.title} - Controls Wiki</title>
{doc.description && <meta name="description" content={doc.description} />}
</Head>

```
  <article className="max-w-4xl mx-auto">
    <div className="mb-8">
      <Link 
        href="/" 
        className="text-blue-600 dark:text-blue-400 hover:underline text-sm mb-4 inline-block"
      >
        ← Back to Wiki
      </Link>
      
      <header>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {doc.title}
        </h1>
        
        {(doc.description || doc.date || doc.tags) && (
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-6 space-y-2">
            {doc.description && (
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {doc.description}
              </p>
            )}
            
            <div className="flex items-center gap-4">
              {doc.date && (
                <span>Last updated: {format(new Date(doc.date), 'MMMM dd, yyyy')}</span>
              )}
              
              {doc.tags && doc.tags.length > 0 && (
                <div className="flex gap-1">
                  {doc.tags.map((tag) => (
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
          </div>
        )}
      </header>
    </div>

    <div className="prose prose-lg dark:prose-invert max-w-none">
      <MDXContent components={mdxComponents} />
    </div>
  </article>
</>
```

);
}

export const getStaticPaths: GetStaticPaths = async () => {
const paths = allDocs
.filter((doc) => doc.published !== false)
.map((doc) => ({
params: { slug: doc.slug.split(’/’) },
}));

return {
paths,
fallback: false,
};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
const slug = (params?.slug as string[])?.join(’/’) || ‘’;
const doc = allDocs.find((doc) => doc.slug === slug);

if (!doc || doc.published === false) {
return {
notFound: true,
};
}

return {
props: {
doc,
},
};
};
