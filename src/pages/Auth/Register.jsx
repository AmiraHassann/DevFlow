import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebase/config";

import styles from "./Auth.module.css";
import Swal from "sweetalert2";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] =
  useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

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

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Toast.fire({
        icon: "warning",
        title: "Please fill in all fields",
      });
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Toast.fire({
        icon: "error",
        title: "Please enter a valid email address",
      });
      return;
    }

    if (password.length < 6) {
      Toast.fire({
        icon: "error",
        title: "Password must be at least 6 characters",
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.fire({
        icon: "error",
        title: "Passwords do not match",
      });
      return;
    }

    try {
      setLoading(true);

     const userCredential =
  await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

await updateProfile(
  userCredential.user,
  {
    displayName: fullName,
  }
);

      await setDoc(
        doc(
          db,
          "users",
          userCredential.user.uid
        ),
        {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          createdAt: serverTimestamp(),
        }
      );

      Toast.fire({
        icon: "success",
        title: "Account created successfully 🚀",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          Toast.fire({
            icon: "warning",
            title: "This email is already registered",
          });
          break;

        case "auth/invalid-email":
          Toast.fire({
            icon: "error",
            title: "Invalid email address",
          });
          break;

        case "auth/weak-password":
          Toast.fire({
            icon: "error",
            title: "Password is too weak",
          });
          break;

        default:
          Toast.fire({
            icon: "error",
            title: "Something went wrong",
          });
      }
    } finally {
      setLoading(false);
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
  <label>Full Name</label>

  <input
    type="text"
    placeholder="Enter your full name"
    value={fullName}
    onChange={(e) =>
      setFullName(e.target.value)
    }
  />
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

          <div className={styles.passwordWrapper}>
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              type="button"
              className={styles.togglePassword}
              onClick={() =>
                setShowPassword(!showPassword)
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

        <div className={styles.formGroup}>
          <label>Confirm Password</label>

          <div className={styles.passwordWrapper}>
            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
            />

            <button
              type="button"
              className={styles.togglePassword}
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        <button
          className={styles.authButton}
          onClick={handleRegister}
          disabled={loading}
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
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