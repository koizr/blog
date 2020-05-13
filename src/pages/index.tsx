import { GetStaticProps } from "next";
import Link from "next/link";
import { Layout } from "@/components/Layout";
import { getSortedPostsData, PostSummary } from "@/posts";
import { formatDate } from "@/filters";
import styles from "./index.module.scss";

type Props = {
  allPostsData: PostSummary[];
};

export default function Home({ allPostsData }: Props): JSX.Element {
  return (
    <Layout>
      <h1 className={styles.h1}>Posts</h1>
      <div className={styles.posts}>
        {allPostsData.map(({ id, title, date, tags }) => (
          <div className={styles.post} key={id}>
            <Link href="/posts/[id]" as={`/posts/${id}`}>
              <div>
                <div className={styles.postTitle}>{title}</div>
                <div className={styles.postDate}>{formatDate(date)}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
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
