import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { supabase } from "./supabase/client";


const DashboardLayout = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    console.log("Logging out...");
    const { error } = await supabase.auth.signOut(); 
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      window.location.href = "/login"; 
    }
  };

  return (
    <div className="flex h-screen w-screen">
      {isSidebarVisible && (
        <aside
          className="relative w-64 h-full text-white border-r border-white/40 
          before:absolute before:inset-0 before:bg-[url('../assets/img/sideBar-font.jpg')] 
          before:bg-cover before:bg-center before:brightness-50 before:content-['']"
        >
          <div className="relative h-full flex flex-col p-4 z-10">
            <button
              onClick={toggleSidebar}
              className="mb-4 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 self-end"
            >
              ←
            </button>
            <div className="text-xl font-bold text-center mb-6">
              UNIVERSIDAD EL BOSQUE
            </div>
            <div className="flex flex-col items-center border-t border-b border-white border-opacity-30 py-4">
              <img
                src="./assets/img/avatar.jpg"
                alt="User Icon"
                className="w-20 h-20 rounded-full mb-2"
              />
              <span className="text-sm">Victor</span>
              <div className="flex space-x-4 mt-3">
                <a href="#!" className="text-white text-lg hover:text-orange-500">
                  <i className="zmdi zmdi-settings"></i>
                </a>
                <a
                  href="#!"
                  className="text-white text-lg hover:text-orange-500"
                  onClick={handleLogout} // Link the logout function
                >
                  <i className="zmdi zmdi-power"></i>
                </a>
              </div>
            </div>
            <nav className="mt-6">
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="block px-4 py-2 rounded text-white hover:bg-white hover:bg-opacity-20 transition"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Form"
                    className="block px-4 py-2 rounded text-white hover:bg-white hover:bg-opacity-20 transition"
                  >
                    Mis especies 
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Especies"
                    className="block px-4 py-2 rounded text-white hover:bg-white hover:bg-opacity-20 transition"
                  >
                     Especies 
                  </Link>
                </li>
              
               
                      <li>
                        <Link
                          to="/curandores"
                          className="block px-4 py-2 rounded text-white hover:bg-white hover:bg-opacity-20 transition"
                        >
                          Especies a cargo 
                        </Link>
                      </li>
                     
                
              
                <li>
                  <Link
                    to="/Correciones"
                    className="block px-4 py-2 rounded text-white hover:bg-white hover:bg-opacity-20 transition"
                  >
                     Correciones  
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Exportacion"
                    className="block px-4 py-2 rounded text-white hover:bg-white hover:bg-opacity-20 transition"
                  >
                     Acciones 
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Nfts"
                    className="block px-4 py-2 rounded text-white hover:bg-white hover:bg-opacity-20 transition"
                  >
                     Nfts 
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      )}
      <main className="flex-1 p-6 overflow-y-auto h-full"> {/* Adjust height */}
        {!isSidebarVisible && (
          <button
            onClick={toggleSidebar}
            className="mb-4 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700"
          >
            →
          </button>
        )}
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default DashboardLayout;
