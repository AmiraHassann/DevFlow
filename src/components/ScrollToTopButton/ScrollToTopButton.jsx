import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

import styles from "./ScrollToTopButton.module.css";

function ScrollToTopButton() {
  const [visible, setVisible] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(
        window.scrollY > 300
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      className={styles.scrollButton}
      onClick={scrollToTop}
    >
      <ChevronUp size={22} />
    </button>
  );
}

export default ScrollToTopButton;