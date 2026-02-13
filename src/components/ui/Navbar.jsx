import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "../../context/AuthContext"
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const {user, logout} = useAuth()
  return (
    <div className="fixed w-full">

    <nav className=" flex w-full justify-between items-center h-14 p-5 border-b bg-background">
      <Link to="#" className="text-3xl text-primary font-extrabold">Quiz<span className="text-accent">Dot</span></Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button  className="mr-10 hover:bg-secondary p-2 rounded-lg transition-all cursor-pointer text-md">
            <PersonIcon className="mr-2 text-black"/> {user?.username}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
          <DropdownMenuItem variant="ghost" className='hover:bg-background transition-all text-destructive' onClick={logout}><LogoutIcon className="text-destructive mr-2"/>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
    </div>
  )
}

export default Navbar