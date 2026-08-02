import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import styles from "../Dashboard.module.css";

function TaskPriorityChart({ tasks = [] }) {
  const data = [
    {
      name: "High",
      value: tasks.filter(
        (task) => task.priority === "high"
      ).length,
    },

    {
      name: "Medium",
      value: tasks.filter(
        (task) => task.priority === "medium"
      ).length,
    },

    {
      name: "Low",
      value: tasks.filter(
        (task) => task.priority === "low"
      ).length,
    },
  ];

  const COLORS = [
    "#ef4444",
    "#f59e0b",
    "#22c55e",
  ];

  return (
    <section className={styles.chartCard}>
      <h2>Tasks by Priority</h2>

      <p className={styles.chartSubtitle}>
        Distribution of task priorities
      </p>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="72%"
              innerRadius="42%"
              label
            >
              {data.map(
                (entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                )
              )}
            </Pie>

            <Tooltip />

            <Legend
              verticalAlign="bottom"
              height={36}
              iconSize={10}
              wrapperStyle={{ fontSize: 12 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default TaskPriorityChart;