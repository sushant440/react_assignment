import { useState, useEffect } from "react";
import Button from "./Button";

const COURSES = ["Python & Django", "JavaScript & Node", "UI/UX", "Database and SQL", "AI and ML"];

export default function StudentForm({ onAdd, editingStudent }) {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [grade, setGrade] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setCourse(editingStudent.course);
      setGrade(editingStudent.grade);
    }
  }, [editingStudent]);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!course) newErrors.course = "Please select a course";
    if (grade === "" || grade < 0 || grade > 10) newErrors.grade = "Grade must be 0-10";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onAdd({
      id: editingStudent ? editingStudent.id : Date.now(),
      name,
      course,
      grade: Number(grade),
      isPresent: editingStudent ? editingStudent.isPresent : true,
    });

    setName("");
    setCourse("");
    setGrade("");
    setErrors({});
  };

  return (
    <div className="form-wrapper">
      <div className="form-card animated">
        <h2 className="form-title">{editingStudent ? "Edit Student" : "Add New Student"}</h2>

        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Student Name</label>
            <input type="text" placeholder="e.g. Ratnahari Adhikari" value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="input-group">
            <label>Course</label>
            <select value={course} onChange={(e) => setCourse(e.target.value)}>
              <option value="">Select a course</option>
              {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.course && <span className="error">{errors.course}</span>}
          </div>

          <div className="input-group full-width">
            <label>Enter your grade (0-10)</label>
            <input type="number" min="0" max="100" placeholder="Enter grade" value={grade} onChange={(e) => setGrade(e.target.value)} />
            {errors.grade && <span className="error">{errors.grade}</span>}
          </div>

          <div className="form-actions">
            <Button type="submit">{editingStudent ? "Update Student" : "Add Student"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}