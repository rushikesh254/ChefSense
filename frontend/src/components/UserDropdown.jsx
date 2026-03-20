import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AuthContext } from '@/context/AuthContext'
import { getInitials } from '@/lib/utils'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

function UserDropdown() {
  const { user } = useContext(AuthContext)
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
