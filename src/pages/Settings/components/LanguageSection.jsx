import styles from "../Settings.module.css";

function LanguageSection({
  language,
  setLanguage,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>Language</h2>

        <p>
          Choose your preferred
          application language.
        </p>
      </div>

      <div className={styles.themeOptions}>
        <button
          type="button"
          className={`${styles.themeButton} ${
            language === "en"
              ? styles.activeTheme
              : ""
          }`}
          onClick={() =>
            setLanguage("en")
          }
        >
          🇺🇸 English
        </button>

        <button
          type="button"
          className={`${styles.themeButton} ${
            language === "ar"
              ? styles.activeTheme
              : ""
          }`}
          onClick={() =>
            setLanguage("ar")
          }
        >
          🇪🇬 Arabic
        </button>
      </div>
    </div>
  );
}

export default LanguageSection;