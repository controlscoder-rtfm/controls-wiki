import { allPages } from 'contentlayer/generated';

export default function Home() {
  const page = allPages.find((p) => p.slug === '/index');
  return (
    <article>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.body.html }} />
    </article>
  );
}
