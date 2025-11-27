// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { getUsersReport } from "@/services/reportService";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import autoTable from "jspdf-autotable";

// export default function LostLeads() {
//   const [data, setData] = useState<any[]>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getUsersReport().then((res) => {
//       if (res) setData(res.lost);
//     });
//   }, []);

//   const totalLeads = data.length;

//   const downloadPDF = () => {
//     const doc = new jsPDF();

//     doc.setFontSize(16);
//     doc.text("Lost Leads Report", 14, 15);

//     const headers = [["Name", "Property", "Mobile", "Date"]];

//     const rows = data.map((e) => [
//       e.name,
//       e.properties?.title || "-",
//       e.mobile_number,
//       e.date || "-",
//     ]);

//     autoTable(doc, {
//       startY: 25,
//       head: headers,
//       body: rows,
//        theme: "grid",
//     headStyles: {
//       fillColor: [73, 17, 128], // primary color
//       textColor: [255, 255, 255], // white text
//       fontStyle: "bold",
//     },
//     margin: { top: 20 },
//     });

//     doc.save("lost-leads-report.pdf");
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
//           <CardTitle className="text-xl font-semibold">Lost Leads</CardTitle>
//         </CardHeader>

//         <CardContent>
//           {totalLeads === 0 ? (
//             <p>No lost leads found.</p>
//           ) : (
//             <>
//               {/* Total Leads */}
//               <p className="mb-4 font-semibold">
//                 Total Lost Leads: {totalLeads}
//               </p>

//               {/* Leads Table */}
//               <table className="w-full border text-center">
//                 <thead className="bg-primary text-white">
//                   <tr>
//                     <th className="px-4 py-2">Name</th>
//                     <th className="px-4 py-2">Property</th>
//                     <th className="px-4 py-2">Mobile</th>
//                     <th className="px-4 py-2">Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {data.map((e) => (
//                     <tr key={e.id} className="border">
//                       <td className="px-4 py-2">{e.name}</td>
//                       <td className="px-4 py-2">
//                         {e.properties?.title || "-"}
//                       </td>
//                       <td className="px-4 py-2">{e.mobile_number}</td>
//                       <td className="px-4 py-2">{e.date}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </>
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
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

export default function LostLeads() {
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsersReport().then((res) => {
      if (res) setData(res.lost);
    });
  }, []);

  const totalLeads = data.length;

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Lost Leads Report", 14, 15);

    const headers = [["Name", "Property", "Mobile", "Date"]];

    const rows = data.map((e) => [
      e.name,
      e.properties?.title || "-",
      e.mobile_number,
      e.date || "-",
    ]);

    autoTable(doc, {
      startY: 25,
      head: headers,
      body: rows,
      theme: "grid",
      headStyles: {
        fillColor: [73, 17, 128], // primary color
        textColor: [255, 255, 255], // white text
        fontStyle: "bold",
      },
      margin: { top: 20 },
    });

    doc.save("lost-leads-report.pdf");
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
          <CardTitle className="text-xl font-semibold">Lost Leads</CardTitle>
        </CardHeader>

        <CardContent>
          {totalLeads === 0 ? (
            <p>No lost leads found.</p>
          ) : (
            <>
              {/* Total Leads */}
              <p className="mb-4 font-semibold">
                Total Lost Leads: {totalLeads}
              </p>

              {/* Leads Table */}
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
                    {data.map((e) => (
                      <tr key={e.id} className="border">
                        <td className="px-4 py-2">{e.name}</td>
                        <td className="px-4 py-2">
                          {e.properties?.title || "-"}
                        </td>
                        <td className="px-4 py-2">{e.mobile_number}</td>
                        <td className="px-4 py-2">{e.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
