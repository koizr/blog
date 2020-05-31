import NextHead from "next/head";

export const Head = ({
  title,
  description,
}: {
  title: string;
  description: string;
}): JSX.Element => (
  <NextHead>
    <meta charSet="UTF-8"></meta>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    ></meta>
    <meta name="description" content={description}></meta>
    <title>{title}</title>
    {/* <link rel="icon" href="/favicon.ico" /> */}
  </NextHead>
);
