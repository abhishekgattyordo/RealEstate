// import { Switch, Route } from "wouter";
// import { queryClient } from "./lib/queryClient";
// import { QueryClientProvider } from "@tanstack/react-query";

// import { TooltipProvider } from "@/components/ui/tooltip";
// import { Menu } from "lucide-react";
// import Logi from "@/pages/Login";
// import Dashboard from "@/pages/Dashboard";
// import Properties from "@/pages/Properties";
// import Enquiries from "@/pages/Enquiries";
// import Reminders from "@/pages/Reminders";
// import Reports from "@/pages/Reports";
// import Settings from "@/pages/Settings";
// import NotFound from "@/pages/not-found";

// import AppHeader from "@/components/AppHeader";
// import BottomNav from "@/components/BottomNav";
// import { Link } from "react-router-dom";
// import React, { useEffect } from "react";
// import AuthCallbackPage from "@/pages/AuthCallbackPage";
// import Login from "@/pages/Login";
// import { Toaster } from "react-hot-toast";

// function Router() {
//   return (
//     <Switch>
//       <Route path="/login" component={Login} />
//       <Route path="/">
//         <AppLayout>
//           <Dashboard />
//         </AppLayout>
//       </Route>
//       <Route path="/properties">
//         <AppLayout>
//           <Properties />
//         </AppLayout>
//       </Route>
//       <Route path="/enquiries">
//         <AppLayout>
//           <Enquiries />
//         </AppLayout>
//       </Route>
//       <Route path="/reminders">
//         <AppLayout>
//           <Reminders />
//         </AppLayout>
//       </Route>
//       <Route path="/reports">
//         <AppLayout>
//           <Reports />
//         </AppLayout>
//       </Route>
//       <Route path="/settings">
//         <AppLayout>
//           <Settings />
//         </AppLayout>
//       </Route>
//       <Route path="/auth/callback" component={AuthCallbackPage} />

//     </Switch>
//   );
// }

// import { useState } from "react";
// import Sidebar from "./pages/Sidebar";
// import Loginn from "@/pages/Login";

// export function AppLayout({ children }: { children: React.ReactNode }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-background">
//       {/* Header at top */}
//       <AppHeader
//         title={
//           <div className="flex items-center gap-2 w-full">
//             <div
//               className="h-5 w-5 cursor-pointer text-gray-700 hover:text-blue-600"
//               onClick={toggleSidebar}
//             />
//             <Link
//               to="/"
//               onClick={() => setSidebarOpen(false)}
//               className="text-2xl font-bold text-primary hover:text-blue-700 transition"
//             >
//               Real Estate CRM
//             </Link>
//           </div>
//         }
//         notificationCount={3}
//         onNotificationClick={() => console.log("Notifications clicked")}
//         onProfileClick={() => (window.location.href = "/settings")}
//       />

//       {/* Layout body (Sidebar + Main content) */}
//       <div className="flex flex-1 relative">
//         {/* ✅ Fixed sidebar on desktop */}
//         <div className="hidden md:block fixed top-[2px] left-0 h-[calc(100vh-64px)] w-4 bg-white shadow-sm z-30">
//           <Sidebar />
//         </div>

//         {/* ✅ Mobile sidebar (overlay style) */}
//         {sidebarOpen && (
//           <Sidebar isMobile onClose={() => setSidebarOpen(false)} />
//         )}

//         {/* ✅ Main content area (shifted right to avoid overlap) */}
//         <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6 md:ml-64 transition-all duration-300">
//           <div className="container mx-auto">{children}</div>
//         </main>
//       </div>

//       {/* Bottom navigation (mobile only) */}
//       <BottomNav />
//     </div>
//   );
// }

// export default function App() {
//   useEffect(() => {
//     console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
//     console.log("Supabase Key:", import.meta.env.VITE_SUPABASE_KEY);
//   }, []);

//   return (
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <Toaster  position="bottom-right" />
//         <Router />
//       </TooltipProvider>
//     </QueryClientProvider>
//   );
// }

import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Menu } from "lucide-react";
import Logi from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Properties from "@/pages/Properties";
import Enquiries from "@/pages/Enquiries";
import Reminders from "@/pages/Reminders";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";
import ViewPropertyPage from "./pages/ViewPropertyModal";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import AuthCallbackPage from "@/pages/AuthCallbackPage";
import Login from "@/pages/Login";
import { Toaster } from "react-hot-toast";

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/">
        <AppLayout>
          <Dashboard />
        </AppLayout>
      </Route>
      <Route path="/properties">
        <AppLayout>
          <Properties />
        </AppLayout>
      </Route>
      <Route path="/enquiries">
        <AppLayout>
          <Enquiries />
        </AppLayout>
      </Route>
      <Route path="/reminders">
        <AppLayout>
          <Reminders />
        </AppLayout>
      </Route>
      {/* <Route path="/reports">
        <AppLayout>
          <Reports />
        </AppLayout>
      </Route> */}
      <Route path="/settings">
        <AppLayout>
          <Settings />
        </AppLayout>
      </Route>
      <Route path="/auth/callback" component={AuthCallbackPage} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/z" component={UsersReport} />
      {/* Reports Dashboard */}
      <Route path="/reports">
        <AppLayout>
          <ReportsDashboard />
        </AppLayout>
      </Route>

      {/* Pending Followups */}
      <Route path="/reports/pending-followups">
        <AppLayout>
          <PendingFollowups />
        </AppLayout>
      </Route>

      {/* Total Converted */}
      <Route path="/reports/converted">
        <AppLayout>
          <TotalConverted />
        </AppLayout>
      </Route>

      {/* Lost Leads */}
      <Route path="/reports/lost-leads">
        <AppLayout>
          <LostLeads />
        </AppLayout>
      </Route>

      {/* Leads by Location */}
      <Route path="/reports/leads-by-location">
        <AppLayout>
          <LeadsByLocation />
        </AppLayout>
      </Route>

      <Route path="/properties/view/:id">
        <AppLayout>
          <ViewPropertyPage />
        </AppLayout>
      </Route>
    </Switch>
  );
}

// import { useState } from "react";
// import Sidebar from "./pages/Sidebar";
// import Loginn from "@/pages/Login";
// import ViewPropertyPage from "./pages/ViewPropertyModal";
// import { supabase } from "@/supabaseClient";

// export function AppLayout({ children }: { children: React.ReactNode }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [collapsed, setCollapsed] = useState(true);
//   const [notificationCount, setNotificationCount] = useState(0);
//   const [notifications, setNotifications] = useState<any[]>([]);
//   const [userId, setUserId] = useState<string | null>(null);

//   useEffect(() => {
//     const getUser = async () => {
//       const { data: userData } = await supabase.auth.getUser();
//       if (userData?.user?.id) {
//         setUserId(userData.user.id);
//       }
//     };
//     getUser();
//   }, []);

//   // Fetch unread notifications
//   const fetchNotifications = async () => {
//     if (!userId) return;

//     const { data, error } = await supabase
//       .from("notifications")
//       .select("*", { count: "exact" })
//       .eq("user_id", userId)
//       .eq("read", false);

//     if (!error && data) {
//       setNotificationCount(data.length);
//       setNotifications(data);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, [userId]); // fetch when userId is available

//   const markAsRead = async (id: string) => {
//     const { error } = await supabase
//       .from("notifications")
//       .update({ read: true })
//       .eq("id", id);

//     if (!error) {
//       setNotifications((prev) => prev.filter((n) => n.id !== id));
//       setNotificationCount((prev) => prev - 1);
//     }
//   };

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-background">
//       {/* Header at top */}
//       <AppHeader
//         title={
//           <Link
//             to="/"
//             onClick={() => setSidebarOpen(false)}
//             className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-blue-700 transition"
//           >
//             <img
//               src="/logo-round.png"
//               alt="Logo"
//               className="h-10 w-10 object-contain"
//             />

//             <span>Real Estate CRM</span>
//           </Link>
//         }
//         notificationCount={notificationCount}
//         onNotificationClick={() => console.log("Notifications clicked")}
//         onProfileClick={() => (window.location.href = "/settings")}
//       />

//       {/* Layout body (Sidebar + Main content) */}
//       <div className="flex flex-1 relative">
//         {/* ✅ Fixed sidebar on desktop */}
//         <div className="hidden md:block fixed top-[2px] left-0 h-[calc(100vh-64px)] z-30">
//           <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
//         </div>

//         {/* ✅ Mobile sidebar (overlay style) */}
//         {sidebarOpen && (
//           <Sidebar isMobile onClose={() => setSidebarOpen(false)} />
//         )}

//         {/* ✅ Main content area (shifted right to avoid overlap) */}
//         <main
//           className={`flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6 transition-all duration-300
//     ${collapsed ? "md:ml-20" : "md:ml-64"}`}
//         >
//           <div className="container mx-auto">{children}</div>
//         </main>
//       </div>

//       {/* Bottom navigation (mobile only) */}
//       <BottomNav />
//     </div>
//   );
// }

import { useState } from "react";

import Sidebar from "./pages/Sidebar";

import { supabase } from "@/supabaseClient";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  const [userId, setUserId] = useState<string | null>(null);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false); // false = show only unread

  const [notifications, setNotifications] = useState<any[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);

  // Get current user and company
  useEffect(() => {
    const getUser = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user?.id) {
        setUserId(userData.user.id);

        // Fetch company_id for this user
        const { data: userProfile, error } = await supabase
          .from("users")
          .select("company_id")
          .eq("id", userData.user.id)
          .single();

        if (error) {
          console.error("Error fetching company_id:", error.message);
          return;
        }
        setCompanyId(userProfile?.company_id || null);
      }
    };
    getUser();
  }, []);

  const fetchNotifications = async () => {
    if (!userId || !companyId) return;

    try {
      // 1️⃣ Get all activity IDs the user has already read
      const { data: readData, error: readError } = await supabase
        .from("activity_read_status")
        .select("activity_id")
        .eq("user_id", userId);

      if (readError) throw readError;

      const readIds = readData?.map((r) => r.activity_id) || [];

      // 2️⃣ Fetch unread activities for this company
      let query = supabase
        .from("activity_feed")
        .select("*")
        .eq("company_id", companyId)
        .order("created_at", { ascending: false });

      // Exclude read activities
      if (readIds.length > 0) {
        query = query.not("id", "in", `(${readIds.join(",")})`);
      }

      const { data, error } = await query;
      if (error) throw error;

      // 3️⃣ Update state
      setNotifications(data || []);
      setNotificationCount(data?.length || 0);
    } catch (err: any) {
      console.error("Error fetching notifications:", err.message || err);
    }
  };

  // Mark a notification as read for the current user
  const markAsRead = async (activityId: string) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from("activity_read_status")
        .upsert(
          { activity_id: activityId, user_id: userId },
          { onConflict: "activity_id,user_id" }
        );

      if (error) throw error;

      // Remove notification from UI
      setNotifications((prev) => prev.filter((n) => n.id !== activityId));
      setNotificationCount((prev) => Math.max(prev - 1, 0));
    } catch (err: any) {
      console.error("Mark as read failed:", err.message || err);
    }
  };

  // Fetch notifications whenever userId or companyId changes
  useEffect(() => {
    fetchNotifications();
  }, [userId, companyId]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <AppHeader
        title={
          <Link
            to="/"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-blue-700 transition"
          >
            <img
              src="/logo-round.png"
              alt="Logo"
              className="h-10 w-10 object-contain"
            />
            <span>Real Estate CRM</span>
          </Link>
        }
        notificationCount={notificationCount}
        notifications={notifications}
        markAsRead={markAsRead}
        onProfileClick={() => (window.location.href = "/settings")}
      />

      {/* Layout body */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <div className="hidden md:block fixed top-[2px] left-0 h-[calc(100vh-64px)] z-30">
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>
        {sidebarOpen && (
          <Sidebar isMobile onClose={() => setSidebarOpen(false)} />
        )}

        {/* Main content */}
        <main
          className={`flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6 transition-all duration-300
            ${collapsed ? "md:ml-20" : "md:ml-64"}`}
        >
          <div className="container mx-auto">{children}</div>
        </main>
      </div>

      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
}

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./pages/ResetPassword";
import UsersReport from "./pages/UsersReport";
import PendingFollowups from "./pages/Reports/PendingFollowups";
import TotalConverted from "./pages/Reports/TotalConverted";
import LostLeads from "./pages/Reports/LostLeads";
import LeadsByLocation from "./pages/Reports/LeadsByLocation";
import ReportsDashboard from "./pages/Reports/ReportsDashboard";

export default function App() {
  useEffect(() => {
    console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
    console.log("Supabase Key:", import.meta.env.VITE_SUPABASE_KEY);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster position="bottom-right" />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
