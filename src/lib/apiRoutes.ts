const apiRoutes = {
  admin: {
    dashboard: "/admin/dashboard",
    projects: "/admin/projects",
    projectById: (id: string | number) => `/admin/projects/${id}`, // dynamic
    analytics: "/admin/analytics",
    settings: "/admin/settings",
  },
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    me: "/auth/me",
  },
};

export default apiRoutes;
