/* eslint-disable no-unused-vars */
import { Box, Button, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";

const ProjectInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Box>
      <Button onClick={handleToggle} variant="contained" color="primary">
        О проекте
      </Button>

      {/* Motion Box для анимации */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }} // начальное состояние (невидимый, немного смещён вверх)
          animate={{ opacity: 1, y: 0 }} // анимация (полностью видимый, на месте)
          exit={{ opacity: 0, y: 20 }} // когда блок исчезает (невидимый, смещён вниз)
          transition={{ duration: 0.5 }} // продолжительность анимации
        >
          <Box
            mb={3}
            p={2}
            border="1px solid"
            borderColor={theme.palette.divider}
            borderRadius={2}
            bgcolor={theme.palette.background.paper}
          >
            <Typography variant="h6" gutterBottom>
              О проекте
            </Typography>

            <Typography variant="body2" color="textSecondary">
              Это приложение "Личный TODO / Task Manager", разработанное на
              React с использованием Vite. В нём реализованы:
            </Typography>

            <Box component="ul" sx={{ pl: 3, mt: 1 }}>
              <li>Добавление, редактирование и удаление задач</li>
              <li>Отметка выполнения</li>
              <li>Фильтрация: все / выполненные / невыполненные</li>
              <li>Возможность добавление к задаче deadline</li>
              <li>При наличии deadline у задачи, сортировка по дате</li>
              <li>Drag & Drop сортировка задач</li>
              <li>Хранение задач в localStorage</li>
              <li>Темная/светлая тема с сохранением</li>
              <li>Анимации через Framer Motion</li>
              <li>
                Использование библиотеки nanoid для генерации уникальных ID
              </li>
            </Box>

            <Typography variant="body2" color="textSecondary" mt={2}>
              Используемые технологии: React, Vite, Material UI, Framer Motion,
              LocalStorage, Date-fns.
            </Typography>
          </Box>
        </motion.div>
      )}
    </Box>
  );
};

export default ProjectInfo;
