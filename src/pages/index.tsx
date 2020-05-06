import { GetStaticProps } from "next";
import Link from "next/link";
import { Layout } from "@/components/Layout";
import { getSortedPostsData, PostSummary } from "@/posts";

type Props = {
  allPostsData: PostSummary[];
};

export default function Home({ allPostsData }: Props): JSX.Element {
  return (
    <Layout>
      <h1>Blog</h1>
      <ul>
        {allPostsData.map(({ id, title, date, tags }) => (
          <li key={id}>
            <Link href="/posts/[id]" as={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
