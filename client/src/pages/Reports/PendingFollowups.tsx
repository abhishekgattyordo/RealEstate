

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button"; // Assuming you have a Button component
// import { getUsersReport } from "@/services/reportService";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import autoTable from "jspdf-autotable";

// export default function PendingFollowups() {
//   const [data, setData] = useState<any[]>([]);
//   const navigate = useNavigate();

//   const downloadPDF = () => {
//     const doc = new jsPDF();

//     // Add Title
//     doc.setFontSize(16);
//     doc.text("Pending Followups Report", 10, 10);

//     // Prepare Data
//     const headers = [["Name", "Date", "Time", "Notes"]];
//     const rows = data.map((r) => [
//       r.name,
//       r.date,
//       r.time ? formatTime(r.time) : "-",
//       r.notes || "-",
//     ]);

//     // Generate AutoTable
//     autoTable(doc, {
//       startY: 20,
//       head: headers,
//       body: rows,
//       theme: "grid",
//     headStyles: { fillColor: [73, 17, 128] },
//  // primary color
//     });

//     doc.save("pending_followups.pdf");
//   };

//   useEffect(() => {
//     getUsersReport()
//       .then((res) => {
//         console.log("API response:", res); // Log the full response
//         console.log("Pending data:", res?.pending); // Log only the pending array

//         if (res?.pending) {
//           setData(res.pending);
//         } else {
//           console.warn("No pending data found in the API response");
//           setData([]); // optional, clear data if none
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching report:", err);
//       });
//   }, []);

//   // Function to format time
//   const formatTime = (timeStr: string | undefined) => {
//     console.log("Original timeStr:", timeStr); // log the raw time string

//     if (!timeStr) return "-";

//     const date = new Date(`1970-01-01T${timeStr}`);
//     console.log("Parsed Date object:", date); // log the Date object

//     if (isNaN(date.getTime())) return "-";

//     let hours = date.getHours();
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const ampm = hours >= 12 ? "PM" : "AM";
//     hours = hours % 12 || 12;

//     const formattedTime = `${hours}:${minutes} ${ampm}`;
//     console.log("Formatted time:", formattedTime); // log the final formatted time

//     return formattedTime;
//   };

//   return (
//     <div className="p-6">
//       {/* Back Button */}
//       <div className="flex items-center gap-4 mb-4">
//         {/* Back Button - Left Side */}
//         <Button variant="outline" onClick={() => navigate("/reports")}>
//           ← Back
//         </Button>

//         {/* Push to Right */}
//         <div className="ml-auto">
//           <Button
//             className="bg-primary text-white hover:bg-primary/90"
//             onClick={downloadPDF}
//           >
//             Download PDF
//           </Button>
//         </div>
//       </div>

//       <Card className="p-6">
//         <CardHeader>
//           <CardTitle className="text-xl font-semibold">
//             Pending Followups
//           </CardTitle>
//         </CardHeader>

//         <CardContent>
//           {data.length === 0 ? (
//             <p className="text-center">No pending followups found.</p>
//           ) : (
//             <table className="w-full border text-center">
//               <thead className="bg-primary text-white">
//                 <tr>
//                   <th className="px-4 py-2">Name</th>
//                   <th className="px-4 py-2">Date</th>
//                   <th className="px-4 py-2">Time</th>
//                   <th className="px-4 py-2">Notes</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.map((r) => (
//                   <tr key={r.id} className="border">
//                     <td className="px-4 py-2">{r.name}</td>
//                     <td className="px-4 py-2">{r.date}</td>
//                     <td className="px-4 py-2">
//                       {r.time ? formatTime(r.time) : "-"}
//                     </td>
//                     <td className="px-4 py-2">{r.notes || "-"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }





import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { getUsersReport } from "@/services/reportService";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

export default function PendingFollowups() {
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate();

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add Title
    doc.setFontSize(16);
    doc.text("Pending Followups Report", 10, 10);

    // Prepare Data
    const headers = [["Name", "Date", "Time", "Notes"]];
    const rows = data.map((r) => [
      r.name,
      r.date,
      r.time ? formatTime(r.time) : "-",
      r.notes || "-",
    ]);

    // Generate AutoTable
    autoTable(doc, {
      startY: 20,
      head: headers,
      body: rows,
      theme: "grid",
    headStyles: { fillColor: [73, 17, 128] },
 // primary color
    });

    doc.save("pending_followups.pdf");
  };

  useEffect(() => {
    getUsersReport()
      .then((res) => {
        console.log("API response:", res); // Log the full response
        console.log("Pending data:", res?.pending); // Log only the pending array

        if (res?.pending) {
          setData(res.pending);
        } else {
          console.warn("No pending data found in the API response");
          setData([]); // optional, clear data if none
        }
      })
      .catch((err) => {
        console.error("Error fetching report:", err);
      });
  }, []);

  // Function to format time
  const formatTime = (timeStr: string | undefined) => {
    console.log("Original timeStr:", timeStr); // log the raw time string

    if (!timeStr) return "-";

    const date = new Date(`1970-01-01T${timeStr}`);
    console.log("Parsed Date object:", date); // log the Date object

    if (isNaN(date.getTime())) return "-";

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    const formattedTime = `${hours}:${minutes} ${ampm}`;
    console.log("Formatted time:", formattedTime); // log the final formatted time

    return formattedTime;
  };

  return (
    <div className="p-6">
      {/* Back Button */}
      <div className="flex items-center gap-4 mb-4">
        {/* Back Button - Left Side */}
        <Button variant="outline" onClick={() => navigate("/reports")}>
          ← Back
        </Button>

        {/* Push to Right */}
        <div className="ml-auto">
          <Button
            className="bg-primary text-white hover:bg-primary/90"
            onClick={downloadPDF}
          >
            Download PDF
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Pending Followups
          </CardTitle>
        </CardHeader>

        <CardContent>
          {data.length === 0 ? (
            <p className="text-center">No pending followups found.</p>
          ) : (
            <div className="overflow-x-auto w-full">
  <table className="w-full border text-center min-w-[600px]">
    <thead className="bg-primary text-white">
      <tr>
        <th className="px-4 py-2">Name</th>
        <th className="px-4 py-2">Date</th>
        <th className="px-4 py-2">Time</th>
        <th className="px-4 py-2">Notes</th>
      </tr>
    </thead>
    <tbody>
      {data.map((r) => (
        <tr key={r.id} className="border">
          <td className="px-4 py-2">{r.name}</td>
          <td className="px-4 py-2">{r.date}</td>
          <td className="px-4 py-2">
            {r.time ? formatTime(r.time) : "-"}
          </td>
          <td className="px-4 py-2">{r.notes || "-"}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

          )}
        </CardContent>
      </Card>
    </div>
  );
}
