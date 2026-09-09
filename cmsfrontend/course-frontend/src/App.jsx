import React, { useEffect, useMemo, useState } from "react";
import CourseForm from "./components/CourseForm";
import CourseTable from "./components/CourseTable";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "./api/courses";
import "./App.css";

const emptyForm = {
  id: null,
  courseName: "",
  durationInHours: "",
  fee: "",
};

export default function App() {
  const [page, setPage] = useState("dashboard"); // dashboard | add | manage

  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const loadCourses = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getCourses();
      const rows = Array.isArray(data) ? data : data?.data || [];
      setCourses(
        rows.map((item) => ({
          id: item.id ?? item.Id,
          courseName: item.courseName ?? item.CourseName ?? "",
          durationInHours:
            item.durationInHours ??
            item.DurationInHours ??
            item.duration ??
            item.Duration ??
            "",
          fee: item.fee ?? item.Fee ?? "",
        }))
      );
    } catch (err) {
      setError(err.message || "Failed to load courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    const q = search.toLowerCase().trim();
    return courses.filter((course) =>
      `${course.courseName} ${course.durationInHours} ${course.fee}`
        .toLowerCase()
        .includes(q)
    );
  }, [courses, search]);

  const stats = useMemo(() => {
    const total = courses.length;
    const totalFee = courses.reduce((sum, c) => sum + (Number(c.fee) || 0), 0);
    const avgFee = total ? (totalFee / total).toFixed(2) : "0.00";

    return [
      { label: "Total Courses", value: total },
      { label: "Total Fee", value: totalFee.toFixed(2) },
      { label: "Average Fee", value: avgFee },
    ];
  }, [courses]);

  const resetForm = () => {
    setForm(emptyForm);
    setIsEditing(false);
    setFieldErrors({});
  };

  const openAddPage = () => {
    resetForm();
    setPage("add");
  };

  const handleEdit = (course) => {
    setForm({
      id: course.id,
      courseName: course.courseName || "",
      durationInHours: course.durationInHours || "",
      fee: course.fee || "",
    });
    setIsEditing(true);
    setFieldErrors({});
    setPage("add");
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this course?");
    if (!ok) return;

    setError("");
    try {
      await deleteCourse(id);
      setCourses((prev) => prev.filter((course) => course.id !== id));
      if (form.id === id) resetForm();
    } catch (err) {
      setError(err.message || "Failed to delete course.");
    }
  };

  const validateClient = () => {
    const next = {};

    if (!form.courseName.trim()) next.courseName = "Course name is required.";
    if (Number(form.durationInHours) <= 0) {
      next.durationInHours = "Duration must be greater than 0.";
    }
    if (Number(form.fee) <= 0) next.fee = "Fee must be greater than 0.";

    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setFieldErrors({});

    if (!validateClient()) {
      setSaving(false);
      return;
    }

    const payload = {
      courseName: form.courseName.trim(),
      durationInHours: Number(form.durationInHours),
      fee: Number(form.fee),
    };

    try {
      const saved = isEditing
        ? await updateCourse(form.id, payload)
        : await createCourse(payload);

      const normalized = {
        id: saved?.id ?? saved?.Id ?? form.id ?? Date.now(),
        courseName: saved?.courseName ?? saved?.CourseName ?? payload.courseName,
        durationInHours:
          saved?.durationInHours ??
          saved?.DurationInHours ??
          payload.durationInHours,
        fee: saved?.fee ?? saved?.Fee ?? payload.fee,
      };

      if (isEditing) {
        setCourses((prev) =>
          prev.map((course) => (course.id === form.id ? normalized : course))
        );
      } else {
        setCourses((prev) => [normalized, ...prev]);
      }

      resetForm();
      setPage("manage");
    } catch (err) {
      if (err.details) {
        const mapped = {};
        for (const [key, value] of Object.entries(err.details)) {
          mapped[key] = Array.isArray(value) ? value[0] : String(value);
        }
        setFieldErrors(mapped);
        setError(err.message || "Please fix the highlighted fields.");
        return;
      }

      setError(err.message || "Failed to save course.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="dashboardShell">
      <div className="dashboardGlow glowA" />
      <div className="dashboardGlow glowB" />
      <div className="dashboardGlow glowC" />

      <header className="topNav">
        <div className="brandBlock">
          <div className="brandDot" />
          <div>
            <h1>Course Management System-CRUD App</h1>
            <p>Connected to your backend Service</p>
          </div>
        </div>

        <div className="navActions">
          <button className="ghostBtn" onClick={() => setPage("dashboard")} type="button">
            Dashboard
          </button>
          <button className="ghostBtn" onClick={() => setPage("manage")} type="button">
            Manage Courses
          </button>
          <button className="ghostBtn" onClick={loadCourses} type="button">
            Refresh
          </button>
        </div>
      </header>

      {page === "dashboard" && (
        <>
          <section className="heroPanel landingHero">
            <div>
              <p className="eyebrow">Dashboard</p>
              <h2>Manage courses with ease</h2>
              <p className="heroText">
                Track, add, and manage courses easily with this sleek and modern platform.
              </p>

              <div className="landingActions">
                <button className="primaryBtn" onClick={() => setPage("manage")} type="button">
                  Get Started
                </button>
                <button className="secondaryBtn" onClick={openAddPage} type="button">
                  Add Course
                </button>
              </div>
            </div>

            <div className="heroPreviewGrid">
              {stats.map((item) => (
                <article key={item.label} className="previewCard">
                  <span><p>
                    {item.label} : <strong>{item.value}</strong>
                  </p></span>

                </article>
              ))}
            </div>
          </section>

          <section className="featureGrid">
            <article className="featureCard">
              <h3>Dashboard</h3>
              <p>View overall course stats and get a quick overview.</p>
            </article>
            <article className="featureCard">
              <h3>Add/Edit Courses</h3>
              <p>Create new courses or update existing ones in one clean form.</p>
            </article>
            <article className="featureCard">
              <h3>Manage Courses</h3>
              <p>View, search, update, and manage all your courses in one place.</p>
            </article>
          </section>
        </>
      )}

      {page === "add" && (
        <section className="formPageLayout">
          <div className="panel formPagePanel">
            <div className="panelHeader">
              <div>
                <h2>{isEditing ? "Edit Course" : "Add Course"}</h2>
                <p>{isEditing ? "Update course details" : "Create a new course entry"}</p>
              </div>
            </div>

            {error && <div className="errorBanner">{error}</div>}

            <CourseForm
              form={form}
              setForm={setForm}
              onSubmit={handleSubmit}
              onCancel={() => {
                resetForm();
                setPage("manage");
              }}
              saving={saving}
              isEditing={isEditing}
              fieldErrors={fieldErrors}
            />
          </div>

          <aside className="panel formInfoPanel">
            <p className="eyebrow">Add Course Page</p>
            <h2>Create or update a course</h2>
            

            <div className="infoStack">
              <div className="previewCard">
                <span>Enter the course details below to create a new course,update an existing one.</span>
                
              </div>
              <div className="previewCard">
                <span>Make sure all information is accurate for better management.</span>
            
              </div>
              <div className="previewCard">
                <span>Please enter the valid details</span>
                
              </div>
            </div>
          </aside>
        </section>
      )}

      {page === "manage" && (
        <section className="contentGrid manageLayout">
          <div className="panel tablePanel">
            <div className="panelHeader">
              <div>
                <h2>Manage Courses</h2>
                <p>{filteredCourses.length} course(s) shown</p>
              </div>

              <div className="manageButtons">
                <button type="button" className="smallGhostBtn" onClick={openAddPage}>
                  Add Course
                </button>
                <button type="button" className="smallGhostBtn" onClick={loadCourses}>
                  Refresh
                </button>
              </div>
            </div>

            <div className="manageSearchRow">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses..."
                className="searchInput"
              />
              <button
                type="button"
                className="ghostBtn"
                onClick={() => setSearch("")}
                disabled={!search}
              >
                Clear
              </button>
            </div>

            {loading ? (
              <div className="loadingState">Loading courses...</div>
            ) : (
              <CourseTable
                courses={filteredCourses}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </div>

          <aside className="panel sideInfoPanel">
            <p className="eyebrow">Dashboard Stats</p>
            <h2>Quick Insights</h2>
            <p className="heroText">
              Instant insights into your course data and overall performance.
            </p>

            <div className="heroPreviewGrid">
              {stats.map((item) => (
                <article key={item.label} className="previewCard">
                  <p>{item.label}</p>
                  <h3>{item.value}</h3>
                </article>
              ))}
            </div>
          </aside>
        </section>
      )}
    </div>
  );
}