import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => (
  <Html lang="en" className="scroll-smooth">
    <Head>
      <link
        href="https://fonts.cdnfonts.com/css/circular-std?styles=17911,17907,17905&display=optional"
        rel="stylesheet"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap"
        rel="stylesheet"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <body className="bg-cultured font-urbanist">
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
