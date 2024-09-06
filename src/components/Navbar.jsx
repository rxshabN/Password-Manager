import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-black">
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-16 text-white">
        <div className="logo font-bold text-2xl">
          <span className="symbols cursor-default">&lt;</span>
          <span className="cursor-default">Password Manager</span>
          <span className="symbols cursor-default">/&gt;</span>
        </div>
        <div className="flex justify-center items-center gap-2">
          <span className="hover-underline-animation cursor-default">
            To see all my projects, click on the GitHub logo:
          </span>
          <a href="https://github.com/rxshabN">
            <img
              src="github-01-stroke-rounded.svg"
              alt="github logo"
              className="invert w-8"
            />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
