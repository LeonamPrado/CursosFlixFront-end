import HeaderAuth from "@/components/common/headerAuth";
import styles from "../styles/search.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import courseService, { CourseType } from "@/services/courseService";
import { useEffect, useState } from "react";
import { Container } from "reactstrap";
import SearchCard from "@/components/searchCard";
import Footer from "@/components/common/footer";
import PageSpinner from "@/components/common/spinner";

const Search = function () {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const searchName: any = router.query.name;
  const [searchResult, setSearchResult] = useState<CourseType[]>([]);
  useEffect(() => {
    searchCourses();
  }, [searchName]);

  const searchCourses = async function () {
    const res = await courseService.getSearch(searchName);
    setSearchResult(res.data.courses);
  };

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
        <title>CursosFlix - {searchName}</title>
        <link rel="shortcut icon" href="/homeNoAuth/logoCta.png" type="image/x-icon" />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <HeaderAuth />
        </div>
        {searchResult.length >= 1 ? (
          <div className={styles.searchResult}>
            <Container className="d-flex flex-wrap justify-content-center gap-5 py-4">
              {searchResult?.map((course) => (
                <SearchCard key={course.id} course={course} />
              ))}
            </Container>
          </div>
        ) : (
          <div className={styles.searchResult}>
            <p className={styles.noSearchText}>Nenhum resultado encontrado!</p>
          </div>
        )}
        <div className={styles.footer}>
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Search;
