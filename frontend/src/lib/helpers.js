// get intial letters of the user logged in( for userdropdown)
export function getInitials(user) {
  if (!user) return "U";

  const first = user.firstName[0];
  const last = user.lastName[0];

  if (first && last) {
    return (first + last).toUpperCase();
  }

  return user.email[0].toUpperCase() || "U";
}
