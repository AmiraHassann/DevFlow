import styles from "./Input.module.css";

function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  onKeyDown,
  onBlur,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      className={styles.input}
    />
  );
}

export default Input;