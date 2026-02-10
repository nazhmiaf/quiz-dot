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

const Navbar = () => {
  const {user, logout} = useAuth()
  return (
    <nav className="fixed flex w-full justify-between items-center h-14 p-5 border-b bg-background">
      <Link to="#" className="text-3xl text-primary font-extrabold">Quiz<span className="text-accent">Dot</span></Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className="mr-10 hover:bg-secondary text-md">
            <PersonIcon className="mr-2 text-black"/> {user?.username}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
          <DropdownMenuItem variant="ghost" className='' onClick={logout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}

export default Navbar