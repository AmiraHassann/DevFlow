import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";

import styles from "../Settings.module.css";

function ProfileSection({
  name,
  setName,
  email,
  setEmail,
  handleSaveChanges,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.profileHeader}>
        <div className={styles.avatar}>
          {name
            ? name
                .split(" ")
                .map(
                  (word) => word[0]
                )
                .join("")
                .slice(0, 2)
                .toUpperCase()
            : "U"}
        </div>

        <div>
          <h2>Profile Settings</h2>

          <p>
            Manage your personal
            information.
          </p>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Full Name</label>

        <Input
          placeholder="Enter your name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />
      </div>

      <div className={styles.formGroup}>
        <label>Email Address</label>

        <Input
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />
      </div>

      <div className={styles.actions}>
        <Button
          onClick={handleSaveChanges}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}

export default ProfileSection;