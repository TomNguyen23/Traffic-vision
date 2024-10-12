import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { LicensePlateSearch } from "@/pages/Tables/licensePlate.reducer";
import { logoutSuccess } from "@/pages/auth/auth.reducer";

const Navbar = () => {
    const { toast } = useToast()
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const location = useLocation();
    const user = useSelector(state => state.auth.user);

    const onSearchChange = (value) => {
        const historyPage = location.pathname === '/violations' || location.pathname === '/admin/violation-history' || location.pathname === '/';
        if (!historyPage) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "You must find license plate in Violation history Page.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
            return;
        }
        else{
            dispatch(LicensePlateSearch(value));
        }
    }

    const logoutHandler = () => {
        dispatch(logoutSuccess());
        navigateTo('/');
    }

    return ( 
        <nav className="flex flex-wrap justify-between items-start px-12 py-7 bg-[#0284c7] h-60">
            <h1 className="uppercase font-semibold text-sm text-white">dashboard</h1>

            <div className="flex">
                <Input type="text" placeholder="Tìm biển số xe..." onChange={e => onSearchChange(e.target.value)} />
                
                {user && (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="ml-5">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Admin</DropdownMenuLabel>
                            
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={logoutHandler}>Đăng xuất</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}

            </div>
        </nav>
     );
}
 
export default Navbar;