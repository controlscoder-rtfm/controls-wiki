import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `**/*.md`,
  contentType: 'markdown',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Page],
});
