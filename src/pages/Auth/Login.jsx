import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  Eye,
  EyeOff,
} from "lucide-react";

import { auth } from "../../firebase/config";

import styles from "./Auth.module.css";
import Swal from "sweetalert2";

function Login() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(false);

  const navigate = useNavigate();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: "#1e293b",
    color: "#ffffff",
    iconColor: "#6366f1",
  });

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.fire({
        icon: "warning",
        title: "Please fill in all fields",
      });

      return;
    }

    try {
      setIsLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      Toast.fire({
        icon: "success",
        title: "Welcome Back 👋",
      });

      const startPage =
        localStorage.getItem(
          "startPage"
        ) || "dashboard";

      setTimeout(() => {
        navigate(`/${startPage}`);
      }, 1200);
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          Toast.fire({
            icon: "error",
            title: "User not found",
          });
          break;

        case "auth/wrong-password":
          Toast.fire({
            icon: "error",
            title: "Incorrect password",
          });
          break;

        case "auth/invalid-credential":
          Toast.fire({
            icon: "error",
            title:
              "Invalid email or password",
          });
          break;

        case "auth/invalid-email":
          Toast.fire({
            icon: "error",
            title: "Invalid email address",
          });
          break;

        default:
          Toast.fire({
            icon: "error",
            title: "Login failed",
          });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword =
    async () => {
      if (!email) {
        Toast.fire({
          icon: "warning",
          title:
            "Please enter your email first",
        });

        return;
      }

      try {
        await sendPasswordResetEmail(
          auth,
          email
        );

        Toast.fire({
          icon: "success",
          title:
            "Password reset email sent ✅",
        });
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            Toast.fire({
              icon: "error",
              title: "User not found",
            });
            break;

          case "auth/invalid-email":
            Toast.fire({
              icon: "error",
              title:
                "Invalid email address",
            });
            break;

          default:
            Toast.fire({
              icon: "error",
              title:
                "Failed to send reset email",
            });
        }
      }
    };

  return (
    <main className={styles.authPage}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h1>DevFlow</h1>

          <p>Welcome back</p>
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

          <div
            className={styles.passwordWrapper}
          >
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />

            <button
              type="button"
              className={
                styles.togglePassword
              }
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        <div className={styles.loginOptions}>
          <label
            className={
              styles.checkboxLabel
            }
          >
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) =>
                setRememberMe(
                  e.target.checked
                )
              }
            />

            Remember Me
          </label>

          <button
            type="button"
            className={
              styles.forgotPassword
            }
            onClick={
              handleForgotPassword
            }
          >
            Forgot Password?
          </button>
        </div>

        <button
          className={styles.authButton}
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading
            ? "Loading..."
            : "Sign In"}
        </button>

        <p className={styles.authFooter}>
          Don't have an account?{" "}
          <Link to="/register">
            Create Account
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;