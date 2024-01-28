import Head from "next/head";
import styles from "../styles/homeNoAuth.module.scss" 
import { GetStaticProps } from "next";
import { ReactNode, useEffect } from "react";
import PresentationSection from "@/components/homeNoAuth/presentationSection";
import HeaderNoAuth from "@/components/homeNoAuth/headerNoAuth";
import CardsSection from "@/components/homeNoAuth/cardsSection";
import Slidesection from "@/components/homeNoAuth/slideSection";
import courseService, { CourseType } from "@/services/courseService";
import Footer from "@/components/common/footer";
import AOS from "aos";
import "aos/dist/aos.css";



interface IndexPageProps {
  children?: ReactNode;
  course: CourseType[];
}



export default function Home({ course }: IndexPageProps) {
    
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
			<Head>
        <link rel="shortcut icon" href="/homeNoAuth/logoCta.png" type="image/x-icon" />
        <title>CursosFlix</title>
				<meta property="og:title" content="CursosFlix" key="title" />
				<meta name="description" content="Tenha acesso aos melhores conteúdos sobre programação de uma forma simples e fácil."/>
      </Head>
      <main>
        <div className={styles.sectionBackground} data-aos="fade-zoom-in" data-aos-duration="1600">
          <HeaderNoAuth />
          <PresentationSection />
        </div>
        <div data-aos="fade-right" data-aos-duration="1200">
          <CardsSection />
        </div>
        <div data-aos="fade-up" data-aos-duration="1350">
          <Slidesection newestCourses={course} />
        </div>
        <Footer />
      </main>
		</>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await courseService.getNewestCourses();
  return {
    props: {
      course: res.data,
    },
    revalidate: 3600 * 24,
  };
};
