import { Helmet } from 'react-helmet-async';

function Seo({
  title,
  description,
  image,
  url,
}: {
  readonly title: string;
  readonly description: string;
  readonly image?: string;
  readonly url?: string;
}) {
  const fullTitle = `${title} | Jubly`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name='description' content={description} />
      <meta property='og:title' content={fullTitle} />
      <meta property='og:description' content={description} />
      {image && <meta property='og:image' content={image} />}
      {url && <link rel='canonical' href={url} />}
    </Helmet>
  );
}

export default Seo;
