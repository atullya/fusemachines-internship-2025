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
interface RegisterUserData {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterUserData>({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    try {
      const userData = await apiService.register(formData);
      console.log(userData);
      if (userData.success) {
        alert("Register Successfull");
        setErrorMessage("");
        navigate("/login");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Sign-in failed. Please try again.");
      console.log(error.message);
    }
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign-in to your account</CardTitle>
        <CardDescription>Enter your details below to register</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={formData.username}
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="johndoe@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="text"
                placeholder="9*********"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {errorMessage && <h1>{errorMessage}</h1>}
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full ">
              Signup
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
