import { useEffect, useState } from "react";

import Card from "../components/common/Card";
import Button from "../components/common/Button";

import ProjectCard from "../components/projects/ProjectCard";
import ProjectModal from "../components/projects/ProjectModal";

import { getProjects, createProject, deleteProject } from "../services/projectService";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const data = await getProjects();
            setProjects(data.projects);
        } catch (error) {
            alert("Unable to load projects.");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProject = async (projectData) => {
        try {
            await createProject(projectData);
            setShowModal(false);
            loadProjects();
            alert("Project created successfully.");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Unable to create project."
            );
        }
    };

    const handleDeleteProject = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmed) return;

        try {
            await deleteProject(id);
            loadProjects();
            alert("Project deleted successfully.");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Unable to delete project."
            );
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <h1 className="text-2xl text-slate-400">
                    Loading Projects...
                </h1>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-white">
                        Projects
                    </h1>
                    <p className="mt-2 text-slate-400">
                        Manage your AI code review projects.
                    </p>
                </div>
                <Button onClick={() => setShowModal(true)}>
                    + New Project
                </Button>
            </div>

            {projects.length === 0 ? (
                <Card>
                    <div className="py-16 text-center">
                        <div className="text-6xl mb-6">
                            📁
                        </div>
                        <h2 className="text-2xl font-bold text-white">
                            No Projects Yet
                        </h2>
                        <p className="mt-3 text-slate-400">
                            Create your first project to begin reviewing code.
                        </p>
                    </div>
                </Card>
            ) : (
                <div className="space-y-5">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} onDelete={handleDeleteProject} />
                    ))}
                </div>
            )}
            <ProjectModal isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={handleCreateProject} />
        </div>
    );
}

export default Projects;