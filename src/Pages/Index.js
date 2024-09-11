import "./Index.css";

export default function Index() {
  return (
    <div className="Index">
      <h1>welcome in website</h1>

      <a href="/admin/dashboard" className="btn btn-main">
        go to admin dashboard
        <i className="fas fa-link"></i>
      </a>
    </div>
  );
}
