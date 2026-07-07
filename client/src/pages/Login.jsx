import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Input from "../components/common/Input";

import useAuth from "../hooks/useAuth";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            await login(formData);

            navigate("/dashboard");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Login failed."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex justify-center items-center">
            <Card className="w-full max-w-md">
                <h1 className="text-3xl font-bold text-white text-center">
                    AI Code Review Assistant
                </h1>
                <p className="text-slate-400 text-center mt-2 mb-8">
                    Review your code using AI
                </p>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input label="Email" name="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                    <Input label="Password" name="password" type="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
                    {error && (
                        <p className="text-red-400">
                            {error}
                        </p>
                    )}
                    <Button type="submit" loading={loading}>
                        Login
                    </Button>
                </form>
                <p className="text-center text-slate-400 mt-6">
                    Don't have an account?
                    {" "}
                    <Link to="/register" className="text-blue-400 hover:text-blue-300">
                        Register
                    </Link>
                </p>
            </Card>
        </div>
    );
}

export default Login;