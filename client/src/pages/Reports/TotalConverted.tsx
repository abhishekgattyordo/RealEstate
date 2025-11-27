

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button"; // Import your button component
// import { getUsersReport } from "@/services/reportService";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import autoTable from "jspdf-autotable";

// export default function TotalConverted() {
//   const [data, setData] = useState<any[]>([]);
//   const navigate = useNavigate();

  

//   useEffect(() => {
//     getUsersReport().then((res) => {
//       if (res) setData(res.converted);
//     });
//   }, []);

//    const downloadPDF = () => {
//     const doc = new jsPDF();

//     // Title
//     doc.setFontSize(16);
//     doc.text("Total Converted Leads Report", 10, 10);

//     // Prepare Table
//     const headers = [["Name", "Property", "Mobile", "Date"]];
//     const rows = data.map((e) => [
//       e.name,
//       e.property_name || "-", // Use enriched property_name
//       e.mobile_number,
//       e.date,
//     ]);

//     autoTable(doc, {
//       startY: 20,
//       head: headers,
//       body: rows,
//       theme: "grid",
//     headStyles: { fillColor: [73, 17, 128] }, // primary color
//     });

//     doc.save("total_converted_leads.pdf");
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
//             Total Converted Leads
//           </CardTitle>
//         </CardHeader>

//         <CardContent>
//           {data.length === 0 ? (
//             <p>No converted leads found.</p>
//           ) : (
//             <table className="w-full border text-center">
//               <thead className="bg-primary text-white">
//                 <tr>
//                   <th className="px-4 py-2">Name</th>
//                   <th className="px-4 py-2">Property</th>
//                   <th className="px-4 py-2">Mobile</th>
//                    <th className="px-4 py-2">Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.map((e) => (
//                   <tr key={e.id} className="border">
//                     <td className="px-4 py-2">{e.name}</td>
//                      <td className="px-4 py-2">{e.properties?.title || "-"}</td>
//                     <td className="px-4 py-2">{e.mobile_number}</td>
//                     <td className="px-4 py-2">{e.date}</td>
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
import { Button } from "@/components/ui/button"; // Import your button component
import { getUsersReport } from "@/services/reportService";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

export default function TotalConverted() {
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate();

  

  useEffect(() => {
    getUsersReport().then((res) => {
      if (res) setData(res.converted);
    });
  }, []);

   const downloadPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text("Total Converted Leads Report", 10, 10);

    // Prepare Table
    const headers = [["Name", "Property", "Mobile", "Date"]];
    const rows = data.map((e) => [
      e.name,
      e.property_name || "-", // Use enriched property_name
      e.mobile_number,
      e.date,
    ]);

    autoTable(doc, {
      startY: 20,
      head: headers,
      body: rows,
      theme: "grid",
    headStyles: { fillColor: [73, 17, 128] }, // primary color
    });

    doc.save("total_converted_leads.pdf");
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
            Total Converted Leads
          </CardTitle>
        </CardHeader>

        <CardContent>
          {data.length === 0 ? (
            <p>No converted leads found.</p>
          ) : (
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
          <td className="px-4 py-2">{e.properties?.title || "-"}</td>
          <td className="px-4 py-2">{e.mobile_number}</td>
          <td className="px-4 py-2">{e.date}</td>
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
