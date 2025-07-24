import { allPages } from '.contentlayer/generated';
import { notFound } from 'next/navigation';
import { useMDXComponent } from 'next-contentlayer/hooks';

export async function generateStaticParams() {
  return allPages.map((page) => ({ slug: page.slug.slice(1) }));
}

export default function Page({ params }) {
  const page = allPages.find((p) => p.slug === `/${params.slug}`);
  if (!page) return notFound();
  const MDXContent = useMDXComponent(page.body.code);
  return (
    <article>
      <h1>{page.title}</h1>
      <MDXContent />
    </article>
  );
}
