import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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

    const hasCode = formData.code.trim().length > 0;
    const hasFile = Boolean(formData.file);

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
                return toast.error("Please select a project.");
            }
            if (!formData.file && !formData.code.trim()) {
                return toast.error("Paste code or upload a file.");
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
                code: formData.code,
            });
            toast.success("Review created successfully.");
            navigate("/reviews");
        } catch (error) {
            toast.error(
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

          {!loading && projects.length === 0 && (
            <Card>
              <div className="py-12 text-center">
                <div className="text-6xl mb-4">📁</div>
                <h2 className="text-2xl font-bold text-white">
                  No Projects Found
                </h2>
                <p className="mt-3 text-slate-400">
                  Create your first project before generating an AI code review.
                </p>
                <Link
                  to="/projects"
                  className="inline-block mt-8 rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
                >
                  Go to Projects
                </Link>
              </div>
            </Card>
          )}
          {projects.length > 0 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-white">Project</label>
                <select
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleChange}
                  className="w-full mt-2 rounded-lg bg-slate-800 border border-slate-700 p-3 text-white"
                >
                  <option value="">Select Project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-white">Review Type</label>
                <select
                  name="reviewType"
                  value={formData.reviewType}
                  onChange={handleChange}
                  className="w-full mt-2 rounded-lg bg-slate-800 border border-slate-700 p-3 text-white"
                >
                  {REVIEW_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-white">Language</label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full mt-2 rounded-lg bg-slate-800 border border-slate-700 p-3 text-white"
                >
                  {LANGUAGES.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-white">Paste Code</label>
                <textarea
                  name="code"
                  rows="12"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder={`${hasFile ? "Cannot access.. File uploaded" : "Paste your source code here..."}`}
                  className="w-full mt-2 rounded-lg bg-slate-800 border border-slate-700 p-4 text-white"
                  disabled={hasFile}
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="source-file"
                  className={`mt-2 flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 cursor-pointer transition
                ${
                  hasCode
                    ? "border-gray-700 bg-gray-800 text-gray-500 cursor-not-allowed"
                    : "border-cyan-500 hover:border-cyan-400 hover:bg-slate-800 text-white"
                }`}
                >
                  <span className="text-3xl">📄</span>
                  <span className="mt-2 font-semibold">Choose Source File</span>
                  <span className="text-sm text-gray-400">
                    Click to upload your source code
                  </span>
                </label>
                <input
                  id="source-file"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={hasCode}
                />
                {formData.file && (
                  <div className="mt-3 rounded-lg bg-slate-800 p-3 flex justify-between items-center">
                  <span className="text-green-400">
                      ✓ {formData.file.name}
                  </span>

                  <button
                      type="button"
                      onClick={() =>
                          setFormData(prev => ({
                              ...prev,
                              file: null,
                          }))
                      }
                      className="text-red-400 hover:text-red-300"
                    >
                        Remove
                    </button>
                </div>
                )}
              </div>

              <Button type="submit">Analyze Code</Button>
            </form>
          )}
        </Card>
      </div>
    );
}

export default Review;