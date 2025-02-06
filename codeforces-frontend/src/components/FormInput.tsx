import React, { useId } from "react";
import styles from "../styles/FormInput.module.css";
import useScreenSize from "../hooks/useScreenSize";

const FormInput: React.FC<{
  handleChange: any;
  label?: string;
  name: string;
  value: any;
  size?: "sm" | "lg";
  type: any;
  placeholder: string;
  error?: string;
}> = ({
  label,
  name,
  value,
  type,
  handleChange,
  placeholder,
  error,
  size = "lg",
}) => {
  const formInputId = useId();
  const screenSize = useScreenSize();

  const returnWidth = () => {
    if (type === "number") {
      return screenSize === "xs" || screenSize === "sm"
        ? "6vw"
        : screenSize === "md"
        ? "5vw"
        : screenSize === "lg"
        ? "4vw"
        : "3vw";
    } else {
      return screenSize === "xs" || screenSize === "sm"
        ? size === "sm"
          ? "32vw"
          : "50vw"
        : screenSize === "md"
        ? size === "sm"
          ? "24vw"
          : "46vw"
        : screenSize === "lg"
        ? size === "sm"
          ? "21vw"
          : "40vw"
        : size === "sm"
        ? "18vw"
        : "36vw";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}
    >
      {label && (
        <label
          style={{
            color: "#2F4F4F",
            fontWeight: 600,
            fontSize:
              screenSize === "xs" || screenSize === "sm"
                ? "12px"
                : screenSize === "md"
                ? "14px"
                : screenSize === "lg"
                ? "16px"
                : "18px",
          }}
          htmlFor={formInputId}
        >
          {label}
        </label>
      )}
      <input
        className={styles.FormInput}
        id={formInputId}
        name={name}
        type={type}
        style={{
          width: returnWidth(),
        }}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
      />
      {error && (
        <span
          style={{
            color: "#FF6F61",
            fontWeight: 600,
            fontSize:
              screenSize === "xs" || screenSize === "sm"
                ? "6px"
                : screenSize === "md"
                ? "8px"
                : screenSize === "lg"
                ? "10px"
                : "12px",
          }}
        >
          {error ? error : ""}
        </span>
      )}
    </div>
  );
};

export default FormInput;
