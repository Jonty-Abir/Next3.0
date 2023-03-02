import { useEffect } from "react";

function NavBar() {
  useEffect(() => {
    const burger: any = document.querySelector(".burger");
    const menu: any = document.querySelector(".menu");

    burger.addEventListener("click", () => {
      menu.classList.toggle("show");
    });
  });
  return (
    <nav>
      <div className="logo">
        <a href="#">Logo</a>
      </div>
      <div className="menu">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
      <div className="burger">
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default NavBar;
