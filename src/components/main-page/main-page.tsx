import React from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import styles from "./main-page.module.css";

// интерфейс для главной страницы
interface MainPageProps {
  extraClass?: string;
}

// определение функционального компонента
export const MainPage: React.FC<MainPageProps> = ({ extraClass = "" }) => {
  return (
    <main className={`${styles.content} ${extraClass}`}>
      <div className={styles.titleBox}>
        <h1 className={`text text_type_h1 text_color_h1 ${styles.title}`}>
          МБОУ АЛГОСОШ
        </h1>
        <p
          className={`text text_type_fibonacci text_color_secondary ${styles.fibonacciTitle}`}
        >
          им. Фибоначчи
        </p>
      </div>
      <div className={styles.cardsBox}>
        <Link className={styles.link} to="/recursion">
          <div className={`${styles.card} ${styles.string}`} />
        </Link>
        <Link className={styles.link} to="/fibonacci">
          <div className={`${styles.card} ${styles.fibonacci}`} />
        </Link>
        <Link className={styles.link} to="/sorting">
          <div className={`${styles.card} ${styles.arr}`} />
        </Link>
        <Link className={styles.link} to="/stack">
          <div className={`${styles.card} ${styles.stack}`} />
        </Link>
        <Link className={styles.link} to="/queue">
          <div className={`${styles.card} ${styles.queue}`} />
        </Link>
        <Link className={styles.link} to="/list">
          <div className={`${styles.card} ${styles.list}`} />
        </Link>
      </div>
      <Marquee className={styles.ticker} gradient={false} speed={200}>
        <p
          className={`text text_type_ticker text_color_secondary ${styles.tickerText}`}
        >
          Вдохновлено школами, в которых не учили алгоритмам
        </p>
        <div className={styles.dotBox}>
          <p className={styles.dot} />
        </div>
      </Marquee>
      <p
        className={`text text_type_column text_color_input mt-14 ${styles.copyright}`}
      >
        © Сделано в Практикуме.
      </p>
    </main>
  );
};
