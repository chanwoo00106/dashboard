import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import AuthForm from "../components/AuthForm";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import styles from "../styles/Home.module.css";
import { useMe } from "../utils/hooks";

const Home: NextPage = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const { me } = useMe();

  useEffect(() => {
    if (me) {
      const isEmpty: boolean = Object.keys(me).length === 0;
      setLoggedIn(!isEmpty);
    }
  }, [me]);

  return (
    <div className={styles.container}>
      {loggedIn ? <CreatePost /> : <AuthForm />}
      <Post />

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
