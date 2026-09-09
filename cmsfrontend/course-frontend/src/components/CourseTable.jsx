import React from "react";

export default function CourseTable({ courses, onEdit, onDelete }) {
  return (
    <div className="tableWrap">
      {courses.length === 0 ? (
        <div className="emptyState">
          <h3>No courses found</h3>
          <p>Try a different search term or add a new course.</p>
        </div>
      ) : (
        <table className="courseTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Course Name</th>
              <th>Duration</th>
              <th>Fee</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>
                  <span className="idBadge">{course.id}</span>
                </td>
                <td>{course.courseName}</td>
                <td>{course.durationInHours}</td>
                <td>{course.fee}</td>
                <td>
                  <div className="rowActions">
                    <button
                      onClick={() => onEdit(course)}
                      className="rowBtn editBtn"
                      type="button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(course.id)}
                      className="rowBtn deleteBtn"
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}