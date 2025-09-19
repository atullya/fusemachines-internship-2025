import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiService } from "@/services/apiServices";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  interface LoginFormData {
    email: string;
    password: string;
  }
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      console.log(formData);
      const resData = await apiService.login(formData.email, formData.password);
      console.log(resData);
      if (resData.success) {
        navigate("/welcome");
        setErrorMessage("");
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      console.log(error);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                onChange={handleChange}
                value={formData.email}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                required
              />
            </div>
          </div>
          {errorMessage && <h1 className="text-red-900">{errorMessage}</h1>}
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
