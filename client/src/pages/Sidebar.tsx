




// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   Building2,
//   LayoutDashboard,
//   Home,
//   MessageSquare,
//   BarChart3,
//   Settings,
//   LogOut,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { supabase } from "../supabaseClient";

// interface SidebarProps {
//   onClose?: () => void;
//   isMobile?: boolean;
// }

// const Sidebar = ({ onClose, isMobile = false }: SidebarProps) => {
//   const [collapsed, setCollapsed] = useState(true); // start collapsed on desktop
//   const location = useLocation();

//   const handleLogout = async () => {
//     const { error } = await supabase.auth.signOut();
//     if (error) console.error("Logout error:", error.message);
//     else window.location.href = "/login";
//     if (onClose) onClose();
//   };

//   const handleLinkClick = () => {
//     if (onClose) onClose(); // only close on mobile
//   };

//   return (
//     <>
//       {/* Mobile overlay */}
//       {isMobile && (
//         <div
//           className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
//           onClick={onClose}
//         />
//       )}

//       {/* Sidebar container */}
//       <div
//         className={`${
//           isMobile
//             ? "fixed top-0 left-0 z-50 h-full w-[80%] max-w-xs bg-white shadow-xl transition-transform"
//             : `hidden md:flex md:flex-col h-screen bg-white shadow-sm transition-all duration-300 ${
//                 collapsed ? "md:w-20" : "md:w-64"
//               }`
//         }`}
//         onMouseEnter={() => setCollapsed(false)} // expand on hover
//         onMouseLeave={() => setCollapsed(true)}  // collapse on leave
//       >
//         {/* Toggle button (desktop only, optional) */}
//         {!isMobile && (
//           <button
//             onClick={() => setCollapsed(!collapsed)}
//             className="absolute top-4 right-[-10px] bg-white border rounded-full shadow p-1 hover:bg-gray-100"
//           >
//             {collapsed ? (
//               <ChevronRight className="h-4 w-4 text-gray-600" />
//             ) : (
//               <ChevronLeft className="h-4 w-4 text-gray-600" />
//             )}
//           </button>
//         )}

//         {/* Sidebar content */}
//         <div className="h-full flex flex-col p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
//           {/* Logo Section */}
//           <div className="mb-8 flex items-center justify-center md:justify-start gap-2 cursor-pointer">
//             <Building2 className="h-7 w-7 text-primary" />
//             {!collapsed && <span className="text-lg font-bold text-primary"></span>}
//           </div>

//           {/* Navigation Links */}
//           <nav className="flex flex-col space-y-2">
//             {[
//               { to: "/", icon: LayoutDashboard, label: "Dashboard" },
//               { to: "/properties", icon: Home, label: "Properties" },
//               { to: "/enquiries", icon: MessageSquare, label: "Enquiries" },
//               { to: "/reminders", icon: MessageSquare, label: "Reminders" },
//              { to: "/reports", icon: BarChart3, label: "Reports" },
//              { to: "/settings", icon: Settings, label: "Settings" },


//             ].map(({ to, icon: Icon, label }) => (
//               <Link
//                 key={to}
//                 to={to}
//                 onClick={handleLinkClick}
//                 className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
//                   location.pathname === to
//                     ? "bg-[#fe9d00cf] text-black font-medium"
//                     : "text-gray-700 hover:bg-[#ffb84dcf]"
//                 }`}
//               >
//                 <Icon className="h-5 w-5" />
//                 {!collapsed && <span>{label}</span>}
//               </Link>
//             ))}
//           </nav>

//           {/* Logout Button */}
//           <div className="mt-auto pt-4 border-t border-gray-200">
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-red-600 hover:bg-red-50 hover:text-red-700 transition"
//             >
//               <LogOut className="h-5 w-5" />
//               {!collapsed && <span>Logout</span>}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;


import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Building2,
  LayoutDashboard,
  Home,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { supabase } from "../supabaseClient";

interface SidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
}

const Sidebar = ({ onClose, isMobile = false }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const [reportsOpen, setReportsOpen] = useState(false);
  const location = useLocation();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Logout error:", error.message);
    else window.location.href = "/login";
    if (onClose) onClose();
  };

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  // Define your reports subpages
  const reportsSubpages = [
  { to: "/reports", label: "Reports Dashboard" },
  { to: "/reports/pending-followups", label: "Pending Followups" },
  { to: "/reports/converted", label: "Converted Leads" },
  { to: "/reports/lost-leads", label: "Lost Leads" },
  { to: "/reports/leads-by-location", label: "Leads by Location" },
];

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <div
        className={`${
          isMobile
            ? "fixed top-0 left-0 z-50 h-full w-[80%] max-w-xs bg-white shadow-xl transition-transform"
            : `hidden md:flex md:flex-col h-screen bg-white shadow-sm transition-all duration-300 ${
                collapsed ? "md:w-20" : "md:w-64"
              }`
        }`}
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => {
          setCollapsed(true);
          // Close reports dropdown when sidebar collapses
          if (collapsed) setReportsOpen(false);
        }}
      >
        {/* Toggle button (desktop only) */}
        {!isMobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute top-4 right-[-10px] bg-white border rounded-full shadow p-1 hover:bg-gray-100"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4 text-gray-600" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            )}
          </button>
        )}

        {/* Sidebar content */}
        <div className="h-full flex flex-col p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {/* Logo Section */}
          <div className="mb-8 flex items-center justify-center md:justify-start gap-2 cursor-pointer">
            <Building2 className="h-7 w-7 text-primary" />
            {!collapsed && <span className="text-lg font-bold text-primary"></span>}
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-2">
            {[
              { to: "/", icon: LayoutDashboard, label: "Dashboard" },
              { to: "/properties", icon: Home, label: "Properties" },
              { to: "/enquiries", icon: MessageSquare, label: "Enquiries" },
              { to: "/reminders", icon: MessageSquare, label: "Reminders" },
            ].map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                onClick={handleLinkClick}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                  location.pathname === to
                    ? "bg-[#fe9d00cf] text-black font-medium"
                    : "text-gray-700 hover:bg-[#ffb84dcf]"
                }`}
              >
                <Icon className="h-5 w-5" />
                {!collapsed && <span>{label}</span>}
              </Link>
            ))}

            {/* Reports Section with Dropdown */}
            <div>
              <button
                onClick={() => {
                  if (!collapsed || isMobile) {
                    setReportsOpen(!reportsOpen);
                  }
                }}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition ${
                  location.pathname.startsWith("/reports") || location.pathname === "/reviews"
                    ? "bg-[#fe9d00cf] text-black font-medium"
                    : "text-gray-700 hover:bg-[#ffb84dcf]"
                } ${collapsed && !isMobile ? "justify-center" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5" />
                  {(!collapsed || isMobile) && <span>Reports</span>}
                </div>
                {(!collapsed || isMobile) && (
                  <span>
                    {reportsOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </span>
                )}
              </button>

              {/* Reports Submenu */}
              {(!collapsed || isMobile) && reportsOpen && (
                <div className="ml-8 mt-1 space-y-1 border-l-2 border-gray-200 pl-4">
                  {reportsSubpages.map(({ to, label }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={handleLinkClick}
                      className={`flex items-center px-3 py-2 rounded-md text-sm transition ${
                        location.pathname === to
                          ? "text-primary font-medium bg-primary/10"
                          : "text-gray-600 hover:text-primary hover:bg-gray-100"
                      }`}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Settings */}
            <Link
              to="/settings"
              onClick={handleLinkClick}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                location.pathname === "/settings"
                  ? "bg-[#fe9d00cf] text-black font-medium"
                  : "text-gray-700 hover:bg-[#ffb84dcf]"
              }`}
            >
              <Settings className="h-5 w-5" />
              {!collapsed && <span>Settings</span>}
            </Link>
          </nav>

          {/* Logout Button */}
          <div className="mt-auto pt-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-red-600 hover:bg-red-50 hover:text-red-700 transition"
            >
              <LogOut className="h-5 w-5" />
              {(!collapsed || isMobile) && <span>Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;