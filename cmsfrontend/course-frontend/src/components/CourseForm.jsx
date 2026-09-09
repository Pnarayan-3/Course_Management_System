import React from "react";

export default function CourseForm({
  form,
  setForm,
  onSubmit,
  onCancel,
  saving,
  isEditing,
  fieldErrors = {},
}) {
  return (
    <form onSubmit={onSubmit} className="panel formPanel">
      {/* <div className="panelHeader">
        <div>
          <h2>{isEditing ? "Edit Course" : "Add Course"}</h2>
          <p>{isEditing ? "Update course details" : "Create a new course entry"}</p>
        </div>
      </div> */}

      <div className="formGrid">
        <div className="formGroup full">
          <label>Course Name</label>
          <input
            value={form.courseName}
            onChange={(e) => setForm({ ...form, courseName: e.target.value })}
            placeholder="Enter course name"
            className={fieldErrors.courseName ? "inputError" : ""}
          />
          {fieldErrors.courseName && (
            <p className="fieldError">{fieldErrors.courseName}</p>
          )}
        </div>

        <div className="formGroup">
          <label>Duration (Hours)</label>
          <input
            type="number"
            value={form.durationInHours}
            onChange={(e) =>
              setForm({ ...form, durationInHours: e.target.value })
            }
            placeholder="e.g. 40"
            className={fieldErrors.durationInHours ? "inputError" : ""}
          />
          {fieldErrors.durationInHours && (
            <p className="fieldError">{fieldErrors.durationInHours}</p>
          )}
        </div>

        <div className="formGroup">
          <label>Fee</label>
          <input
            type="number"
            value={form.fee}
            onChange={(e) => setForm({ ...form, fee: e.target.value })}
            placeholder="e.g. 5000"
            className={fieldErrors.fee ? "inputError" : ""}
          />
          {fieldErrors.fee && <p className="fieldError">{fieldErrors.fee}</p>}
        </div>
      </div>

      <div className="actions">
        <button type="submit" className="primaryBtn" disabled={saving}>
          {saving ? "Saving..." : isEditing ? "Update Course" : "Create Course"}
        </button>

        <button type="button" onClick={onCancel} className="secondaryBtn">
          Cancel
        </button>
      </div>
    </form>
  );
}