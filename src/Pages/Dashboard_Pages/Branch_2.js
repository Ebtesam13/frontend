import Header from "../../Components/Dashboard/Header/Header";
import Sidebar from "../../Components/Dashboard/Sidebar/Sidebar";

export function Branch_2() {
  return (
    <div className="Dashboard">
      <Header />
      <div className="Container" id="Container">
        <Sidebar />

        <div className="Content">
          <h1>Gulshan-1</h1>
        </div>
      </div>
    </div>
  );
}
