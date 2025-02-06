import React from "react";
import styles from "../styles/Button.module.css";

const Button: React.FC<{
  handleClick?: any;
  handleFomSubmit?: any;
  text: string;
  isDisabled?: boolean;
  // size?: "sm" | "md" | "lg";
}> = ({
  text,
  handleClick,
  handleFomSubmit,
  isDisabled = false /*size = "lg" */,
}) => {
  return (
    <button
      className={`${styles.Button}`}
      formAction={() => {
        if (!isDisabled) {
          handleFomSubmit?.();
        }
      }}
      onClick={() => {
        if (!isDisabled) {
          handleClick?.();
        }
      }}
      style={
        {
          color: `${isDisabled ? "#A0AFAF" : "#2f4f4f"}`,
          "--background-stale-one": isDisabled ? "#6B726F" : "#a8e6cf",
          "--background-stale-two": isDisabled ? "#5F6D69" : "#82d7b2",
          "--background-hover-one": isDisabled ? "#5F6B68" : "#82d7b2",
          "--background-hover-two": isDisabled ? "#54635F" : "#5fc1a6",
        } as React.CSSProperties
      }
    >
      {text}
    </button>
  );
};

export default Button;
