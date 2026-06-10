import api from "@/lib/api";

export const loginUser = async ({ email, password }) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

export const signupUser = async ({ firstName, lastName, email, password }) => {
  const { data } = await api.post("/auth/signup", {
    firstName,
    lastName,
    email,
    password,
  });
  return data;
};

export const logoutUser = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};

export const updateProfile = async ({ firstName, lastName }) => {
  const { data } = await api.put("/user/profile", { firstName, lastName });
  return data;
};

export const updatePassword = async ({ currentPassword, newPassword }) => {
  const { data } = await api.put("/user/password", {
    currentPassword,
    newPassword,
  });
  return data;
};

export const getUserUsage = async () => {
  const { data } = await api.get("/user/usage");
  return data;
};
