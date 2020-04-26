import Head from "next/head";
import Link from "next/link";
import styles from "./layout.module.scss";
import { title } from "@/profile";

export const Layout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => (
  <div>
    <Head>
      <title>{title}</title>
      {/* <link rel="icon" href="/favicon.ico" /> */}
    </Head>
    <header>
      <div className={styles.headerTitle}>{title}</div>
    </header>
    <main>{children}</main>
    <footer></footer>
  </div>
);
