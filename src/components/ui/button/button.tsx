import React from "react";
import loaderIcon from "../../../images/icons/loader.svg";
import { Direction } from "../../../types/direction";
import { AscendingIcon } from "../icons/ascending-icon";
import { DescendingIcon } from "../icons/descending-icon";
import styles from "./button.module.css";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  text?: string;
  type?: "button" | "submit" | "reset";
  sorting?: Direction;
  linkedList?: "small" | "big";
  isLoader?: boolean | (() => boolean);
  extraClass?: string;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  extraClass = "",
  type = "button",
  isLoader = false,
  sorting,
  linkedList,
  disabled,
  ...rest
}) => {
  const currentIcon =
    sorting === Direction.Ascending ? <AscendingIcon /> : <DescendingIcon />;
    const isLoading = typeof isLoader === "function" ? isLoader() : isLoader;
  const className = `text text_type_button text_color_primary ${styles.button
    } ${linkedList && styles[linkedList]} ${isLoader && styles.loader
    } ${extraClass}`;

  return (
    <button
      className={className}
      type={type}
      disabled={isLoading || disabled}
      {...rest}
    >
      {isLoader ? (
        <img className={styles.loader_icon} src={loaderIcon} alt="Загрузка." />
      ) : (
        <>
          {sorting && currentIcon}
          <p className={`text ${sorting && "ml-5"}`}>{text}</p>
        </>
      )}
    </button>
  );
};
