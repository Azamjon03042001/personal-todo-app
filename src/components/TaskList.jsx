// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  onDelete,
  onToggleComplete,
  onEdit,
}) {
  return (
    <div>
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TaskItem
              task={task}
              onDelete={() => onDelete(task.id)}
              onToggleComplete={() => onToggleComplete(task.id)}
              onEdit={(id, text) => onEdit(id, text)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
