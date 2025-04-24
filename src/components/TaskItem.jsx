import {
  Box,
  Button,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { formatDate } from "../utils/date";

export default function TaskItem({ task, onDelete, onToggleComplete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);

  const save = () => {
    const trimmed = text.trim();
    if (trimmed) onEdit(task.id, trimmed);
    setIsEditing(false);
  };

  return (
    <ListItem
      divider
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        mb: 1,
      }}
    >
      {isEditing ? (
        <Box display="flex" gap={1}>
          <TextField
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && save()}
            autoFocus
          />
          <Button onClick={save}>Сохранить</Button>
          <Button onClick={() => setIsEditing(false)}>Отменить</Button>
        </Box>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <ListItemText
            primary={task.text}
            sx={{
              textDecoration: task.completed ? "line-through" : "none",
              opacity: task.completed ? 0.5 : 1,
            }}
          />
          {task.deadline && (
            <Typography variant="body2" color="textSecondary">
              {formatDate(task.deadline)}
            </Typography>
          )}
          <Box>
            <Button onClick={onToggleComplete}>
              {task.completed ? "↩" : "✔"}
            </Button>
            <Button onClick={onDelete}>Удалить</Button>
            <Button onClick={() => setIsEditing(true)}>Редактировать</Button>
          </Box>
        </Box>
      )}
    </ListItem>
  );
}
