export function logActivity(
  action,
  title
) {
  const activities =
    JSON.parse(
      localStorage.getItem(
        "activities"
      )
    ) || [];

  const newActivity = {
    id: Date.now(),

    action,

    title,

    timestamp:
      new Date().toLocaleString(),
  };

  localStorage.setItem(
    "activities",
    JSON.stringify([
      newActivity,
      ...activities,
    ])
  );
}