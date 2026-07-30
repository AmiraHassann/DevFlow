import { useState } from "react";
import { Link } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../../firebase/config";

import styles from "./Auth.module.css";

function Register() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert(
        "Account created successfully."
      );
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main className={styles.authPage}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h1>DevFlow</h1>

          <p>Create your account</p>
        </div>

        <div className={styles.formGroup}>
          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <div className={styles.formGroup}>
          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
        </div>

        <button
          className={styles.authButton}
          onClick={handleRegister}
        >
          Create Account
        </button>

        <p className={styles.authFooter}>
          Already have an account?{" "}
          <Link to="/login">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;