function Card({ children, className = "" }) {
    return (
        <div className={` bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-8 ${className} `}>
            {children}
        </div>
    );
}

export default Card;