// Sort tasks in descending order of priority
export const sortTasksByPriority = (tasks) => {
  return tasks.sort((a, b) => b.priority - a.priority);
};

// Filter tasks based on search term
export const filterTasks = (tasks, searchTerm) => {
  if (!searchTerm) return tasks;
  return tasks.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()));
};
