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
//            <div className="overflow-x-auto w-full">
//   <table className="w-full border text-center min-w-[600px]">
//     <thead className="bg-primary text-white">
//       <tr>
//         <th className="px-4 py-2">Name</th>
//         <th className="px-4 py-2">Property</th>
//         <th className="px-4 py-2">Mobile</th>
//         <th className="px-4 py-2">Date</th>
//       </tr>
//     </thead>
//     <tbody>
//       {data.map((e) => (
//         <tr key={e.id} className="border">
//           <td className="px-4 py-2">{e.name}</td>
//           <td className="px-4 py-2">{e.properties?.title || "-"}</td>
//           <td className="px-4 py-2">{e.mobile_number}</td>
//           <td className="px-4 py-2">{e.date}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>

//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getUsersReport } from "@/services/reportService";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";

// Import Recharts for charts
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

export default function TotalConverted() {
  const [data, setData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any>(null);
  const navigate = useNavigate();

  // Refs for capturing charts as images
  const pieChartRef = useRef<HTMLDivElement>(null);
  const barChartRef = useRef<HTMLDivElement>(null);
  const areaChartRef = useRef<HTMLDivElement>(null);

  // Process data for charts
  const processChartData = (convertedLeads: any[]) => {
    if (!convertedLeads.length) return null;

    // Group by property for pie chart
    const propertyCounts: Record<string, number> = {};
    // Group by date for bar chart
    const dateCounts: Record<string, number> = {};
    // Group by month for area chart
    const monthCounts: Record<string, number> = {};
    // Calculate conversion value if available
    let totalConversionValue = 0;
    let highestValueConversion = { name: "", value: 0 };

    convertedLeads.forEach((item) => {
      // Count by property
      const property =
        item.properties?.title || item.property_name || "Unknown Property";
      propertyCounts[property] = (propertyCounts[property] || 0) + 1;

      // Count by date
      if (item.date) {
        dateCounts[item.date] = (dateCounts[item.date] || 0) + 1;

        // Extract month for area chart
        const month = new Date(item.date).toLocaleDateString("en-US", {
          month: "short",
          year: "2-digit",
        });
        monthCounts[month] = (monthCounts[month] || 0) + 1;
      }

      // Calculate conversion value (assuming there's a value field)
      if (item.conversion_value) {
        totalConversionValue += parseFloat(item.conversion_value) || 0;
        const currentValue = parseFloat(item.conversion_value) || 0;
        if (currentValue > highestValueConversion.value) {
          highestValueConversion = { name: item.name, value: currentValue };
        }
      }
    });

    // Prepare pie chart data (top 10 properties)
    const pieData = Object.entries(propertyCounts)
      .map(([property, count]) => ({
        name:
          property.length > 20 ? `${property.substring(0, 17)}...` : property,
        value: count,
        fullProperty: property,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);

    // Prepare bar chart data (sort by date, last 30 days)
    const barData = Object.entries(dateCounts)
      .map(([date, count]) => ({
        date,
        count,
        formattedDate: new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-30); // Last 30 days

    // Prepare area chart data (sort by month)
    const areaData = Object.entries(monthCounts)
      .map(([month, count]) => ({
        month,
        count,
        fullMonth: month,
      }))
      .sort((a, b) => {
        const monthOrder = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const aMonth = a.month.split(" ")[0];
        const bMonth = b.month.split(" ")[0];
        return monthOrder.indexOf(aMonth) - monthOrder.indexOf(bMonth);
      });

    return {
      pieData,
      barData,
      areaData,
      totalLeads: convertedLeads.length,
      totalConversionValue,
      highestValueConversion,
      topProperties: Object.entries(propertyCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5),
    };
  };

  // Updated color scheme with primary #491180 and secondary #E0B100
  const COLORS = [
    "#8884d8", // Primary
    "#00C49F",
  ];

  // Secondary color variations
  const SECONDARY_VARIANTS = [
    "#F0D454", // Lighter yellow
    "#C69B00", // Darker yellow
    "#A87C00", // Darkest yellow
  ];

  const downloadPDF = async () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();

    // Add Title with primary color
    doc.setFontSize(20);
    doc.setTextColor(73, 17, 128); // Primary #491180
    doc.text("Converted Leads Success Report", pageWidth / 2, 15, {
      align: "center",
    });

    // Add report date
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(
      `Generated on: ${new Date().toLocaleDateString()}`,
      pageWidth / 2,
      23,
      { align: "center" }
    );

    let currentY = 30;

    // Add summary statistics
    if (chartData) {
      doc.setFontSize(14);
      doc.setTextColor(73, 17, 128); // Primary
      doc.text("Conversion Success Summary", 14, currentY);
      currentY += 8;

      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(`Total Converted Leads: ${chartData.totalLeads}`, 14, currentY);
      if (chartData.totalConversionValue > 0) {
        doc.setTextColor(224, 177, 0); // Secondary #E0B100
        doc.text(
          `Total Conversion Value: $${chartData.totalConversionValue.toLocaleString()}`,
          80,
          currentY
        );
      }
      currentY += 12;

      // Add top properties summary
      // if (chartData.topProperties.length > 0) {
      //   doc.setFontSize(12);
      //   doc.setTextColor(73, 17, 128); // Primary

      //   currentY += 6;

      //   doc.setFontSize(10);
      //   doc.setTextColor(0, 0, 0);
      //   chartData.topProperties.forEach(([property, count]: [string, number], index: number) => {
      //     const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '✓';
      //     doc.text(`${medal} ${property.substring(0, 30)}${property.length > 30 ? '...' : ''}: ${count} conversions`, 20, currentY);
      //     currentY += 5;
      //   });
      //   currentY += 5;
      // }

      // Add highest value conversion if available
      if (chartData.highestValueConversion.value > 0) {
        doc.setFontSize(11);
        doc.setTextColor(224, 177, 0); // Secondary #E0B100
        doc.text(
          `Highest Value: ${
            chartData.highestValueConversion.name
          } - $${chartData.highestValueConversion.value.toLocaleString()}`,
          14,
          currentY
        );
        currentY += 8;
      }
    }

    // Add charts section heading
    if (chartData) {
      doc.setFontSize(16);
      doc.setTextColor(73, 17, 128); // Primary
      doc.text("Performance Visualizations", 14, currentY);
      currentY += 5;

      // Capture and add Pie Chart
      if (pieChartRef.current) {
        const canvas = await html2canvas(pieChartRef.current, {
          scale: 2,
          backgroundColor: "#ffffff",
        });
        const imgData = canvas.toDataURL("image/png");
        doc.addImage(imgData, "PNG", 14, currentY, 85, 70);
      }

      // Capture and add Bar Chart
      if (barChartRef.current) {
        const canvas = await html2canvas(barChartRef.current, {
          scale: 2,
          backgroundColor: "#ffffff",
        });
        const imgData = canvas.toDataURL("image/png");
        doc.addImage(imgData, "PNG", 105, currentY, 85, 70);
      }

      currentY += 80;

      // Capture and add Area Chart if it exists
      if (areaChartRef.current && chartData.areaData.length > 0) {
        doc.setFontSize(12);
        doc.setTextColor(73, 17, 128); // Primary
        doc.text("Monthly Conversion Trend", 14, currentY);
        currentY += 5;

        const canvas = await html2canvas(areaChartRef.current, {
          scale: 2,
          backgroundColor: "#ffffff",
        });
        const imgData = canvas.toDataURL("image/png");
        doc.addImage(imgData, "PNG", 14, currentY, 180, 60);
        currentY += 70;
      }
    }

    // Add detailed data section
    doc.setFontSize(16);
    doc.setTextColor(73, 17, 128); // Primary
    doc.text("Converted Leads Details", 14, currentY);
    currentY += 10;

    // Prepare Data for table
    const headers = [
      ["Name", "Property", "Mobile", "Conversion Date", "Value"],
    ];
    const rows = data.map((e) => [
      e.name || "-",
      e.properties?.title || e.property_name || "-",
      e.mobile_number || "-",
      e.date ? new Date(e.date).toLocaleDateString("en-US") : "-",
      e.conversion_value
        ? `$${parseFloat(e.conversion_value).toLocaleString()}`
        : "N/A",
    ]);

    // Generate AutoTable with primary color
    autoTable(doc, {
      startY: currentY,
      head: headers,
      body: rows,
      theme: "grid",
      headStyles: {
        fillColor: [73, 17, 128], // Primary #491180
        textColor: 255,
        fontSize: 10,
        fontStyle: "bold",
      },
      bodyStyles: { fontSize: 9 },
      margin: { left: 14, right: 14 },
      styles: { overflow: "linebreak" },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 45 },
        2: { cellWidth: 35 },
        3: { cellWidth: 30 },
        4: { cellWidth: 25, halign: "right" },
      },
      didDrawPage: function (data) {
        // Add success stamp with secondary color
        if (data.pageNumber === 1) {
          doc.setFontSize(60);
          doc.setTextColor(224, 177, 0, 0.1); // Secondary #E0B100 with transparency
        }
      },
    });

    // Add page numbers
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Page ${i} of ${totalPages}`,
        pageWidth - 20,
        doc.internal.pageSize.getHeight() - 10
      );
    }

    doc.save(
      `converted_leads_success_report_${
        new Date().toISOString().split("T")[0]
      }.pdf`
    );
  };

  const downloadChartAsImage = async (
    chartRef: React.RefObject<HTMLDivElement>,
    chartName: string
  ) => {
    if (!chartRef.current) return;

    const canvas = await html2canvas(chartRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
    });

    const link = document.createElement("a");
    link.download = `${chartName}_${
      new Date().toISOString().split("T")[0]
    }.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const downloadAllCharts = async () => {
    const charts = [
      { ref: pieChartRef, name: "converted_leads_pie_chart" },
      { ref: barChartRef, name: "converted_leads_bar_chart" },
      { ref: areaChartRef, name: "converted_leads_area_chart" },
    ];

    for (let i = 0; i < charts.length; i++) {
      if (charts[i].ref.current) {
        await downloadChartAsImage(charts[i].ref, charts[i].name);
        if (i < charts.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
    }
  };

  useEffect(() => {
    getUsersReport()
      .then((res) => {
        if (res?.converted) {
          setData(res.converted);
          const processedData = processChartData(res.converted);
          setChartData(processedData);
        } else {
          console.warn("No converted leads data found");
          setData([]);
          setChartData(null);
        }
      })
      .catch((err) => {
        console.error("Error fetching report:", err);
        setData([]);
        setChartData(null);
      });
  }, []);

  return (
    <div className="px-3 sm:px-4 max-w-7xl mx-auto mb-16">
      {/* Header with buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/reports")}>
            ← Back to Reports
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 ml-auto">
          <Button
            variant="outline"
            onClick={() =>
              chartData &&
              downloadChartAsImage(pieChartRef, "converted_leads_pie_chart")
            }
            disabled={!chartData?.pieData?.length}
          >
            Download Pie Chart
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              chartData &&
              downloadChartAsImage(barChartRef, "converted_leads_bar_chart")
            }
            disabled={!chartData?.barData?.length}
          >
            Download Bar Chart
          </Button>
          <Button
            variant="outline"
            onClick={downloadAllCharts}
            disabled={!chartData}
          >
            Download All Charts
          </Button>
          <Button
            className="bg-[#491180] text-white hover:bg-[#3A0D6B]"
            onClick={downloadPDF}
          >
            Download Success Report
          </Button>
        </div>
      </div>

      {/* Success Celebration Banner */}
      {data.length > 0 && (
        <div className="mb-6 p-4 bg-gradient-to-r from-[#491180]/10 to-[#E0B100]/10 border border-[#E0B100] rounded-lg">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-12 h-12 bg-[#E0B100] rounded-full flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#491180] text-lg">
                Conversion Success!
              </h3>
              <p className="text-sm text-[#491180]">
                You have successfully converted {data.length} leads. Keep up the
                great work!
              </p>
            </div>
            {chartData?.totalConversionValue > 0 && (
              <div className="text-right">
                <div className="text-2xl font-bold text-[#491180]">
                  ${chartData.totalConversionValue.toLocaleString()}
                </div>
                <p className="text-sm text-[#E0B100] font-medium">
                  Total Conversion Value
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stats Cards */}
      {data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-[#491180]">
                {data.length}
              </div>
              <p className="text-sm text-muted-foreground">Total Conversions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-[#E0B100]">
                {
                  [
                    ...new Set(
                      data.map(
                        (item) => item.properties?.title || item.property_name
                      )
                    ),
                  ].filter(Boolean).length
                }
              </div>
              <p className="text-sm text-muted-foreground">
                Properties Converted
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-[#491180]">
                {[...new Set(data.map((item) => item.date))].length}
              </div>
              <p className="text-sm text-muted-foreground">Conversion Days</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-[#E0B100]">
                {data.length > 0
                  ? Math.round(
                      (data.length /
                        [...new Set(data.map((item) => item.date))].length) *
                        100
                    ) / 100
                  : 0}
              </div>
              <p className="text-sm text-muted-foreground">
                Avg Conversions per Day
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Charts Section */}
      {chartData &&
        (chartData.pieData.length > 0 || chartData.barData.length > 0) && (
          <div className="space-y-6 mb-8">
            {/* Pie and Bar Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pie Chart Card */}
              <Card>
                <CardHeader className="bg-gradient-to-r from-[#491180] to-[#3A0D6B]">
                  <CardTitle className="text-lg text-white">
                    Conversions by Property
                  </CardTitle>
                  <p className="text-sm text-white/80">
                    Top 10 properties with most conversions
                  </p>
                </CardHeader>
                <CardContent>
                  <div ref={pieChartRef} className="w-full h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData.pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry) => `${entry.name}: ${entry.value}`}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {chartData.pieData.map(
                            (_entry: any, index: number) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            )
                          )}
                        </Pie>
                        <Tooltip
                          formatter={(value, name, props) => [
                            value,
                            props.payload.fullName || name,
                          ]}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Bar Chart Card */}
              <Card>
                <CardHeader className="bg-gradient-to-r from-[#E0B100] to-[#C69B00]">
                  <CardTitle className="text-lg text-white">
                    Daily Conversion Rate
                  </CardTitle>
                  <p className="text-sm text-white/80">
                    Last 30 days conversion performance
                  </p>
                </CardHeader>
                <CardContent>
                  <div
                    ref={barChartRef}
                    className="w-full h-[350px] min-h-[300px]"
                  >
                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                      minHeight={300}
                    >
                      <BarChart
                        data={chartData.barData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="formattedDate"
                          angle={-45}
                          textAnchor="end"
                          height={70}
                        />
                        <YAxis />
                        <Tooltip
                          labelFormatter={(label, payload) => {
                            if (payload?.[0]?.payload?.date) {
                              return new Date(
                                payload[0].payload.date
                              ).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              });
                            }
                            return label;
                          }}
                        />
                        <Legend />
                        <Bar
                          dataKey="count"
                          name="Conversions"
                          fill="#82ca9d"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Area Chart Card */}
            {chartData.areaData.length > 0 && (
              <Card>
                <CardHeader className="bg-gradient-to-r from-[#491180] to-[#E0B100]">
                  <CardTitle className="text-lg text-white">
                    Monthly Conversion Growth
                  </CardTitle>
                  <p className="text-sm text-white/80">
                    Conversion trend over months
                  </p>
                </CardHeader>
                <CardContent>
                  <div ref={areaChartRef} className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={chartData.areaData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="month"
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis />
                        <Tooltip
                          labelFormatter={(label) => `Month: ${label}`}
                        />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="count"
                          name="Conversions"
                          stroke="#491180"
                          strokeWidth={3}
                          fill="url(#colorGradient)"
                        />
                        <defs>
                          <linearGradient
                            id="colorGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#491180"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#E0B100"
                              stopOpacity={0.2}
                            />
                          </linearGradient>
                        </defs>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

      {/* Data Table Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-[#491180] to-[#3A0D6B]">
          <div>
            <CardTitle className="text-xl text-white">
              Converted Leads Details
            </CardTitle>
            <p className="text-sm text-white/80">
              {data.length === 0
                ? "No conversions yet"
                : `${data.length} successful conversions`}
            </p>
          </div>
          <div className="text-sm text-white/80">
            Last updated:{" "}
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </CardHeader>
        <CardContent>
          {data.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                <svg
                  className="w-full h-full"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-lg text-muted-foreground">
                No converted leads found.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Focus on converting your pending leads!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="overflow-x-auto border rounded-lg mt-7">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#491180] to-[#3A0D6B] text-white">
                    <tr>
                      <th className="p-3 text-left font-medium">Client Name</th>
                      <th className="p-3 text-left font-medium">Property</th>
                      <th className="p-3 text-left font-medium">
                        Contact Info
                      </th>
                      <th className="p-3 text-left font-medium">
                        Conversion Date
                      </th>
                      <th className="p-3 text-left font-medium">Value</th>
                      <th className="p-3 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((e, index) => (
                      <tr
                        key={e.id || index}
                        className="border-b hover:bg-[#491180]/5 transition-colors"
                      >
                        <td className="p-3">
                          <div className="font-medium">
                            {e.name || "Unknown"}
                          </div>
                          {e.email && (
                            <div className="text-sm text-muted-foreground">
                              {e.email}
                            </div>
                          )}
                        </td>
                        <td className="p-3">
                          <div className="font-medium">
                            {e.properties?.title ||
                              e.property_name ||
                              "No Property"}
                          </div>
                          {e.properties?.description && (
                            <div
                              className="text-sm text-muted-foreground truncate max-w-xs"
                              title={e.properties.description}
                            >
                              {e.properties.description.substring(0, 50)}...
                            </div>
                          )}
                        </td>
                        <td className="p-3">
                          <div className="font-medium">
                            {e.mobile_number || "N/A"}
                          </div>
                          {e.phone && (
                            <div className="text-sm text-muted-foreground">
                              Phone: {e.phone}
                            </div>
                          )}
                        </td>
                        <td className="p-3">
                          {e.date ? (
                            <div>
                              <div className="font-medium">
                                {new Date(e.date).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </div>
                              <div className="text-sm text-[#E0B100]">
                                {Math.floor(
                                  (new Date().getTime() -
                                    new Date(e.date).getTime()) /
                                    (1000 * 60 * 60 * 24)
                                )}{" "}
                                days ago
                              </div>
                            </div>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="p-3">
                          {e.budget ? (
                            <div className="font-bold text-[#491180]">
                              {parseFloat(e.budget).toLocaleString()}
                            </div>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>
                        <td className="p-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-[#E0B100] to-[#C69B00] text-white">
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Converted
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Success Tips */}
      {data.length > 0 && (
        <Card>
          <CardHeader className="bg-gradient-to-r from-[#491180] to-[#E0B100]">
            <CardTitle className="text-lg text-white">
              Tips to Maintain Success
            </CardTitle>
            <p className="text-sm text-white/80">
              Best practices to keep your conversion rate high
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow hover:border-[#491180]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#491180]/10 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-[#491180]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-[#491180]">
                    Client Follow-ups
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Schedule regular check-ins with converted clients for
                  potential referrals.
                </p>
              </div>

              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow hover:border-[#E0B100]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#E0B100]/10 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-[#E0B100]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-[#E0B100]">
                    Analyze Success Patterns
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Review which properties and approaches are converting best and
                  replicate them.
                </p>
              </div>

              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow hover:border-[#491180]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#491180]/10 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-[#491180]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-[#491180]">
                    Testimonials & Reviews
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Collect testimonials from converted clients to build social
                  proof.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top Performers */}
      {chartData?.topProperties && chartData.topProperties.length > 0 && (
        <Card className="mt-6">
          <CardHeader className="bg-gradient-to-r from-[#E0B100] to-[#C69B00]">
            <CardTitle className="text-lg text-white">
              Top Performing Properties
            </CardTitle>
            <p className="text-sm text-white/80">
              Properties with highest conversion rates
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-5">
              {chartData.topProperties.map(
                ([property, count]: [string, number], index: number) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow text-center hover:border-[#491180]"
                  >
                    <div className="text-4xl mb-2">
                      {index === 0
                        ? "🥇"
                        : index === 1
                        ? "🥈"
                        : index === 2
                        ? "🥉"
                        : "🎯"}
                    </div>
                    <h3
                      className="font-medium mb-1 truncate text-[#491180]"
                      title={property}
                    >
                      {property.length > 20
                        ? `${property.substring(0, 18)}...`
                        : property}
                    </h3>
                    <div className="text-2xl font-bold text-[#E0B100]">
                      {count}
                    </div>
                    <p className="text-sm text-muted-foreground">conversions</p>
                    <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#491180] to-[#E0B100]"
                        style={{ width: `${(count / data.length) * 100}%` }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
