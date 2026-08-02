import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import styles from "../Dashboard.module.css";

function ProductivityChart({ tasks = [] }) {
  const weekData = [
    { day: "Sun", tasks: 0 },
    { day: "Mon", tasks: 0 },
    { day: "Tue", tasks: 0 },
    { day: "Wed", tasks: 0 },
    { day: "Thu", tasks: 0 },
    { day: "Fri", tasks: 0 },
    { day: "Sat", tasks: 0 },
  ];

  tasks.forEach((task) => {
    if (!task.createdAt) return;

    const date = new Date(task.createdAt);

    if (isNaN(date)) return;

    const dayIndex = date.getDay();

    weekData[dayIndex].tasks += 1;
  });

  return (
    <section className={styles.chartCard}>
      <h2>Productivity Overview</h2>

      <p className={styles.chartSubtitle}>
        Tasks created during the week
      </p>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <BarChart data={weekData}>
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="tasks"
              fill="var(--color-primary)"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default ProductivityChart;