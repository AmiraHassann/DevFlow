import { useEffect, useState } from "react";

import styles from "../Dashboard.module.css";

function QuoteOfTheDay() {
  const [quote, setQuote] =
    useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch(
          "https://api.quotable.io/random"
        );

        const data =
          await response.json();

        setQuote(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuote();
  }, []);

  return (
    <section className={styles.quoteCard}>
      <h2>Quote of the Day</h2>

      <p className={styles.cardSubtitle}>
        A little inspiration for your day.
      </p>

      {quote ? (
        <>
          <blockquote
            className={styles.quoteText}
          >
            "{quote.content}"
          </blockquote>

          <span
            className={styles.quoteAuthor}
          >
            — {quote.author}
          </span>
        </>
      ) : (
        <p className={styles.quoteLoading}>
          Loading quote...
        </p>
      )}
    </section>
  );
}

export default QuoteOfTheDay;