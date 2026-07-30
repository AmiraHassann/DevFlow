import { useState } from "react";

import { updateProfile } from "firebase/auth";

import { auth } from "../../../firebase/config";

import styles from "../Settings.module.css";

function ProfileSection({
  user,
  setUser,
  totalTasks,
  completedTasks,
  totalNotes,
}) {
  const [showModal, setShowModal] =
    useState(false);

  const [fullName, setFullName] =
    useState(
      user?.displayName || ""
    );

  const initials =
    user?.displayName
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const handleSaveProfile =
    async () => {
      try {
        await updateProfile(
          auth.currentUser,
          {
            displayName: fullName,
          }
        );

        setUser({
          ...auth.currentUser,
          displayName: fullName,
        });

        setShowModal(false);
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className={styles.card}>
      <div className={styles.profileCard}>
        <div className={styles.profileTop}>
          <div className={styles.profileInfo}>
            <div className={styles.avatar}>
              {initials}
            </div>

            <div>
              <h2
                className={
                  styles.profileName
                }
              >
                {user?.displayName ||
                  "DevFlow User"}
              </h2>

              <p
                className={
                  styles.profileEmail
                }
              >
                {user?.email}
              </p>
            </div>
          </div>

          <button
            className={
              styles.editProfileButton
            }
            onClick={() =>
              setShowModal(true)
            }
          >
            Edit Profile
          </button>
        </div>

        <div
          className={styles.divider}
        />

        <div className={styles.stats}>
          <div
            className={styles.statItem}
          >
            <span>
              📋 Total Tasks
            </span>

            <strong>
              {totalTasks}
            </strong>
          </div>

          <div
            className={styles.statItem}
          >
            <span>
              ✅ Completed Tasks
            </span>

            <strong>
              {completedTasks}
            </strong>
          </div>

          <div
            className={styles.statItem}
          >
            <span>
              📝 Total Notes
            </span>

            <strong>
              {totalNotes}
            </strong>
          </div>
        </div>

        <div
          className={styles.divider}
        />

        <div
          className={
            styles.accountStatus
          }
        >
          <span>
            Account Status
          </span>

          <strong>
            Authenticated ✅
          </strong>
        </div>
      </div>

      {showModal && (
        <div
          className={
            styles.modalOverlay
          }
        >
          <div
            className={styles.modal}
          >
            <h3>
              Edit Profile
            </h3>

            <div
              className={
                styles.formGroup
              }
            >
              <label>
                Full Name
              </label>

              <input
                type="text"
                value={fullName}
                onChange={(e) =>
                  setFullName(
                    e.target.value
                  )
                }
              />
            </div>

            <div
              className={
                styles.modalActions
              }
            >
              <button
                className={
                  styles.cancelButton
                }
                onClick={() =>
                  setShowModal(false)
                }
              >
                Cancel
              </button>

              <button
                className={
                  styles.confirmButton
                }
                onClick={
                  handleSaveProfile
                }
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileSection;