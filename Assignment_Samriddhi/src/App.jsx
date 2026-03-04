import { useState, useEffect } from "react";
import StudentCard from "./Components/StudentCard";
import StudentForm from "./Components/StudentForm";
import Toolbar from "./Components/Toolbar";

export default function App() {
  const [students, setStudents] = useState(() => {
    return JSON.parse(localStorage.getItem("students")) || [];
  });

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [showForm, setShowForm] = useState(true);
  const [editingStudent, setEditingStudent] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    if (darkMode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [darkMode]);

  const addStudent = (student) => {
    if (editingStudent) {
      setStudents(
        students.map((s) => (s.id === editingStudent.id ? student : s))
      );
      setEditingStudent(null);
    } else {
      setStudents([...students, student]);
    }
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const toggleStatus = (id) => {
    setStudents(
      students.map((s) =>
        s.id === id ? { ...s, isPresent: !s.isPresent } : s
      )
    );
  };

  const filteredStudents = students
    .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    .filter((s) => (filterCourse === "all" ? true : s.course === filterCourse))
    .filter((s) =>
      filterStatus === "all"
        ? true
        : filterStatus === "present"
        ? s.isPresent
        : !s.isPresent
    )
    .sort((a, b) =>
      sortBy === "grade" ? b.grade - a.grade : a.name.localeCompare(b.name)
    );

  return (
    <div className="container">
      <header className="header">
        <h1>Student Directory</h1>
        <p>Manage and track student performance</p>
      </header>

      <Toolbar
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        showForm={showForm}
        setShowForm={setShowForm}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        filterCourse={filterCourse}
        setFilterCourse={setFilterCourse}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {showForm && (
        <StudentForm onAdd={addStudent} editingStudent={editingStudent} />
      )}

      {filteredStudents.length === 0 ? (
        <div className="empty-state">No students found 📭</div>
      ) : (
        <div className={`student-list ${viewMode}`}>
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onDelete={deleteStudent}
              onToggle={toggleStatus}
              onEdit={setEditingStudent}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
}