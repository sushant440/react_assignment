import Input from "./Input";
import Button from "./Button";

export default function Toolbar({
  search,
  setSearch,
  sortBy,
  setSortBy,
  showForm,
  setShowForm,
  darkMode,
  setDarkMode,
  filterCourse,
  setFilterCourse,
  filterStatus,
  setFilterStatus,
  viewMode,
  setViewMode,
}) {
  return (
    <div className="toolbar">
      <Input
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="name">Sort by Name</option>
        <option value="grade">Sort by Grade</option>
      </select>

      <select value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)}>
        <option value="all">All Courses</option>
        <option value="Python & Django">Python & Django</option>
        <option value="JavaScript & Node">JavaScript & Node</option>
        <option value="UI/UX">UI/UX</option>
        <option value="Database and SQL">Database and SQL</option>
        <option value="AI and ML">AI and ML</option>

      </select>

      <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
        <option value="all">All Status</option>
        <option value="present">Present</option>
        <option value="absent">Absent</option>
      </select>

      <Button variant="outline" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Add Student"}
      </Button>

      <Button variant="outline" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
        {viewMode === "grid" ? "Switch to List View" : "Switch to Grid View"}
      </Button>

      <Button variant="outline" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </Button>
    </div>
  );
}