import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import { nanoid } from "nanoid";
import React, { useCallback, useMemo, useState } from "react";
import ProjectInfo from "./components/ProjectInfo";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import { FILTERS } from "./utils/constants";

export default function App({ toggleTheme, mode }) {
  const [taskText, setTaskText] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [tasks, setTasks] = useLocalStorageState("tasks", []);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  const addTask = useCallback(() => {
    if (!taskText.trim()) return;
    setTasks((prev) => [
      ...prev,
      {
        id: nanoid(),
        text: taskText.trim(),
        completed: false,
        deadline: deadline ? deadline.toISOString() : "",
      },
    ]);
    setTaskText("");
    setDeadline(null);
  }, [taskText, deadline, setTasks]);

  const updateTask = useCallback(
    (id, changes) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...changes } : t))
      );
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id) => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    },
    [setTasks]
  );

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((t) => {
        if (filter === "completed") return t.completed;
        if (filter === "incomplete") return !t.completed;
        return true;
      })
      .sort((a, b) => {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        const dateA = new Date(a.deadline);
        const dateB = new Date(b.deadline);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
  }, [tasks, filter, sortOrder]);

  const toggleComplete = useCallback(
    (id) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    },
    [setTasks]
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Theme toggle */}
      <Box display="flex" justifyContent="space-between" mb={1}>
        <ProjectInfo />

        <IconButton
          onClick={toggleTheme}
          sx={{
            transform: mode === "dark" ? "rotate(180deg)" : "none",
            transition: "transform .3s",
          }}
        >
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>

      <Typography variant="h4" align="center" gutterBottom>
        Личный TODO / Task Manager
      </Typography>

      <TaskForm
        task={taskText}
        setTask={setTaskText}
        deadline={deadline}
        setDeadline={setDeadline}
        onAdd={addTask}
      />

      <Box display="flex" justifyContent="center" mb={2} gap={1}>
        {FILTERS.map((f) => (
          <Button
            key={f.key}
            variant={filter === f.key ? "contained" : "outlined"}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </Button>
        ))}
      </Box>

      <Box display="flex" justifyContent="center" mb={2} gap={1}>
        <Button
          onClick={() => setSortOrder("asc")}
          variant={sortOrder === "asc" ? "contained" : "text"}
        >
          По возрастанию
        </Button>
        <Button
          onClick={() => setSortOrder("desc")}
          variant={sortOrder === "desc" ? "contained" : "text"}
        >
          По убыванию
        </Button>
      </Box>

      {filteredTasks.length === 0 ? (
        <Typography align="center">Список задач пуст</Typography>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onDelete={deleteTask}
          onToggleComplete={toggleComplete}
          onEdit={(id, text) => updateTask(id, { text })}
        />
      )}
    </Container>
  );
}
