

// import { useEffect, useState } from "react";
// import { useLocation } from "wouter";
// import StatCard from "@/components/StatCard";
// import QuickActionCard from "@/components/QuickActionCard";
// import { Users, Bell, Home, PlusCircle } from "lucide-react";
// import { supabase } from "../supabaseClient";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
// } from "recharts";

// interface Stat {
//   title: string;
//   value: number | string;
//   icon: React.ElementType;
// }

// interface ChartData {
//   month: string;
//   enquiries: number;
//   properties: number;
//   reminders: number;
// }

// export default function Dashboard() {
//   const [, setLocation] = useLocation();
//   const [stats, setStats] = useState<Stat[]>([]);
//   const [monthlyData, setMonthlyData] = useState<ChartData[]>([]);
//   const [todayReminders, setTodayReminders] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   // 🔹 1. Fetch user session (redirect if not logged in)
//   useEffect(() => {
//     async function fetchUser() {
//       const {
//         data: { session },
//         error,
//       } = await supabase.auth.getSession();
//       if (error) console.error("Error fetching session:", error.message);
//       if (!session?.user) setLocation("/login");
//     }
//     fetchUser();
//   }, [setLocation]);

//   // 🔹 2. Fetch totals for stat cards
//   useEffect(() => {
//     async function fetchStats() {
//       setLoading(true);
//       try {
//         const {
//           data: { user },
//           error: userError,
//         } = await supabase.auth.getUser();
//         if (userError || !user) {
//           console.error("User not authenticated", userError);
//           setLoading(false);
//           return;
//         }
//         const userId = user.id;

//         // Get company_id
//         const { data: userProfile, error: profileError } = await supabase
//           .from("users")
//           .select("company_id")
//           .eq("id", userId)
//           .maybeSingle();
//         if (profileError || !userProfile) {
//           console.error("User profile not found", profileError);
//           setLoading(false);
//           return;
//         }
//         const companyId = userProfile.company_id;

//         // Fetch counts filtered by company_id
//         const { count: enquiriesCount } = await supabase
//           .from("enquiries")
//           .select("id", { count: "exact" })
//           .eq("company_id", companyId);

//         const { count: remindersCount } = await supabase
//           .from("reminders")
//           .select("id", { count: "exact" })
//           .eq("status", "pending")
//           .eq("company_id", companyId);

//         const { count: propertiesCount } = await supabase
//           .from("properties")
//           .select("id", { count: "exact" })
//           .eq("company_id", companyId);

//         setStats([
//   { title: "Total Enquiries", value: enquiriesCount || 0, icon: Users },
//   { title: "Pending Reminders", value: remindersCount || 0, icon: Bell },
//   { title: "Properties Listed", value: propertiesCount || 0, icon: Home },
//   { title: "Today's Follow-ups", value: todayFollowupsCount || 0, icon: Calendar }, // new stat
// ]);

//       } catch (err) {
//         console.error("Error fetching stats:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchStats();
//   }, []);

//   // 🔹 3. Fetch monthly trend data
//   useEffect(() => {
//     async function fetchMonthlyTrend() {
//       try {
//         const {
//           data: { user },
//           error: userError,
//         } = await supabase.auth.getUser();
//         if (userError || !user) return;

//         const userId = user.id;

//         const { data: userProfile, error: profileError } = await supabase
//           .from("users")
//           .select("company_id")
//           .eq("id", userId)
//           .maybeSingle();
//         if (profileError || !userProfile) return;

//         const companyId = userProfile.company_id;

//         const countByMonth = (rows: any[]) => {
//           const counts = new Array(12).fill(0);
//           rows.forEach((r) => {
//             if (!r.created_at) return;
//             const month = new Date(r.created_at).getMonth();
//             counts[month]++;
//           });
//           return counts;
//         };

//         const [enquiries, properties, reminders] = await Promise.all([
//           supabase
//             .from("enquiries")
//             .select("created_at")
//             .eq("company_id", companyId),
//           supabase
//             .from("properties")
//             .select("created_at")
//             .eq("company_id", companyId),
//           supabase
//             .from("reminders")
//             .select("created_at")
//             .eq("company_id", companyId),
//         ]);

//         const enquiryCounts = countByMonth(enquiries.data || []);
//         const propertyCounts = countByMonth(properties.data || []);
//         const reminderCounts = countByMonth(reminders.data || []);

//         const months = [
//           "Jan",
//           "Feb",
//           "Mar",
//           "Apr",
//           "May",
//           "Jun",
//           "Jul",
//           "Aug",
//           "Sep",
//           "Oct",
//           "Nov",
//           "Dec",
//         ];

//         const chartData = months.map((m, i) => ({
//           month: m,
//           enquiries: enquiryCounts[i],
//           properties: propertyCounts[i],
//           reminders: reminderCounts[i],
//         }));

//         setMonthlyData(chartData);
//       } catch (err) {
//         console.error("Error fetching monthly trend:", err);
//       }
//     }
//     fetchMonthlyTrend();
//   }, []);

//   // 🔹 4. Fetch today's follow-ups (reminders)
//   useEffect(() => {
//     async function fetchTodayReminders() {
//       try {
//         const {
//           data: { user },
//           error: userError,
//         } = await supabase.auth.getUser();
//         if (userError || !user) return;

//         const userId = user.id;

//         // Get company_id
//         const { data: userProfile } = await supabase
//           .from("users")
//           .select("company_id")
//           .eq("id", userId)
//           .maybeSingle();
//         const companyId = userProfile?.company_id;
//         if (!companyId) return;

//         const today = new Date();
//         const yyyy = today.getFullYear();
//         const mm = String(today.getMonth() + 1).padStart(2, "0");
//         const dd = String(today.getDate()).padStart(2, "0");
//         const todayStr = `${yyyy}-${mm}-${dd}`;

//         const { data, error } = await supabase
//           .from("reminders")
//           .select("*")
//           .eq("company_id", companyId)
//           .eq("status", "pending")
//           .eq("date", todayStr)
//           .order("created_at", { ascending: true });

//         if (!error && data) {
//           // Convert time to IST
//           function convertTimeToIST(time: string) {
//             if (!time) return "—";

//             // Accept both "HH:mm" and "HH:mm:ss"
//             const [h, m] = time.split(":");

//             if (!h || !m) return "—";

//             let hours = parseInt(h, 10);
//             let minutes = parseInt(m, 10);

//             if (isNaN(hours) || isNaN(minutes)) return "—";

//             const ampm = hours >= 12 ? "PM" : "AM";
//             hours = hours % 12 || 12;

//             return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
//           }

//           const converted = data.map((r) => ({
//             ...r,
//             time_ist: convertTimeToIST(r.time),
//           }));

//           setTodayReminders(converted);
//         }
//       } catch (err) {
//         console.error("Error fetching today's reminders:", err);
//       }
//     }

//     fetchTodayReminders();
//   }, []);

//   if (loading) return <p className="p-4">Loading dashboard...</p>;

//   const pieData = stats.map((s) => ({
//     name: s.title,
//     value: typeof s.value === "number" ? s.value : 0,
//   }));
//   const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

//   return (
//     <div className="space-y-8 p-4">
//       <h2 className="text-2xl md:text-3xl font-bold text-primary">Dashboard</h2>
//       <p className="text-muted-foreground mb-4">
//         Welcome back! Here's your overview
//       </p>

//       {/* STAT CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {stats.map((stat, i) => (
//           <StatCard
//             key={i}
//             title={stat.title}
//             value={stat.value}
//             icon={stat.icon}
//           />
//         ))}
//       </div>

//       {/* CHARTS */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* PIE CHART */}
//         <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4">
//           <h3 className="text-lg font-semibold mb-4 text-center">
//             Overall Summary
//           </h3>
//           <div className="h-72">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                   label
//                 >
//                   {pieData.map((_, index) => (
//                     <Cell key={index} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* LINE CHART (Monthly Trend) */}
//         <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 lg:col-span-2">
//           <h3 className="text-lg font-semibold mb-4 text-center">
//             Monthly Trends
//           </h3>
//           <div className="h-72">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={monthlyData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line
//                   type="monotone"
//                   dataKey="enquiries"
//                   stroke="#8884d8"
//                   strokeWidth={2}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="reminders"
//                   stroke="#82ca9d"
//                   strokeWidth={2}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="properties"
//                   stroke="#ffc658"
//                   strokeWidth={2}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* QUICK ACTIONS */}
//       <div>
//         <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           <QuickActionCard
//             title="Browse Properties"
//             description="View available properties for sale"
//             icon={Home}
//             onClick={() => setLocation("/properties")}
//           />
//           <QuickActionCard
//             title="Add Enquiry"
//             description="Create a new lead or enquiry"
//             icon={Users}
//             onClick={() => setLocation("/enquiries")}
//           />
//           <QuickActionCard
//             title="Set Reminder"
//             description="Schedule a follow-up reminder"
//             icon={Bell}
//             onClick={() => setLocation("/reminders")}
//           />
//           <QuickActionCard
//             title="List Property"
//             description="Add a new property listing"
//             icon={PlusCircle}
//             onClick={() => setLocation("/properties")}
//           />
//         </div>
//       </div>

//       {/* TODAY'S FOLLOW-UPS */}
//       <div className="mt-8">
//         <h3 className="text-lg font-semibold mb-4">Today's Follow-ups</h3>
//         {todayReminders.length === 0 ? (
//           <p className="text-muted-foreground">
//             No follow-ups scheduled for today.
//           </p>
//         ) : (
//           <ul className="space-y-2">
//             {todayReminders.map((r) => (
//               <li
//                 key={r.id}
//                 className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800"
//               >
//                 <div>
//                   <p className="font-medium">{r.title || "No Title"}</p>
//                   <p className="text-sm text-muted-foreground">
//                     {r.notes || "No description"}
//                   </p>
//                   {r.client_name && (
//                     <p className="text-sm text-muted-foreground">
//                       <span className="font-semibold">Client:</span>{" "}
//                       {r.client_name}
//                     </p>
//                   )}
//                 </div>
//                 <span className="text-sm font-semibold text-primary">
//                   {r.time_ist || "—"}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import StatCard from "@/components/StatCard";
import QuickActionCard from "@/components/QuickActionCard";
import { Users, Bell, Home, PlusCircle, Calendar } from "lucide-react";
import { supabase } from "../supabaseClient";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

interface Stat {
  title: string;
  value: number | string;
  icon: React.ElementType;
}

interface ChartData {
  month: string;
  enquiries: number;
  properties: number;
  reminders: number;
}

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [stats, setStats] = useState<Stat[]>([]);
  const [monthlyData, setMonthlyData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 1. Fetch user session (redirect if not logged in)
  useEffect(() => {
    async function fetchUser() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) console.error("Error fetching session:", error.message);
      if (!session?.user) setLocation("/login");
    }
    fetchUser();
  }, [setLocation]);

  // 🔹 2. Fetch totals for stat cards
  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError || !user) {
          console.error("User not authenticated", userError);
          setLoading(false);
          return;
        }
        const userId = user.id;

        // Get company_id
        const { data: userProfile, error: profileError } = await supabase
          .from("users")
          .select("company_id")
          .eq("id", userId)
          .maybeSingle();
        if (profileError || !userProfile) {
          console.error("User profile not found", profileError);
          setLoading(false);
          return;
        }
        const companyId = userProfile.company_id;

        // Fetch counts filtered by company_id
        const { count: enquiriesCount } = await supabase
          .from("enquiries")
          .select("id", { count: "exact" })
          .eq("company_id", companyId);

        const { count: remindersCount } = await supabase
          .from("reminders")
          .select("id", { count: "exact" })
          .eq("status", "pending")
          .eq("company_id", companyId);

        const { count: propertiesCount } = await supabase
          .from("properties")
          .select("id", { count: "exact" })
          .eq("company_id", companyId);

        // Fetch today's follow-ups count
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        const todayStr = `${yyyy}-${mm}-${dd}`;

        const { count: todayFollowupsCount } = await supabase
          .from("reminders")
          .select("id", { count: "exact" })
          .eq("status", "pending")
          .eq("company_id", companyId)
          .eq("date", todayStr);

        // Set all stats together
        setStats([
          { title: "Total Enquiries", value: enquiriesCount || 0, icon: Users },
          { title: "Pending Reminders", value: remindersCount || 0, icon: Bell },
          { title: "Properties Listed", value: propertiesCount || 0, icon: Home },
          { title: "Today's Follow-ups", value: todayFollowupsCount || 0, icon: Calendar },
        ]);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  // 🔹 3. Fetch monthly trend data
  useEffect(() => {
    async function fetchMonthlyTrend() {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError || !user) return;

        const userId = user.id;

        const { data: userProfile, error: profileError } = await supabase
          .from("users")
          .select("company_id")
          .eq("id", userId)
          .maybeSingle();
        if (profileError || !userProfile) return;

        const companyId = userProfile.company_id;

        const countByMonth = (rows: any[]) => {
          const counts = new Array(12).fill(0);
          rows.forEach((r) => {
            if (!r.created_at) return;
            const month = new Date(r.created_at).getMonth();
            counts[month]++;
          });
          return counts;
        };

        const [enquiries, properties, reminders] = await Promise.all([
          supabase
            .from("enquiries")
            .select("created_at")
            .eq("company_id", companyId),
          supabase
            .from("properties")
            .select("created_at")
            .eq("company_id", companyId),
          supabase
            .from("reminders")
            .select("created_at")
            .eq("company_id", companyId),
        ]);

        const enquiryCounts = countByMonth(enquiries.data || []);
        const propertyCounts = countByMonth(properties.data || []);
        const reminderCounts = countByMonth(reminders.data || []);

        const months = [
          "Jan","Feb","Mar","Apr","May","Jun",
          "Jul","Aug","Sep","Oct","Nov","Dec",
        ];

        const chartData = months.map((m, i) => ({
          month: m,
          enquiries: enquiryCounts[i],
          properties: propertyCounts[i],
          reminders: reminderCounts[i],
        }));

        setMonthlyData(chartData);
      } catch (err) {
        console.error("Error fetching monthly trend:", err);
      }
    }
    fetchMonthlyTrend();
  }, []);

  if (loading) return <p className="p-4">Loading dashboard...</p>;

 const pieData = stats
  .filter((s) => s.title !== "Today's Follow-ups") // exclude today's follow-ups
  .map((s) => ({
    name: s.title,
    value: typeof s.value === "number" ? s.value : 0,
  }));

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  return (
    <div className="space-y-8 p-4 mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-primary">Dashboard</h2>
      <p className="text-muted-foreground mb-4">
        Welcome back! Here's your overview
      </p>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard
            key={i}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PIE CHART */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Overall Summary
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* LINE CHART (Monthly Trend) */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Monthly Trends
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="enquiries"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="reminders"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="properties"
                  stroke="#ffc658"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <QuickActionCard
            title="Browse Properties"
            description="View available properties for sale"
            icon={Home}
            onClick={() => setLocation("/properties")}
          />
          <QuickActionCard
            title="Add Enquiry"
            description="Create a new lead or enquiry"
            icon={Users}
            onClick={() => setLocation("/enquiries")}
          />
          <QuickActionCard
            title="Set Reminder"
            description="Schedule a follow-up reminder"
            icon={Bell}
            onClick={() => setLocation("/reminders")}
          />
          <QuickActionCard
            title="List Property"
            description="Add a new property listing"
            icon={PlusCircle}
            onClick={() => setLocation("/properties")}
          />
        </div>
      </div>
    </div>
  );
}
