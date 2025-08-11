import apiRoutes from "@/lib/apiRoutes";
import api from "@/lib/axios";

export async function getAllProjects() {
  return api.get(apiRoutes.admin.projects);
}

export async function createProject(data: object) {
  return api.post(apiRoutes.admin.projects, data);
}

export async function getProjectById(id: string | number) {
  return api.get(apiRoutes.admin.projectById(id));
}

export async function deleteProjectById(id: string | number) {
  return api.delete(apiRoutes.admin.projectById(id));
}
