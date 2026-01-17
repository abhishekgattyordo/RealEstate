



// // src/services/reportsService.ts
// import { supabase } from "@/supabaseClient";

// export const getUsersReport = async () => {
//   try {
//     // 1️⃣ Get logged-in user
//     const { data: userData } = await supabase.auth.getUser();
//     const userId = userData?.user?.id;
//     if (!userId) return null;

//     // 2️⃣ Get company_id of the user
//     const { data: userProfile } = await supabase
//       .from("users")
//       .select("company_id")
//       .eq("id", userId)
//       .single();
//     if (!userProfile) return null;
//     const companyId = userProfile.company_id;

//     // 3️⃣ Fetch all enquiries with property title
//     const { data: enquiries } = await supabase
//       .from("enquiries")
//       .select(`
//         id,
//         name,
//         mobile_number,
//         date,
//         location,
//         status_id,
//         property_id,
//         properties!inner(title)
//       `)
//       .eq("company_id", companyId);

//     if (!enquiries) return {
//       pending: [],
//       followupCompleted: [],
//       converted: [],
//       lost: [],
//       byLocation: {}
//     };

//     // 4️⃣ Helper: add property_name to each enquiry
//     const enrichProperty = (list: any[]) =>
//       list.map(e => ({
//         ...e,
//         property_name: e.properties?.[0]?.title || "-", // ✅ Access first element
//       }));

//     // 5️⃣ Separate enquiries by status
//     const pending = enrichProperty(enquiries.filter(e => e.status_id === 2)); // Pending Followup
//     const followupCompleted = enrichProperty(enquiries.filter(e => e.status_id === 3)); // Followup Completed
//     const converted = enrichProperty(enquiries.filter(e => e.status_id === 4)); // Converted
//     const lost = enrichProperty(enquiries.filter(e => e.status_id === 6)); // Lost

//     // 6️⃣ Group enquiries by location
//     const byLocation: Record<string, any[]> = {};
//     enquiries.forEach(e => {
//       const loc = e.location || "Unknown";
//       if (!byLocation[loc]) byLocation[loc] = [];
//       byLocation[loc].push({
//         id: e.id,
//         name: e.name,
//         mobile_number: e.mobile_number,
//         property_name: e.properties?.[0]?.title || "-",
//       });
//     });

//     return { pending, followupCompleted, converted, lost, byLocation };
//   } catch (err) {
//     console.error("Error fetching report:", err);
//     return null;
//   }
// };


// // src/services/reportsService.ts
// import { supabase } from "@/supabaseClient";

// export const getUsersReport = async () => {
//   try {
//     // 1️⃣ Get logged-in user
//     const { data: userData } = await supabase.auth.getUser();
//     const userId = userData?.user?.id;
//     if (!userId) return null;

//     // 2️⃣ Get company_id of the user
//     const { data: userProfile } = await supabase
//       .from("users")
//       .select("company_id")
//       .eq("id", userId)
//       .single();
//     if (!userProfile) return null;
//     const companyId = userProfile.company_id;

//     // 3️⃣ Fetch pending followups from reminders table (exclude completed)
//     const { data: reminders } = await supabase
//       .from("reminders")
//       .select(`
//         id,
//         client_name,
//         date,
//         time,
//         notes,
//         status
//       `)
//       .eq("company_id", companyId)
//       .is("deleted_at", null)
//       .neq("status", "completed") // only pending/not completed
//       .order("date", { ascending: true });

//     const pending = reminders?.map(r => ({
//       id: r.id,
//       name: r.client_name || "-",
//       mobile_number: "-", // optional: join with enquiries if you want real mobile
//       property_name: "-", // optional
//       date: r.date,
//       time: r.time, 
//       notes: r.notes
//     })) || [];

//     // 4️⃣ Fetch all enquiries with property title
//     const { data: enquiries } = await supabase
//       .from("enquiries")
//       .select(`
//         id,
//         name,
//         mobile_number,
//         date,
//         location,
//         status_id,
//         property_id,
//         properties!inner(title)
//       `)
//       .eq("company_id", companyId);

//     if (!enquiries) return { pending, followupCompleted: [], converted: [], lost: [], byLocation: {} };

// const getPropertyTitle = (p: any) => {
//   if (!p) return "-";
//   if (Array.isArray(p)) return p[0]?.title || "-";
//   return p.title || "-";
// };


//     // 5️⃣ Helper: add property_name to each enquiry
// const enrichProperty = (list: any[]) =>
//   list.map(e => ({
//     ...e,
//     property_name: getPropertyTitle(e.properties)
//   }));



//     // 6️⃣ Separate enquiries by status
//     const followupCompleted = enrichProperty(enquiries.filter(e => e.status_id === 3));
//     const converted = enrichProperty(enquiries.filter(e => e.status_id === 4));
//     const lost = enrichProperty(enquiries.filter(e => e.status_id === 6));

//     // 7️⃣ Group enquiries by location
//    // 7️⃣ Group enquiries by location
// const byLocation: Record<string, any[]> = {};

// enquiries.forEach(e => {
//   const loc = e.location || "Unknown";

//   if (!byLocation[loc]) byLocation[loc] = [];

// byLocation[loc].push({
//   id: e.id,
//   name: e.name,
//    date: e.date, 
//   mobile_number: e.mobile_number,
//   property_name: getPropertyTitle(e.properties)
// });

// });


//     return { pending, followupCompleted, converted, lost, byLocation };
//   } catch (err) {
//     console.error("Error fetching report:", err);
//     return null;
//   }
// };





// src/services/reportsService.ts
import { supabase } from "@/supabaseClient";

export const getUsersReport = async () => {
  try {
    // 1️⃣ Get logged-in user
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;
    if (!userId) return null;

    // 2️⃣ Get company_id of the user
    const { data: userProfile } = await supabase
      .from("users")
      .select("company_id")
      .eq("id", userId)
      .single();
    if (!userProfile) return null;
    const companyId = userProfile.company_id;

   
    

  

    // 4️⃣ Fetch all enquiries with property title
    const { data: enquiries } = await supabase
      .from("enquiries")
      .select(`
        id,
        name,
        mobile_number,
        date,
        location,
        status_id,
        property_id,
        budget,
        properties!inner(title)
      `)
      .eq("company_id", companyId);

    if (!enquiries) return {  pending: [], followupCompleted: [], converted: [], lost: [], byLocation: {} };

const getPropertyTitle = (p: any) => {
  if (!p) return "-";
  if (Array.isArray(p)) return p[0]?.title || "-";
  return p.title || "-";
};


    // 5️⃣ Helper: add property_name to each enquiry
const enrichProperty = (list: any[]) =>
  list.map(e => ({
    ...e,
    property_name: getPropertyTitle(e.properties)
  }));



    const pending = enrichProperty(enquiries.filter(e => e.status_id === 2)); // Pending Followup

    const followupCompleted = enrichProperty(enquiries.filter(e => e.status_id === 3));
    const converted = enrichProperty(enquiries.filter(e => e.status_id === 4));
    const lost = enrichProperty(enquiries.filter(e => e.status_id === 6));

    // 7️⃣ Group enquiries by location
   // 7️⃣ Group enquiries by location
const byLocation: Record<string, any[]> = {};

enquiries.forEach(e => {
  const loc = e.location || "Unknown";

  if (!byLocation[loc]) byLocation[loc] = [];

byLocation[loc].push({
  id: e.id,
  name: e.name,
   date: e.date, 
  mobile_number: e.mobile_number,
  property_name: getPropertyTitle(e.properties)
});

});


    return { pending, followupCompleted, converted, lost, byLocation };
  } catch (err) {
    console.error("Error fetching report:", err);
    return null;
  }
};