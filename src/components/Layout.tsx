import Link from "next/link";
import styles from "./layout.module.scss";
import { Head } from "@/components/Head";
import { title as blogTitle } from "@/profile";

type Props = {
  title?: string;
  children: React.ReactNode;
};

export const Layout = ({ title, children }: Props): JSX.Element => (
  <div>
    <Head title={title ? `${title} | ${blogTitle}` : blogTitle} />
    <header>
      <div className={styles.headerTitle}>
        <Link href="/">
          <a>{blogTitle}</a>
        </Link>
      </div>
    </header>
    <main>{children}</main>
    <footer></footer>
    <script src="/prism.js" async></script>
  </div>
);
