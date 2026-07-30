import styles from "../Settings.module.css";

function AppearanceSection({
    theme,
    setTheme,
}) {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h2>Appearance</h2>

                <p>
                    Customize the look and feel of
                    the application.
                </p>
            </div>

            <div className={styles.themeOptions}>
                <button
                    type="button"
                    className={`${styles.themeButton} ${theme === "light"
                            ? styles.activeTheme
                            : ""
                        }`}
                    onClick={() =>
                        setTheme("light")
                    }
                >
                    ☀️ Light
                </button>

                <button
                    type="button"
                    className={`${styles.themeButton} ${theme === "dark"
                            ? styles.activeTheme
                            : ""
                        }`}
                    onClick={() =>
                        setTheme("dark")
                    }
                >
                    🌙 Dark
                </button>
            </div>
        </div>
    );
}

export default AppearanceSection;
