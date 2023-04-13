import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Required meta tags */}
          <link rel="shortcut icon" href="/favicon.png" />
          <meta charSet="utf-8" />
          {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Better Mart - Online Shopping for Everyday Needs</title> */}
          <meta name="description" content="Better Mart is an online marketplace for everyday essentials, with a focus on sustainability and ethical sourcing. Shop now for groceries, household items, personal care products, and more." />
          <meta name="keywords" content="better mart, online shopping, sustainability, ethical sourcing, groceries, household items, personal care, eco-friendly" />
          <meta name="author" content="Better Mart" />
          <meta name="robots" content="index, follow" />

          {/* OpenGraph meta tags for social media */}
          <meta property="og:title" content="Better Mart - Online Shopping for Everyday Needs" />
          <meta property="og:description" content="Better Mart is an online marketplace for everyday essentials, with a focus on sustainability and ethical sourcing. Shop now for groceries, household items, personal care products, and more." />
          <meta property="og:image" content="https://better-mart.netlify.app/images/og-image.jpg" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://better-mart.netlify.app/" />

          {/* Twitter Card meta tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Better Mart - Online Shopping for Everyday Needs" />
          <meta name="twitter:description" content="Better Mart is an online marketplace for everyday essentials, with a focus on sustainability and ethical sourcing. Shop now for groceries, household items, personal care products, and more." />
          <meta name="twitter:image" content="https://better-mart.netlify.app/images/twitter-image.jpg" />

          {/* Google Analytics */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID" />
         
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
