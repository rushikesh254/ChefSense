import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUser } from '@/context/AuthContext'
import { getInitials } from '@/lib/utils'
import { Link } from 'react-router-dom'

function UserDropdown() {
  const { user } = useUser()
  return (
    <div>
      <Link to="/profie" className="relative h-10 w-10 rounded-full">
        <Avatar className="cursor-pointer bg-brand-600 text-white">
          <AvatarImage src={user.image} />
          <AvatarFallback className="bg-brand-600 text-white">
            {getInitials(user)}
          </AvatarFallback>
        </Avatar>
      </Link>
    </div>
  )
}

export default UserDropdown
