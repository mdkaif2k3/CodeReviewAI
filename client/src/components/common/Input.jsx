function Input({ label, type = "text", placeholder, value, onChange, error, name }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-200">
                {label}
            </label>
            <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className={`rounded-lg border px-4 py-3 bg-slate-800 text-white outline-none transition-all ${ error ? "border-red-500" : "border-slate-600 focus:border-blue-500" }`} />
            {error && (
                <p className="text-sm text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
}

export default Input;