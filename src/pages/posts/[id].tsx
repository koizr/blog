import { Layout } from "@/components/Layout";
import {
  getAllPostIds,
  getPostData,
  PostId,
  Post as PostContent,
} from "@/posts";
import { GetStaticProps, GetStaticPaths } from "next";
import { StaticPaths } from "@/types";

export default function Post({
  postData,
}: {
  postData: PostContent;
}): JSX.Element {
  return (
    <Layout title={postData.title}>
      <article>
        <h1>{postData.title}</h1>
        <div>
          <div>{postData.date}</div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths<PostId> = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: StaticPaths<PostId>) => {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
};
