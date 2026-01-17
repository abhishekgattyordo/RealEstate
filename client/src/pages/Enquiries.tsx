


// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import EnquiryCard from "@/components/EnquiryCard";
// import EnquiryForm from "@/components/EnquiryForm";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Plus } from "lucide-react";
// import { supabase } from "@/supabaseClient";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

// interface Enquiry {
//   id: string;
//   user_id?: string;
//   name: string;
//   mobile_number: string;
//   listing_type: string;
//   location: string;
//   type: "buy" | "sell";
//   budget?: string;
//   selling_rate?: string;
//   date: string;
//   referred_by?: string;
//   remarks?: string;
//    property_id?: string;
//     status_name?: string;
// }

// export default function Enquiries() {
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [activeTab, setActiveTab] = useState("all");
//   const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

//   // ---- Pagination State (Changed) ----
// const [page, setPage] = useState(1); // for "All" tab
// const [buyPage, setBuyPage] = useState(1);
// const [sellPage, setSellPage] = useState(1);
// const [rentPage, setRentPage] = useState(1);
// const [pageSize] = useState(6); // rows per page, changed from 10 to 5
// const [totalRows, setTotalRows] = useState(0); // total rows for "All" tab

  

//   const fetchEnquiries = async () => {
//   setLoading(true);
//   try {
//     // 1️⃣ Get logged-in user
//     const { data: userData } = await supabase.auth.getUser();
//     const userId = userData?.user?.id;
//     if (!userId) {
//       setEnquiries([]);
//       setLoading(false);
//       return;
//     }

//     // 2️⃣ Get company_id
//     const { data: userProfile, error: profileError } = await supabase
//       .from("users")
//       .select("company_id")
//       .eq("id", userId)
//       .single();

//     if (profileError || !userProfile) {
//       console.error("User profile not found", profileError);
//       setEnquiries([]);
//       setLoading(false);
//       return;
//     }

//     const companyId = userProfile.company_id;

//     const from = (page - 1) * pageSize;
//     const to = from + pageSize - 1;

//     // 3️⃣ Fetch enquiries with status_name via foreign key
//     const { data, count, error } = await supabase
//       .from("enquiries")
//       .select(`
//         *,
//         enquiry_status:status_id(status_name)
//       `, { count: "exact" })  // status_id is FK
//       .eq("company_id", companyId)
//       .order("date", { ascending: false })
//       .range(from, to);

//     if (error) {
//       console.error("Error fetching enquiries:", error.message);
//       setEnquiries([]);
//     } else if (data) {
//       // Map status_name directly for easier rendering
//       const enriched = (data as any[]).map((e) => ({
//         ...e,
//         status_name: e.enquiry_status?.status_name || "-",
//       }));

//       setEnquiries(enriched);
//       setTotalRows(count || 0);
//     }
//   } catch (err) {
//     console.error(err);
//   } finally {
//     setLoading(false);
//   }
// };


//   useEffect(() => {
//     fetchEnquiries();
//   }, [page]); // Re-fetch when page changes

//   const handleAddEnquiry = (newEnquiry: any) => {
//     fetchEnquiries();
//     setShowAddForm(false);
//   };

//   const handleEdit = (id: string) => {
//     const enquiry = enquiries.find((e) => e.id === id);
//     if (enquiry) {
//       setSelectedEnquiry(enquiry);
//       setShowEditForm(true);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     const confirmDelete = confirm("Are you sure you want to delete this enquiry?");
//     if (!confirmDelete) return;

//     const { error } = await supabase.from("enquiries").delete().eq("id", id);
//     if (!error) setEnquiries((prev) => prev.filter((e) => e.id !== id));
//   };

//   const handleUpdateEnquiry = async (updatedData: any) => {
//     if (!selectedEnquiry) return;
//     const { data, error: userError } = await supabase.auth.getUser();
//     const userId = data?.user?.id;
//     if (!userId) return;

//     const { error } = await supabase
//       .from("enquiries")
//       .update(updatedData)
//       .eq("id", selectedEnquiry.id)
//       .eq("user_id", userId);

//     if (!error) {
//       fetchEnquiries();
//       setShowEditForm(false);
//     }
//   };

//   const exportToExcel = async () => {
//   // Prepare array to hold rows with property titles
//   const exportData = await Promise.all(
//     enquiries.map(async (e) => {
//       let propertyTitle = "-";

//       if (e.property_id) {
//         const { data, error } = await supabase
//           .from("properties")
//           .select("title")
//           .eq("id", e.property_id)
//           .single();

//         if (!error && data) {
//           propertyTitle = data.title;
//         }
//       }

//       return {
//         Name: e.name,
//         Listing: e.listing_type,
//         Property: propertyTitle,
//         Mobile: e.mobile_number,
//         Location: e.location,
//         Budget: e.budget ?? e.selling_rate ?? "-",
//         Date: e.date.split("T")[0],
//         Referred: e.referred_by ?? "-",
//       };
//     })
//   );

//   // Create worksheet
//   const worksheet = XLSX.utils.json_to_sheet(exportData);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");

//   // Export
//   const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
//   const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
//   saveAs(blob, "Enquiries.xlsx");
// };

//   // ---- Filter and paginate tabs (Changed) ----
//   const filteredBuyEnquiries = enquiries.filter((e) => e.listing_type === "buy");
//   const filteredSellEnquiries = enquiries.filter((e) => e.listing_type === "sell");
//   const filteredRentEnquiries = enquiries.filter((e) => e.listing_type === "rent");

//   const paginatedBuyEnquiries = filteredBuyEnquiries.slice(
//     (buyPage - 1) * pageSize,
//     buyPage * pageSize
//   );

//   const paginatedSellEnquiries = filteredSellEnquiries.slice(
//     (sellPage - 1) * pageSize,
//     sellPage * pageSize
//   );
//   const paginatedRentEnquiries = filteredRentEnquiries.slice(
//   (rentPage - 1) * pageSize,
//   rentPage * pageSize
// );


// const HeaderRow = () => (
//   <div className="grid grid-cols-12 gap-2 items-center py-3 font-semibold text-white bg-primary border-b border-gray-300 text-sm">
//     <div className="col-span-1 px-2">Name</div>
//     <div className="col-span-1 px-2">Type</div>
//     <div className="col-span-2 px-2">Property</div>
//     <div className="col-span-1 px-2">Mobile</div>
//     <div className="col-span-2 px-2">Location</div>
//     <div className="col-span-1 px-2">Amount</div>
//     <div className="col-span-1 px-2">Date</div>
//     <div className="col-span-1 px-2">Referred</div>
//     <div className="col-span-1 px-2">Status</div>  
//     <div className="col-span-1 px-2 text-right">Actions</div>
//   </div>
// );


//   return (
//     <div className="space-y-6">
//       {/* Header */}
//     <div className="flex items-center justify-between gap-4 flex-wrap">
//   <div>
//     <h2 className="text-2xl md:text-3xl font-bold text-primary">
//       Enquiries
//     </h2>
//     <p className="text-muted-foreground">
//       Manage your leads and enquiries
//     </p>
//   </div>
//   <div className="flex gap-2">
//     <Button
//       onClick={() => setShowAddForm(true)}
//       data-testid="button-add-enquiry"
//     >
//       <Plus className="h-4 w-4 mr-2" />
//       Add Enquiry
//     </Button>
//     <Button onClick={exportToExcel}>Export to Excel</Button>
//   </div>
// </div>


//       {/* Tabs */}
//       <Tabs value={activeTab} onValueChange={setActiveTab}>
//         <TabsList className="grid w-full grid-cols-4 max-w-md">
//           <TabsTrigger value="all">All</TabsTrigger>
//           <TabsTrigger value="buy">Buy</TabsTrigger>
//           <TabsTrigger value="sell">Sell</TabsTrigger>
//            <TabsTrigger value="rent">Rent</TabsTrigger>
//         </TabsList>

//         {/* ALL TAB */}
//         <TabsContent value="all" className="mt-6 w-full">
//           <div className="w-full overflow-x-auto">
//             <HeaderRow />
//             <div className="space-y-2 w-full">
//               {enquiries.map((enquiry) => (
//                 <EnquiryCard
//                   key={enquiry.id}
//                   {...enquiry}
//                   onEdit={handleEdit}
//                   onDelete={handleDelete}
//                   onCall={(mobile) => console.log("Call:", mobile)}
//                 />
//               ))}
//             </div>
//           </div>
//           {/* Pagination Controls */}
//           <div className="flex justify-end items-center gap-2 mt-4">
//             <Button onClick={() => setPage(page - 1)} disabled={page === 1} size="sm">
//               Previous
//             </Button>
//             <span>Page {page} of {Math.ceil(totalRows / pageSize)}</span>
//             <Button
//               onClick={() => setPage(page + 1)}
//               disabled={page >= Math.ceil(totalRows / pageSize)}
//               size="sm"
//             >
//               Next
//             </Button>
//           </div>
//         </TabsContent>

//         {/* BUY TAB */}
//         <TabsContent value="buy" className="mt-6 w-full">
//           <div className="w-full overflow-x-auto">
//             <HeaderRow />
//             <div className="space-y-2 w-full">
//               {paginatedBuyEnquiries.map((enquiry) => (
//                 <EnquiryCard
//                   key={enquiry.id}
//                   {...enquiry}
//                   onEdit={handleEdit}
//                   onDelete={handleDelete}
//                   onCall={(mobile) => console.log("Call:", mobile)}
//                 />
//               ))}
//             </div>
//           </div>
//           <div className="flex justify-end items-center gap-2 mt-4">
//             <Button onClick={() => setBuyPage(buyPage - 1)} disabled={buyPage === 1} size="sm">
//               Previous
//             </Button>
//             <span>Page {buyPage} of {Math.ceil(filteredBuyEnquiries.length / pageSize)}</span>
//             <Button
//               onClick={() => setBuyPage(buyPage + 1)}
//               disabled={buyPage >= Math.ceil(filteredBuyEnquiries.length / pageSize)}
//               size="sm"
//             >
//               Next
//             </Button>
//           </div>
//         </TabsContent>

//         {/* SELL TAB */}
//         <TabsContent value="sell" className="mt-6 w-full">
//           <div className="w-full overflow-x-auto">
//             <HeaderRow />
//             <div className="space-y-2 w-full">
//               {paginatedSellEnquiries.map((enquiry) => (
//                 <EnquiryCard
//                   key={enquiry.id}
//                   {...enquiry}
//                   onEdit={handleEdit}
//                   onDelete={handleDelete}
//                   onCall={(mobile) => console.log("Call:", mobile)}
//                 />
//               ))}
//             </div>
//           </div>
//           <div className="flex justify-end items-center gap-2 mt-4">
//             <Button onClick={() => setSellPage(sellPage - 1)} disabled={sellPage === 1} size="sm">
//               Previous
//             </Button>
//             <span>Page {sellPage} of {Math.ceil(filteredSellEnquiries.length / pageSize)}</span>
//             <Button
//               onClick={() => setSellPage(sellPage + 1)}
//               disabled={sellPage >= Math.ceil(filteredSellEnquiries.length / pageSize)}
//               size="sm"
//             >
//               Next
//             </Button>
//           </div>
//         </TabsContent>
// {/* RENT TAB */}
// <TabsContent value="rent" className="mt-6 w-full">
//   <div className="w-full overflow-x-auto">
//     <HeaderRow />
//     <div className="space-y-2 w-full">
//       {paginatedRentEnquiries.map((enquiry) => (
//         <EnquiryCard
//           key={enquiry.id}
//           {...enquiry}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//           onCall={(mobile) => console.log("Call:", mobile)}
//         />
//       ))}
//     </div>
//   </div>

//   {/* Pagination */}
//   <div className="flex justify-end items-center gap-2 mt-4">
//     <Button onClick={() => setRentPage(rentPage - 1)} disabled={rentPage === 1} size="sm">
//       Previous
//     </Button>
//     <span>
//       Page {rentPage} of {Math.ceil(filteredRentEnquiries.length / pageSize)}
//     </span>
//     <Button
//       onClick={() => setRentPage(rentPage + 1)}
//       disabled={rentPage >= Math.ceil(filteredRentEnquiries.length / pageSize)}
//       size="sm"
//     >
//       Next
//     </Button>
//   </div>
// </TabsContent>


//       </Tabs>

      

//       {/* Add/Edit Dialogs */}
//       <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
//         <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle>Add New Enquiry</DialogTitle>
//           </DialogHeader>
//           <EnquiryForm onSubmit={handleAddEnquiry} onCancel={() => setShowAddForm(false)} />
//         </DialogContent>
//       </Dialog>

//       <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
//         <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle>Edit Enquiry</DialogTitle>
//           </DialogHeader>
//           {selectedEnquiry && (
//             <EnquiryForm
//               defaultValues={selectedEnquiry}
//               onSubmit={handleUpdateEnquiry}
//               onCancel={() => setShowEditForm(false)}
//             />
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EnquiryCard from "@/components/EnquiryCard";
import EnquiryForm from "@/components/EnquiryForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { supabase } from "@/supabaseClient";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface Enquiry {
  id: string;
  user_id?: string;
  name: string;
  mobile_number: string;
  listing_type: string;
  location: string;
  type: "buy" | "sell";
  budget?: string;
  selling_rate?: string;
  date: string;
  referred_by?: string;
  remarks?: string;
  property_id?: string;
  status_name?: string;
}

export default function Enquiries() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  // Pagination State
  const [page, setPage] = useState(1);
  const [buyPage, setBuyPage] = useState(1);
  const [sellPage, setSellPage] = useState(1);
  const [rentPage, setRentPage] = useState(1);
  const [pageSize] = useState(6);
  const [totalRows, setTotalRows] = useState(0);

  // State for mobile view
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is typical tablet breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;
      if (!userId) {
        setEnquiries([]);
        setLoading(false);
        return;
      }

      const { data: userProfile, error: profileError } = await supabase
        .from("users")
        .select("company_id")
        .eq("id", userId)
        .single();

      if (profileError || !userProfile) {
        console.error("User profile not found", profileError);
        setEnquiries([]);
        setLoading(false);
        return;
      }

      const companyId = userProfile.company_id;
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, count, error } = await supabase
        .from("enquiries")
        .select(
          `
          *,
          enquiry_status:status_id(status_name)
        `,
          { count: "exact" }
        )
        .eq("company_id", companyId)
        .order("date", { ascending: false })
        .range(from, to);

      if (error) {
        console.error("Error fetching enquiries:", error.message);
        setEnquiries([]);
      } else if (data) {
        const enriched = (data as any[]).map((e) => ({
          ...e,
          status_name: e.enquiry_status?.status_name || "-",
        }));
        setEnquiries(enriched);
        setTotalRows(count || 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [page]);

  const handleAddEnquiry = (newEnquiry: any) => {
    fetchEnquiries();
    setShowAddForm(false);
  };

  const handleEdit = (id: string) => {
    const enquiry = enquiries.find((e) => e.id === id);
    if (enquiry) {
      setSelectedEnquiry(enquiry);
      setShowEditForm(true);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this enquiry?"
    );
    if (!confirmDelete) return;

    const { error } = await supabase.from("enquiries").delete().eq("id", id);
    if (!error) setEnquiries((prev) => prev.filter((e) => e.id !== id));
  };

  const handleUpdateEnquiry = async (updatedData: any) => {
    if (!selectedEnquiry) return;
    const { data, error: userError } = await supabase.auth.getUser();
    const userId = data?.user?.id;
    if (!userId) return;

    const { error } = await supabase
      .from("enquiries")
      .update(updatedData)
      .eq("id", selectedEnquiry.id)
      .eq("user_id", userId);

    if (!error) {
      fetchEnquiries();
      setShowEditForm(false);
    }
  };

  const exportToExcel = async () => {
    const exportData = await Promise.all(
      enquiries.map(async (e) => {
        let propertyTitle = "-";

        if (e.property_id) {
          const { data, error } = await supabase
            .from("properties")
            .select("title")
            .eq("id", e.property_id)
            .single();

          if (!error && data) {
            propertyTitle = data.title;
          }
        }

        return {
          Name: e.name,
          Type: e.listing_type,
          Property: propertyTitle,
          Mobile: e.mobile_number,
          Location: e.location,
          Budget: e.budget ?? e.selling_rate ?? "-",
          Date: e.date.split("T")[0],
          Referred: e.referred_by ?? "-",
          Status: e.status_name ?? "-",
        };
      })
    );

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(blob, "Enquiries.xlsx");
  };

  // Filter and paginate tabs
  const filteredBuyEnquiries = enquiries.filter(
    (e) => e.listing_type === "buy"
  );
  const filteredSellEnquiries = enquiries.filter(
    (e) => e.listing_type === "sell"
  );
  const filteredRentEnquiries = enquiries.filter(
    (e) => e.listing_type === "rent"
  );

  const paginatedBuyEnquiries = filteredBuyEnquiries.slice(
    (buyPage - 1) * pageSize,
    buyPage * pageSize
  );

  const paginatedSellEnquiries = filteredSellEnquiries.slice(
    (sellPage - 1) * pageSize,
    sellPage * pageSize
  );
  const paginatedRentEnquiries = filteredRentEnquiries.slice(
    (rentPage - 1) * pageSize,
    rentPage * pageSize
  );

  // Mobile Card View Component
  const MobileEnquiryCard = ({ enquiry }: { enquiry: Enquiry }) => (
    <div className="bg-white rounded-lg border shadow-sm p-4 mb-3">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            {enquiry.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              {enquiry.listing_type}
            </span>
            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
              {enquiry.status_name || "-"}
            </span>
          </div>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(enquiry.date).toLocaleDateString()}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
        <div>
          <span className="text-gray-500">Mobile:</span>
          <div className="font-medium">{enquiry.mobile_number}</div>
        </div>
        <div>
          <span className="text-gray-500">Location:</span>
          <div className="font-medium truncate">{enquiry.location}</div>
        </div>
        <div>
          <span className="text-gray-500">Amount:</span>
          <div className="font-medium">
            {enquiry.budget || enquiry.selling_rate || "-"}
          </div>
        </div>
        <div>
          <span className="text-gray-500">Referred:</span>
          <div className="font-medium">{enquiry.referred_by || "-"}</div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-3 border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleEdit(enquiry.id)}
          className="text-xs"
        >
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDelete(enquiry.id)}
          className="text-xs"
        >
          Delete
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => console.log("Call:", enquiry.mobile_number)}
          className="text-xs"
        >
          Call
        </Button>
      </div>
    </div>
  );

  // Desktop Table Header
  const HeaderRow = () => (
    <div className="hidden md:grid grid-cols-12 gap-2 items-center py-3 font-semibold text-white bg-primary border-b border-gray-300 text-sm">
      <div className="col-span-1 px-2">Name</div>
      <div className="col-span-1 px-2">Type</div>
      <div className="col-span-2 px-2">Property</div>
      <div className="col-span-1 px-2">Mobile</div>
      <div className="col-span-2 px-2">Location</div>
      <div className="col-span-1 px-2">Amount</div>
      <div className="col-span-1 px-2">Date</div>
      <div className="col-span-1 px-2">Referred</div>
      <div className="col-span-1 px-2">Status</div>
      <div className="col-span-1 px-2 text-right">Actions</div>
    </div>
  );

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading enquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 mb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            Enquiries
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Manage your leads and enquiries
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setShowAddForm(true)}
            data-testid="button-add-enquiry"
            className="w-full md:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Enquiry
          </Button>
          <Button
            onClick={exportToExcel}
            variant="outline"
            className="w-full md:w-auto"
          >
            Export to Excel
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto">
          <TabsTrigger value="all" className="text-xs md:text-sm">
            All
          </TabsTrigger>
          <TabsTrigger value="buy" className="text-xs md:text-sm">
            Buy
          </TabsTrigger>
          <TabsTrigger value="sell" className="text-xs md:text-sm">
            Sell
          </TabsTrigger>
          <TabsTrigger value="rent" className="text-xs md:text-sm">
            Rent
          </TabsTrigger>
        </TabsList>

        {/* ALL TAB */}
        <TabsContent value="all" className="mt-6">
          {isMobile ? (
            <div className="space-y-3">
              {enquiries.map((enquiry) => (
                <MobileEnquiryCard key={enquiry.id} enquiry={enquiry} />
              ))}
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <HeaderRow />
              <div className="space-y-2 w-full">
                {enquiries.map((enquiry) => (
                  <EnquiryCard
                    key={enquiry.id}
                    {...enquiry}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onCall={(mobile) => console.log("Call:", mobile)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <div className="text-sm text-gray-600">
              Showing {Math.min(pageSize, enquiries.length)} of {totalRows}{" "}
              enquiries
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                size="sm"
                variant="outline"
                className="text-xs"
              >
                Previous
              </Button>
              <span className="text-sm font-medium">
                Page {page} of {Math.ceil(totalRows / pageSize)}
              </span>
              <Button
                onClick={() => setPage(page + 1)}
                disabled={page >= Math.ceil(totalRows / pageSize)}
                size="sm"
                variant="outline"
                className="text-xs"
              >
                Next
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* BUY TAB */}
        <TabsContent value="buy" className="mt-6">
          {isMobile ? (
            <div className="space-y-3">
              {paginatedBuyEnquiries.map((enquiry) => (
                <MobileEnquiryCard key={enquiry.id} enquiry={enquiry} />
              ))}
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <HeaderRow />
              <div className="space-y-2 w-full">
                {paginatedBuyEnquiries.map((enquiry) => (
                  <EnquiryCard
                    key={enquiry.id}
                    {...enquiry}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onCall={(mobile) => console.log("Call:", mobile)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <div className="text-sm text-gray-600">
              Showing {paginatedBuyEnquiries.length} of{" "}
              {filteredBuyEnquiries.length} buy enquiries
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setBuyPage(buyPage - 1)}
                disabled={buyPage === 1}
                size="sm"
                variant="outline"
                className="text-xs"
              >
                Previous
              </Button>
              <span className="text-sm font-medium">
                Page {buyPage} of{" "}
                {Math.ceil(filteredBuyEnquiries.length / pageSize)}
              </span>
              <Button
                onClick={() => setBuyPage(buyPage + 1)}
                disabled={buyPage >= Math.ceil(filteredBuyEnquiries.length / pageSize)}
                size="sm"
                variant="outline"
                className="text-xs"
              >
                Next
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* SELL TAB */}
        <TabsContent value="sell" className="mt-6">
          {isMobile ? (
            <div className="space-y-3">
              {paginatedSellEnquiries.map((enquiry) => (
                <MobileEnquiryCard key={enquiry.id} enquiry={enquiry} />
              ))}
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <HeaderRow />
              <div className="space-y-2 w-full">
                {paginatedSellEnquiries.map((enquiry) => (
                  <EnquiryCard
                    key={enquiry.id}
                    {...enquiry}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onCall={(mobile) => console.log("Call:", mobile)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <div className="text-sm text-gray-600">
              Showing {paginatedSellEnquiries.length} of{" "}
              {filteredSellEnquiries.length} sell enquiries
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setSellPage(sellPage - 1)}
                disabled={sellPage === 1}
                size="sm"
                variant="outline"
                className="text-xs"
              >
                Previous
              </Button>
              <span className="text-sm font-medium">
                Page {sellPage} of{" "}
                {Math.ceil(filteredSellEnquiries.length / pageSize)}
              </span>
              <Button
                onClick={() => setSellPage(sellPage + 1)}
                disabled={sellPage >= Math.ceil(filteredSellEnquiries.length / pageSize)}
                size="sm"
                variant="outline"
                className="text-xs"
              >
                Next
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* RENT TAB */}
        <TabsContent value="rent" className="mt-6">
          {isMobile ? (
            <div className="space-y-3">
              {paginatedRentEnquiries.map((enquiry) => (
                <MobileEnquiryCard key={enquiry.id} enquiry={enquiry} />
              ))}
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <HeaderRow />
              <div className="space-y-2 w-full">
                {paginatedRentEnquiries.map((enquiry) => (
                  <EnquiryCard
                    key={enquiry.id}
                    {...enquiry}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onCall={(mobile) => console.log("Call:", mobile)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <div className="text-sm text-gray-600">
              Showing {paginatedRentEnquiries.length} of{" "}
              {filteredRentEnquiries.length} rent enquiries
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setRentPage(rentPage - 1)}
                disabled={rentPage === 1}
                size="sm"
                variant="outline"
                className="text-xs"
              >
                Previous
              </Button>
              <span className="text-sm font-medium">
                Page {rentPage} of{" "}
                {Math.ceil(filteredRentEnquiries.length / pageSize)}
              </span>
              <Button
                onClick={() => setRentPage(rentPage + 1)}
                disabled={rentPage >= Math.ceil(filteredRentEnquiries.length / pageSize)}
                size="sm"
                variant="outline"
                className="text-xs"
              >
                Next
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* No Data State */}
      {enquiries.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-4xl mb-4">📋</div>
          <h3 className="text-lg font-semibold text-gray-600">
            No enquiries found
          </h3>
          <p className="text-gray-500 mt-2">
            Get started by adding your first enquiry
          </p>
          <Button
            onClick={() => setShowAddForm(true)}
            className="mt-4"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Enquiry
          </Button>
        </div>
      )}

      {/* Add/Edit Dialogs */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Enquiry</DialogTitle>
          </DialogHeader>
          <EnquiryForm
            onSubmit={handleAddEnquiry}
            onCancel={() => setShowAddForm(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Enquiry</DialogTitle>
          </DialogHeader>
          {selectedEnquiry && (
            <EnquiryForm
              defaultValues={selectedEnquiry}
              onSubmit={handleUpdateEnquiry}
              onCancel={() => setShowEditForm(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}