import React from "react";
import { Link } from "react-router-dom";
import errorImage from "../../images/error.png";
import styles from "./error-page.module.css";

// интерфейс для страницы с ошибкой
interface ErrorPageProps {
  extraClass?: string;
}

// определение функционального компонента
export const ErrorPage: React.FC<ErrorPageProps> = ({ extraClass = "" }) => {
  // возвращает разметку страницу с ошибкой
  return (
    <main className={`${styles.content} ${extraClass}`}>
      <div className={styles.box}>
        <div className={styles.wrap}>
          <img src={errorImage} className={styles.image} alt="Грустный смайлик" />
          <h1 className={`text text_type_h2 ${styles.title}`}>
            Упс! Похоже, страницу, которую ты ищешь, не существует.
          </h1>
        </div>
        <Link className={`text text_type_h3 ${styles.link}`} to="/">Вернуться на главную</Link>
      </div>
    </main>
  );
};
