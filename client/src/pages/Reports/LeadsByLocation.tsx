// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { getUsersReport } from "@/services/reportService";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// export default function LeadsByLocation() {
//   const [data, setData] = useState<any>({});
//   const navigate = useNavigate();

// useEffect(() => {
//   getUsersReport()
//     .then((res) => {
//       if (!res) {
//         console.warn("API response is null or undefined");
//         setData({});
//         return;
//       }

//       console.log("Full API response:", res);
//       console.log("byLocation data:", res.byLocation);

//       if (res.byLocation) {
//         setData(res.byLocation);
//       } else {
//         console.warn("No byLocation data found in API response");
//         setData({});
//       }
//     })
//     .catch((err) => {
//       console.error("Error fetching report:", err);
//       setData({});
//     });
// }, []);

//   const locations = Object.keys(data);

//   const downloadPDF = () => {
//   const doc = new jsPDF();

//   doc.setFontSize(16);
//   doc.text("Leads by Location Report", 14, 15);

//   let currentY = 25;

//   Object.keys(data).forEach((location) => {
//     const leads = data[location];

//     // Section Title
//     doc.setFontSize(14);
//     doc.text(`${location} (Total: ${leads.length})`, 14, currentY);
//     currentY += 6;

//     // Generate table rows
//     const rows = leads.map((e: any) => [
//       e.name || "-",
//       e.properties?.title || "-",
//       e.mobile_number || "-",
//     ]);

//     // Cast doc to any to access lastAutoTable
//     (autoTable as any)(doc, {
//       startY: currentY,
//       head: [["Name", "Property", "Mobile"]],
//       body: rows,
//       margin: { top: 20 },
//       theme: "grid",
//        headStyles: {
//         fillColor: [73, 17, 128], // deep purple (#491180)
//         textColor: [255, 255, 255], // optional: white text
//         fontStyle: "bold"
//       },
//     });

//     // Update Y position for next table
//     currentY = (doc as any).lastAutoTable?.finalY + 10 || currentY + 20;
//   });

//   doc.save("leads-by-location-report.pdf");
// };

//   return (
//     <div className="p-6">
//       {/* Back Button */}
//      <div className="flex items-center gap-4 mb-4">
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
//           <CardTitle className="text-xl font-semibold">Leads by Location</CardTitle>
//         </CardHeader>

//         <CardContent>
//           {locations.length === 0 ? (
//             <p>No leads found by location.</p>
//           ) : (
//             locations.map((loc) => {
//               const totalLeads = data[loc].length;

//               return (
//                 <div key={loc} className="mb-6">
//                   {/* Location Header with total leads */}
//                   <h2 className="font-semibold text-lg mb-1">{loc}</h2>
//                   <p className="mb-2">Total Leads: {totalLeads}</p>

//                   <table className="w-full border text-center">
//                     <thead className="bg-primary text-white">
//                       <tr>
//                         <th className="px-4 py-2">Name</th>
//                         <th className="px-4 py-2">Property</th>
//                         <th className="px-4 py-2">Mobile</th>
//                           <th className="px-4 py-2">Date</th>
//                       </tr>
//                     </thead>

//                     <tbody>
//                       {data[loc].map((e: any) => (
//                         <tr key={e.id} className="border">
//                           <td className="px-4 py-2">{e.name}</td>
//                          <td className="px-4 py-2">{e.property_name || "-"}</td>
//                           <td className="px-4 py-2">{e.mobile_number}</td>
//                           <td className="px-4 py-2">{e.date}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               );
//             })
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getUsersReport } from "@/services/reportService";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function LeadsByLocation() {
  const [data, setData] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    getUsersReport()
      .then((res) => {
        if (!res) {
          console.warn("API response is null or undefined");
          setData({});
          return;
        }

        console.log("Full API response:", res);
        console.log("byLocation data:", res.byLocation);

        if (res.byLocation) {
          setData(res.byLocation);
        } else {
          console.warn("No byLocation data found in API response");
          setData({});
        }
      })
      .catch((err) => {
        console.error("Error fetching report:", err);
        setData({});
      });
  }, []);

  const locations = Object.keys(data);

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Leads by Location Report", 14, 15);

    let currentY = 25;

    Object.keys(data).forEach((location) => {
      const leads = data[location];

      // Section Title
      doc.setFontSize(14);
      doc.text(`${location} (Total: ${leads.length})`, 14, currentY);
      currentY += 6;

      // Generate table rows
      const rows = leads.map((e: any) => [
        e.name || "-",
        e.properties?.title || "-",
        e.mobile_number || "-",
      ]);

      // Cast doc to any to access lastAutoTable
      (autoTable as any)(doc, {
        startY: currentY,
        head: [["Name", "Property", "Mobile"]],
        body: rows,
        margin: { top: 20 },
        theme: "grid",
        headStyles: {
          fillColor: [73, 17, 128], // deep purple (#491180)
          textColor: [255, 255, 255], // optional: white text
          fontStyle: "bold",
        },
      });

      // Update Y position for next table
      currentY = (doc as any).lastAutoTable?.finalY + 10 || currentY + 20;
    });

    doc.save("leads-by-location-report.pdf");
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
            Leads by Location
          </CardTitle>
        </CardHeader>

        <CardContent>
          {locations.length === 0 ? (
            <p>No leads found by location.</p>
          ) : (
            locations.map((loc) => {
              const totalLeads = data[loc].length;

              return (
                <div key={loc} className="mb-6">
                  {/* Location Header with total leads */}
                  <h2 className="font-semibold text-lg mb-1">{loc}</h2>
                  <p className="mb-2">Total Leads: {totalLeads}</p>

                  <div className="overflow-x-auto w-full">
                    <table className="w-full border text-center min-w-[600px]">
                      <thead className="bg-primary text-white">
                        <tr>
                          <th className="px-4 py-2">Name</th>
                          <th className="px-4 py-2">Property</th>
                          <th className="px-4 py-2">Mobile</th>
                          <th className="px-4 py-2">Date</th>
                        </tr>
                      </thead>

                      <tbody>
                        {data[loc].map((e: any) => (
                          <tr key={e.id} className="border">
                            <td className="px-4 py-2">{e.name}</td>
                            <td className="px-4 py-2">
                              {e.property_name || "-"}
                            </td>
                            <td className="px-4 py-2">{e.mobile_number}</td>
                            <td className="px-4 py-2">{e.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}
