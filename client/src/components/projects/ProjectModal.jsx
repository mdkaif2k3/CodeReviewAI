import { useEffect, useState } from "react";

function ProjectModal({ isOpen, onClose, onSubmit, initialData = null, loading = false }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setDescription(initialData.description || "");
        } else {
            setName("");
            setDescription("");
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim()) {
            return;
        }

        onSubmit({
            name: name.trim(),
            description: description.trim(),
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-lg rounded-xl bg-slate-900 border border-slate-700 p-6 shadow-xl">
                <h2 className="mb-6 text-2xl font-bold text-white">
                    Create Project
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            Project Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter project name"
                            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            Description
                        </label>
                        <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your project..." className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500 resize-none" />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={onClose} className="rounded-lg bg-slate-700 px-5 py-2 text-white transition hover:bg-slate-600">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
                            {loading ? "Creating..." : "Create Project"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProjectModal;