import { Tables } from '@/types/database.types';

const dateSorter = (a: Tables<'activity'>, b: Tables<'activity'>) => {
  const dateA = a.planned_date ? new Date(a.planned_date) : null;
  const dateB = b.planned_date ? new Date(b.planned_date) : null;

  if (dateA === null && dateB === null) {
    return 0; // Both dates are null, consider them equal
  }

  if (dateA === null) {
    return 1; // Null values come last
  }

  if (dateB === null) {
    return -1; // Null values come last
  }

  return dateA.getTime() - dateB.getTime(); // Compare non-null dates
};

export default dateSorter;
