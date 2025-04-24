import { format } from "date-fns";
import { ru } from "date-fns/locale";

export const formatDate = (date) =>
  format(new Date(date), "d MMMM yyyy", { locale: ru });
