import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../components/common/Card";
import Button from "../components/common/Button";

import { getProjects } from "../services/projectService";
import { uploadFile } from "../services/uploadService";
import { createReview } from "../services/reviewService";

import { REVIEW_TYPES, LANGUAGES } from "../utils/constants";

function Review() {
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        projectId: "",
        reviewType: REVIEW_TYPES[0],
        language: LANGUAGES[0],
        code: "",
        file: null,
    });
    const [error, setError] = useState("");

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const data = await getProjects();
            setProjects(data.projects);
        } catch (error) {
            setError("Unable to load projects.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (event) => {
        setFormData({
            ...formData,
            file: event.target.files[0],
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!formData.projectId) {
                return alert("Please select a project.");
            }
            if (!formData.file && !formData.code.trim()) {
                return alert("Paste code or upload a file.");
            }
            if (formData.file) {
                const uploadData = new FormData();
                uploadData.append(
                    "file",
                    formData.file
                );

                uploadData.append(
                    "projectId",
                    formData.projectId
                );
                await uploadFile(uploadData);
            }
            await createReview({
                projectId: Number(formData.projectId),
                language: formData.language,
                reviewType: formData.reviewType,
            });
            alert("Review created successfully.");
            navigate("/reviews");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Unable to create review."
            );
        }
    };

    return (

    <div className="max-w-5xl mx-auto">
        <Card>
            <h1 className="text-3xl font-bold text-white mb-8">
                Start a New AI Code Review
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="text-white">
                    Project
                    </label>
                    <select name="projectId" value={formData.projectId} onChange={handleChange} className="w-full mt-2 rounded-lg bg-slate-800 border border-slate-700 p-3 text-white">
                        <option value="">
                            Select Project
                        </option>
                        {projects.map(project => (
                        <option key={project.id} value={project.id}>
                        {project.name}
                        </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="text-white">
                        Review Type
                    </label>
                    <select name="reviewType" value={formData.reviewType} onChange={handleChange} className="w-full mt-2 rounded-lg bg-slate-800 border border-slate-700 p-3 text-white">
                        {REVIEW_TYPES.map(type => (
                        <option key={type} value={type}>
                        {type}
                        </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="text-white">
                        Language
                    </label>
                    <select name="language" value={formData.language} onChange={handleChange} className="w-full mt-2 rounded-lg bg-slate-800 border border-slate-700 p-3 text-white">
                        {LANGUAGES.map(language => (
                        <option key={language} value={language}>
                        {language}
                        </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="text-white">
                        Paste Code
                    </label>
                    <textarea name="code" rows="12" value={formData.code} onChange={handleChange} placeholder="Paste your source code here..." className="w-full mt-2 rounded-lg bg-slate-800 border border-slate-700 p-4 text-white"></textarea>
                </div>

                <div>
                    <label className="text-white">
                        Upload Source File
                    </label>
                    <input type="file" onChange={handleFileChange} className="block mt-2 text-white" />
                    {formData.file && (
                    <p className="text-slate-400 mt-2">
                        Selected:
                        {" "}
                        {formData.file.name}
                    </p>
                    )}
                </div>

                <Button type="submit">
                Analyze Code
                </Button>
            </form>
        </Card>
    </div>
    );
}

export default Review;