

// import React, { useState, useEffect } from "react";
// import { getUsersReport } from "@/services/reportService";

// const UsersReport = () => {
//   const [report, setReport] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getUsersReport().then((data) => {
//       setReport(data);
//       setLoading(false);
//     });
//   }, []);

//   if (loading)
//     return (
//       <p className="p-8 text-center text-gray-500 font-medium text-lg">
//         Loading report...
//       </p>
//     );

//   const renderNames = (list: any[]) =>
//     list && list.length ? list.map((e) => e.name).join(", ") : "-";

//   const renderProperties = (list: any[]) =>
//     list && list.length
//       ? list.map((e) => e.properties?.title || "-").join(", ")
//       : "-";

//   const renderMobiles = (list: any[]) =>
//     list && list.length ? list.map((e) => e.mobile_number || "-").join(", ") : "-";

//   const renderLocationNames = (byLocation: Record<string, any[]>) =>
//     Object.keys(byLocation)
//       .map((loc) => `${loc}: ${byLocation[loc].map((e) => e.name).join(", ")}`)
//       .join("; ");

//   const renderLocationMobiles = (byLocation: Record<string, any[]>) =>
//     Object.keys(byLocation)
//       .map((loc) => `${loc}: ${byLocation[loc].map((e) => e.mobile_number || "-").join(", ")}`)
//       .join("; ");

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
    
//       </h2>

//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-sm overflow-hidden">
//           <thead className="bg-primary">
//             <tr>
//               {["Category", "Total", "Name", "Property Name", "Mobile Number"].map(
//                 (header) => (
//                   <th
//                     key={header}
//                         className="text-left px-6 py-3 text-white font-medium text-sm uppercase tracking-wider"
//                   >
//                     {header}
//                   </th>
//                 )
//               )}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {/* Pending Followups */}
//             <tr className="hover:bg-blue-50 transition">
//               <td className="px-6 py-3 font-semibold text-gray-800">
//                 Pending Followups
//               </td>
//               <td className="px-6 py-3">{report?.pending?.length ?? 0}</td>
//               <td className="px-6 py-3">{renderNames(report?.pending)}</td>
//               <td className="px-6 py-3">-</td>
//               <td className="px-6 py-3">-</td>
//             </tr>

//             {/* Total Converted */}
//             <tr className="hover:bg-green-50 transition">
//               <td className="px-6 py-3 font-semibold text-gray-800">Total Converted</td>
//               <td className="px-6 py-3">{report?.converted?.length ?? 0}</td>
//               <td className="px-6 py-3">{renderNames(report?.converted)}</td>
//               <td className="px-6 py-3">{renderProperties(report?.converted)}</td>
//               <td className="px-6 py-3">{renderMobiles(report?.converted)}</td>
//             </tr>

//             {/* Lost Leads */}
//             <tr className="hover:bg-red-50 transition">
//               <td className="px-6 py-3 font-semibold text-gray-800">Lost Leads</td>
//               <td className="px-6 py-3">{report?.lost?.length ?? 0}</td>
//               <td className="px-6 py-3">{renderNames(report?.lost)}</td>
//               <td className="px-6 py-3">{renderProperties(report?.lost)}</td>
//               <td className="px-6 py-3">{renderMobiles(report?.lost)}</td>
//             </tr>

//             {/* Total Leads by Location */}
//             <tr className="hover:bg-yellow-50 transition">
//               <td className="px-6 py-3 font-semibold text-gray-800">Total Leads by Location</td>
//               <td className="px-6 py-3">
//                 {report?.byLocation ? Object.values(report.byLocation).flat().length : 0}
//               </td>
//               <td className="px-6 py-3">
//                 {report?.byLocation ? renderLocationNames(report.byLocation) : "-"}
//               </td>
//               <td className="px-6 py-3">-</td>
//               <td className="px-6 py-3">
//                 {report?.byLocation ? renderLocationMobiles(report.byLocation) : "-"}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UsersReport;
import React, { useState, useEffect } from "react";
import { getUsersReport } from "@/services/reportService";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const UsersReport = () => {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsersReport().then((data) => {
      setReport(data);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <p className="p-8 text-center text-gray-500 font-medium text-lg">
        Loading report...
      </p>
    );

  const renderNames = (list: any[]) =>
    list && list.length ? list.map((e) => e.name).join(", ") : "-";

  const renderProperties = (list: any[]) =>
    list && list.length
      ? list.map((e) => e.property_name || "-").join(", ")
      : "-";

  const renderMobiles = (list: any[]) =>
    list && list.length ? list.map((e) => e.mobile_number || "-").join(", ") : "-";

  const renderLocationNames = (byLocation: Record<string, any[]>) =>
    Object.keys(byLocation)
      .map((loc) => `${loc}: ${byLocation[loc].map((e) => e.name).join(", ")}`)
      .join("; ");

  const renderLocationMobiles = (byLocation: Record<string, any[]>) =>
    Object.keys(byLocation)
      .map((loc) => `${loc}: ${byLocation[loc].map((e) => e.mobile_number || "-").join(", ")}`)
      .join("; ");

  // 📌 PDF download function
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Enquiries Report", 14, 22);

    const tableColumn = ["Category", "Total", "Name", "Property Name", "Mobile Number"];
    const tableRows: any[] = [];

    // Pending Followups
    tableRows.push([
      "Pending Followups",
      report?.pending?.length ?? 0,
      renderNames(report?.pending),
      "-",
      "-"
    ]);

    // Converted
    tableRows.push([
      "Total Converted",
      report?.converted?.length ?? 0,
      renderNames(report?.converted),
      renderProperties(report?.converted),
      renderMobiles(report?.converted)
    ]);

    // Lost Leads
    tableRows.push([
      "Lost Leads",
      report?.lost?.length ?? 0,
      renderNames(report?.lost),
      renderProperties(report?.lost),
      renderMobiles(report?.lost)
    ]);

    // Leads by Location
    tableRows.push([
      "Total Leads by Location",
      report?.byLocation ? Object.values(report.byLocation).flat().length : 0,
      report?.byLocation ? renderLocationNames(report.byLocation) : "-",
      "-",
      report?.byLocation ? renderLocationMobiles(report.byLocation) : "-"
    ]);

    // ✅ Correct autoTable usage
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [0, 92, 175] }, // optional (blue header)
    });

    doc.save("enquiries_report.pdf");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
          Enquiries Report
        </h2>
        <button
          onClick={downloadPDF}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Download PDF
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-sm overflow-hidden">
          <thead className="bg-primary">
            <tr>
              {["Category", "Total", "Name", "Property Name", "Mobile Number"].map(
                (header) => (
                  <th
                    key={header}
                    className="text-left px-6 py-3 text-white font-medium text-sm uppercase tracking-wider"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-blue-50 transition">
              <td className="px-6 py-3 font-semibold text-gray-800">Pending Followups</td>
              <td className="px-6 py-3">{report?.pending?.length ?? 0}</td>
              <td className="px-6 py-3">{renderNames(report?.pending)}</td>
              <td className="px-6 py-3">-</td>
              <td className="px-6 py-3">-</td>
            </tr>

            <tr className="hover:bg-green-50 transition">
              <td className="px-6 py-3 font-semibold text-gray-800">Total Converted</td>
              <td className="px-6 py-3">{report?.converted?.length ?? 0}</td>
              <td className="px-6 py-3">{renderNames(report?.converted)}</td>
              <td className="px-6 py-3">{renderProperties(report?.converted)}</td>
              <td className="px-6 py-3">{renderMobiles(report?.converted)}</td>
            </tr>

            <tr className="hover:bg-red-50 transition">
              <td className="px-6 py-3 font-semibold text-gray-800">Lost Leads</td>
              <td className="px-6 py-3">{report?.lost?.length ?? 0}</td>
              <td className="px-6 py-3">{renderNames(report?.lost)}</td>
              <td className="px-6 py-3">{renderProperties(report?.lost)}</td>
              <td className="px-6 py-3">{renderMobiles(report?.lost)}</td>
            </tr>

            <tr className="hover:bg-yellow-50 transition">
              <td className="px-6 py-3 font-semibold text-gray-800">Total Leads by Location</td>
              <td className="px-6 py-3">
                {report?.byLocation ? Object.values(report.byLocation).flat().length : 0}
              </td>
              <td className="px-6 py-3">
                {report?.byLocation ? renderLocationNames(report.byLocation) : "-"}
              </td>
              <td className="px-6 py-3">-</td>
              <td className="px-6 py-3">
                {report?.byLocation ? renderLocationMobiles(report.byLocation) : "-"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersReport;
