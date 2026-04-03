import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/context/AuthContext";
import { getInitials } from "@/lib/helpers";
import { Link } from "react-router-dom";

function UserDropdown() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="relative">
      <Link to="/profile" className="relative h-10 w-10 rounded-full">
        <Avatar className="cursor-pointer bg-brand-600 text-white hover:opacity-90">
          <AvatarImage src={user.image} />
          <AvatarFallback className="bg-brand-600 text-white">
            {getInitials(user)}
          </AvatarFallback>
        </Avatar>
      </Link>
    </div>
  );
}

export default UserDropdown;
