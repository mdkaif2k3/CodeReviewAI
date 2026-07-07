function Button({ children, type = "button", variant = "primary", loading = false, disabled = false, onClick, className = "", }) {
    const baseStyle = "w-full rounded-lg px-4 py-3 font-semibold transition-all duration-200";

    const variants = {
        primary:
            "bg-blue-600 hover:bg-blue-700 text-white",

        secondary:
            "bg-slate-700 hover:bg-slate-600 text-white",

        danger:
            "bg-red-600 hover:bg-red-700 text-white",

        success:
            "bg-green-600 hover:bg-green-700 text-white",
    };

    return (
        <button type={type} onClick={onClick} disabled={disabled || loading} className={`${baseStyle} ${variants[variant]} ${ disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer" } ${className}`}>
            {loading ? "Loading..." : children}
        </button>
    );
}

export default Button;