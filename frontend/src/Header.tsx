import { Outlet, Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="nav nav-tabs justify-content-center">
        <li className="nav-item">
          <Link to={"/"} className="nav-link">
            Домой
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/data"} className="nav-link">
            Отправить данные
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/datatable"} className="nav-link">
            Посмотреть даннные
          </Link>
        </li>
      </div>
      <Outlet />
    </>
  );
}

export default Header;
