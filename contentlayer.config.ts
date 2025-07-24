import { defineDocumentType, makeSource } from ‘contentlayer/source-files’;
import rehypeSlug from ‘rehype-slug’;
import rehypeHighlight from ‘rehype-highlight’;
import remarkGfm from ‘remark-gfm’;

export const Doc = defineDocumentType(() => ({
name: ‘Doc’,
filePathPattern: `docs/**/*.mdx`,
contentType: ‘mdx’,
fields: {
title: {
type: ‘string’,
required: true,
description: ‘The title of the document’
},
description: {
type: ‘string’,
required: false,
description: ‘Brief description of the document’
},
date: {
type: ‘date’,
required: false,
description: ‘Date the document was created or last updated’
},
published: {
type: ‘boolean’,
default: true,
description: ‘Whether the document should be published’
},
tags: {
type: ‘list’,
of: { type: ‘string’ },
required: false,
description: ‘Tags for categorizing documents’
},
},
computedFields: {
url: {
type: ‘string’,
resolve: (doc) => `/docs/${doc._raw.flattenedPath.replace('docs/', '')}`,
},
slug: {
type: ‘string’,
resolve: (doc) => doc._raw.flattenedPath.replace(‘docs/’, ‘’),
},
},
}));

export default makeSource({
contentDirPath: ‘content’,
documentTypes: [Doc],
mdx: {
remarkPlugins: [remarkGfm],
rehypePlugins: [rehypeSlug, rehypeHighlight],
},
onSuccess: async (importData) => {
console.log(‘✅ Contentlayer build succeeded’);
},
onUnknownDocuments: ‘skip-warn’,
});
