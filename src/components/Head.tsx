import NextHead from "next/head";

export const Head = ({ title }: { title: string }): JSX.Element => (
  <NextHead>
    <meta charSet="UTF-8"></meta>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    ></meta>
    <title>{title}</title>
    {/* <link rel="icon" href="/favicon.ico" /> */}
    <link rel="stylesheet" href="/prism.css" />
  </NextHead>
);
