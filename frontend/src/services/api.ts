import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333'
});

export async function getTasks() {
  const response = await api.get('/tasks');
  return response.data;
}

export async function createTask(title: string, description: string) {
  const response = await api.post('/tasks', { title, description });
  return response.data;
}

export async function deleteTask(id: number) {
  await api.delete(`/tasks/${id}`);
}

export async function updateTask(id: number, title: string, description: string) {
  const response = await api.put(`/tasks/${id}`, { title, description });
  return response.data;
}