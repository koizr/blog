import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";
import { StaticPaths } from "@/types";

/**
 * 記事を配置するディレクトリパス
 */
const postsDirectory = path.join(process.cwd(), "posts");

/**
 * md ファイルの先頭につける
 * ---
 * title: foo
 * data: 2020-01-01
 * ---
 * みたいなやつ
 */
export type FrontMatter = {
  title: string;
  date: string;
  tags?: string;
};

/**
 * 投稿概要
 */
export type PostSummary = {
  id: string;
  title: string;
  date: string;
  tags: string[];
};

/**
 * 投稿
 */
export type Post = PostSummary & {
  contentHtml: string;
};

const splitTagString = (tagString: string): string[] =>
  Array.from(new Set(tagString.split(",").map((tag) => tag.trim())));

const splitMatterDataTags = (
  matterData: FrontMatter
): { title: string; date: string; tags: string[] } => ({
  ...matterData,
  tags: matterData.tags ? splitTagString(matterData.tags) : [],
});

/**
 * ソート済みの投稿を返す
 */
export const getSortedPostsData = (): PostSummary[] => {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsDate = fileNames
    .filter((fileName) => /\.md$/.test(fileName))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fileContents = fs.readFileSync(
        path.join(postsDirectory, fileName),
        "utf8"
      );
      const matterData = matter(fileContents).data as FrontMatter;
      return {
        id,
        ...splitMatterDataTags(matterData),
      };
    });
  return allPostsDate.sort((a, b) => (a.date < b.date ? 1 : -1));
};

export type PostId = {
  id: string;
};

/**
 * 投稿の ID 一覧を返す
 */
export const getAllPostIds = (): StaticPaths<PostId>[] => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, ""),
    },
  }));
};

/**
 * 指定された ID の投稿を返す
 * @param id 投稿 ID
 */
export const getPostData = async (id: string): Promise<Post> => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  const matterData = matterResult.data as FrontMatter;
  return {
    id,
    contentHtml,
    ...splitMatterDataTags(matterData),
  };
};