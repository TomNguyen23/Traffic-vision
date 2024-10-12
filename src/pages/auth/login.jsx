import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

import { useDispatch } from "react-redux"
import { loginStart, loginSuccess, loginFailure } from "@/pages/auth/auth.reducer"

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { toast } = useToast()
    
    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(loginStart);

        if(!username || !password) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "You must enter your username and password to sign in.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
            return;
          } 
          else if (username !== "admin" || password !== "123") {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Your username or password is incorrect. Please try again.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })

            dispatch(loginFailure());
            return;
          } 
          else if (username === "admin" && password === "123") {
            // Khi đăng nhập thành công, mình sẽ lưu thông tin user vào store kèm với role của user
            const user = {
                username: username,
                password: password,
                role: "admin",
            };
            dispatch(loginSuccess(user));

            navigateTo("/admin/violation-history");
          }
    }

    return ( 
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-[350px] bg-[#e2e8f0]">
                <CardHeader>
                    <CardTitle className='text-center'>Sign in</CardTitle>
                    <CardDescription>Show that you are admin.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Username</Label>
                            <Input id="name" placeholder="Enter your username..." 
                                onChange={(e) => setUsername(e.target.value)} 
                            />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="pw">Password</Label>
                            <Input id="pw" placeholder="Enter your password..." 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-start">
                    <Button onClick={handleLogin}>Sign in</Button>
                </CardFooter>
            </Card>
        </div>
     );
}
 
export default Login;