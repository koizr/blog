import Link from "next/link";
import styles from "./layout.module.scss";
import { Head } from "@/components/Head";
import { title as blogTitle, description as blogDescription } from "@/profile";

type Props = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};

export const Layout = ({
  title,
  description,
  children,
}: Props): JSX.Element => (
  <div className={styles.page}>
    <Head
      title={title ? `${title} | ${blogTitle}` : blogTitle}
      description={description ?? blogDescription}
    />
    <header className={styles.header}>
      <div className={styles.blogTitle}>
        <Link href="/">
          <a className={styles.blogTitleText}>{blogTitle}</a>
        </Link>
      </div>
    </header>
    <main className={styles.content}>{children}</main>
    <footer className={styles.footer}>
      <div className={styles.footerLeft}>&copy;2020 koizr</div>
      <div className={styles.footerRight}>
        <span>Powered by </span>
        <a href="https://nextjs.org/">Next.js</a>
        <span>&nbsp;&amp;&nbsp;</span>
        <a href="https://vercel.com/">Vercel</a>
      </div>
    </footer>
  </div>
);
