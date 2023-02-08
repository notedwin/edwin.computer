
import Navbar from "../components/navbar";

import { library, config, dom } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

// import hero
import Hero from "../components/hero";
import Posts from "../components/posts";
import Head from "next/head";
import Meta from "../components/meta";

import { getAllPosts } from "../lib/api";
library.add(fas, fab);
config.autoAddCss = false;

export default function home({ allPosts }) {
  var base64img = "data:image/png;base64,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";
  return (
    <>
      <Meta />
      <main>
        <Head>
          <title>Edwin's Blog</title>
          <link rel="icon" href="/logo.svg" />
          <style>{dom.css()}</style>
        </Head>
        <Navbar />
        <section id="visual">
        <div id="cube">
          <img
            className="face-0"
            alt="Cube Face Top"
            src={base64img}
            width="768"
            height="768"
          />
          <img
            className="face-1"
            alt="Cube Face Front"
            src={base64img}
            width="768"
            height="768"
          />
          <img
            className="face-2"
            alt="Cube Face Right"
            src={base64img}
            width="768"
            height="768"
          />
          <img
            className="face-3"
            alt="Cube Face Back"
            src={base64img}
            width="768"
            height="768"
          />
          <img
            className="face-4"
            alt="Cube Face Left"
            src={base64img}
            width="768"
            height="768"
          />
          <img
            className="face-5"
            alt="Cube Face Bottom"
            src={base64img}
            width="768"
            height="768"
          />
        </div>
      </section>
        <Hero />
        <div>
          <>{allPosts.length > 0 && <Posts posts={allPosts} />}</>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts(["title", "date", "slug", "image", "excerpt"]);

  return {
    props: { allPosts },
  };
}
