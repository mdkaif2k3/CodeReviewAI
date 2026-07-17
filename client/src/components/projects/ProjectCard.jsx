function ProjectCard({ project, onDelete }) {
    return (
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-sm transition-all duration-300 hover:border-blue-500 hover:shadow-lg">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">📁</span>
                        <h2 className="text-xl font-semibold text-white">
                            {project.name}
                        </h2>
                    </div>
                    <p className="mt-4 text-slate-400">
                        {project.description || "No description provided."}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-500">
                        <span>
                            Created:{" "}
                            {new Date(project.createdAt).toLocaleDateString()}
                        </span>
                        <span>
                            Updated:{" "}
                            {new Date(project.updatedAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
                <button onClick={() => onDelete(project.id)} className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700">
                    Delete
                </button>
            </div>
        </div>
    );
}

export default ProjectCard;