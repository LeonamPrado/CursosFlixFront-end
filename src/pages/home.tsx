import Footer from "@/components/common/footer";
import HeaderAuth from "@/components/common/headerAuth";
import PageSpinner from "@/components/common/spinner";
import FavoritesCourses from "@/components/homeAuth/favoriteCategory";
import FeaturedCategory from "@/components/homeAuth/featuredCategory";
import FeaturedSection from "@/components/homeAuth/featuresSection";
import ListCategories from "@/components/homeAuth/listCategory";
import NewestCategory from "@/components/homeAuth/newestCategory";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const HomeAuth = function () {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
useEffect(() => {
  if (!sessionStorage.getItem("onebitflix-token")) {
    router.push("/login");
  } else {
    setLoading(false);
  }
}, []);
if (loading) {
	return <PageSpinner />;
}
  return (
    <>
			<Head>
        <title>CursosFlix - Home</title>
        <link rel="shortcut icon" href="/homeNoAuth/logoCta.png" type="image/x-icon" />
      </Head>
      <main>
        <FeaturedSection/>
        <NewestCategory/>
        <FavoritesCourses/>
        <FeaturedCategory/>
        <ListCategories/>
        <Footer />
      </main>
    </>
  );
};

export default HomeAuth;