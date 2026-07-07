import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Input from "../components/common/Input";

import useAuth from "../hooks/useAuth";

function Register() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleChange = (event) => {
            setFormData({
                ...formData,
                [event.target.name]: event.target.value,
            });
        };

        const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setLoading(true);
        try {
            await register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });
            navigate("/login");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Registration failed."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex justify-center items-center">
            <Card className="w-full max-w-md">
                <h1 className="text-3xl font-bold text-white text-center">
                Create Account
                </h1>
                <p className="text-slate-400 text-center mt-2 mb-8">
                Join AI Code Review Assistant
                </p>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input label="Name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" />
                    <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
                    <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter password" />
                    <Input label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" />

                    {error && (
                    <p className="text-red-400">
                    {error}
                    </p>
                    )}

                    <Button type="submit" loading={loading}>
                    Create Account
                    </Button>
                </form>

                <p className="text-center text-slate-400 mt-6">
                    Already have an account?
                    {" "}
                    <Link to="/login" className="text-blue-400 hover:text-blue-300">
                    Login
                    </Link>
                </p>
            </Card>
        </div>
    );
}

export default Register;