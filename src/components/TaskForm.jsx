import { Box, Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React from "react";

export default function TaskForm({
  task,
  setTask,
  deadline,
  setDeadline,
  onAdd,
}) {
  return (
    <Box display="flex" gap={2} mb={3}>
      <TextField
        fullWidth
        variant="outlined"
        label="Новая задача"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <DatePicker
        label="Дедлайн"
        value={deadline}
        onChange={(newVal) => setDeadline(newVal)}
        textField={(params) => <TextField {...params} />}
      />
      <Button variant="contained" onClick={onAdd}>
        Добавить
      </Button>
    </Box>
  );
}
