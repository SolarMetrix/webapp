import PropTypes from "prop-types";
import Head from "next/head";

function SEO(props: any) {
  const { url, title, description, image, schemaType } = props;

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <meta name="theme-color" content="#008f68" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.svg" />
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={image} />
      <title>{title}</title>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": schemaType,
            name: title,
            about: description,
            url: url,
          }),
        }}
      />
    </Head>
  );
}

SEO.defaultProps = {
  title: "Էլեկտրոնային գրքերի քո գրադարանը",
  description:
    "Track your solar panel performance from anywhere in the world with SolarMetrix solar monitoring service.",
  url: "https://localhost:3000",
  openGraphType: "website",
  schemaType: "Article",
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  openGraphType: PropTypes.string,
  schemaType: PropTypes.string,
};

export default SEO;
