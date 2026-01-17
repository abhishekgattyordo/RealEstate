




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
//             <div className="overflow-x-auto w-full">
//   <table className="w-full border text-center min-w-[600px]">
//     <thead className="bg-primary text-white">
//       <tr>
//         <th className="px-4 py-2">Name</th>
//         <th className="px-4 py-2">Date</th>
//         <th className="px-4 py-2">Time</th>
//         <th className="px-4 py-2">Notes</th>
//       </tr>
//     </thead>
//     <tbody>
//       {data.map((r) => (
//         <tr key={r.id} className="border">
//           <td className="px-4 py-2">{r.name}</td>
//           <td className="px-4 py-2">{r.date}</td>
//           <td className="px-4 py-2">
//             {r.time ? formatTime(r.time) : "-"}
//           </td>
//           <td className="px-4 py-2">{r.notes || "-"}</td>
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
  ResponsiveContainer
} from "recharts";

export default function PendingFollowups() {
  const [data, setData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any>(null);
  const navigate = useNavigate();
  
  // Refs for capturing charts as images
  const pieChartRef = useRef<HTMLDivElement>(null);
  const barChartRef = useRef<HTMLDivElement>(null);

  // Process data for charts
  const processChartData = (followups: any[]) => {
    if (!followups.length) return null;

    // Group by name for pie chart
    const nameCounts: Record<string, number> = {};
    // Group by date for bar chart
    const dateCounts: Record<string, number> = {};

    followups.forEach(item => {
      // Count by name
      nameCounts[item.name] = (nameCounts[item.name] || 0) + 1;
      
      // Count by date
      if (item.date) {
        dateCounts[item.date] = (dateCounts[item.date] || 0) + 1;
      }
    });

    // Prepare pie chart data
    const pieData = Object.entries(nameCounts).map(([name, count], index) => ({
      name: name.length > 15 ? `${name.substring(0, 12)}...` : name,
      value: count,
      fullName: name
    }));

    // Prepare bar chart data (sort by date)
    const barData = Object.entries(dateCounts)
      .map(([date, count]) => ({
        date,
        count,
        formattedDate: new Date(date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        })
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return { pieData, barData };
  };

  // Updated color scheme with primary #491180 and secondary #E0B100
  const COLORS = [
    '#8884d8', // Primary
    '#00C49F', // Secondary
    
  ];

  const downloadPDF = async () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Add Title with primary color
    doc.setFontSize(20);
    doc.setTextColor(73, 17, 128); // Primary #491180
    doc.text("Pending Followups Report", pageWidth / 2, 15, { align: 'center' });
    
    // Add report date
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 23, { align: 'center' });
    
    // Add charts section heading
    doc.setFontSize(16);
    doc.setTextColor(73, 17, 128); // Primary
    doc.text("Summary Charts", 14, 35);
    
    // Add charts if available
    let currentY = 45;
    
    if (chartData) {
      // Capture and add Pie Chart
      if (pieChartRef.current) {
        const canvas = await html2canvas(pieChartRef.current, {
          scale: 2,
          backgroundColor: '#ffffff'
        });
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 14, currentY, 85, 70);
      }
      
      // Capture and add Bar Chart
      if (barChartRef.current) {
        const canvas = await html2canvas(barChartRef.current, {
          scale: 2,
          backgroundColor: '#ffffff'
        });
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 105, currentY, 85, 70);
      }
      
      currentY += 80;
    }
    
    // Add table section heading
    doc.setFontSize(16);
    doc.setTextColor(73, 17, 128); // Primary
    doc.text("Detailed Followups", 14, currentY);
    currentY += 10;
    
    // Prepare Data for table
    const headers = [["Name","Property","Contact Info", "Date"]];
    const rows = data.map((r) => [
      r.name,
      r.property_name,
      r.mobile_number || "-",
      r.date ? new Date(r.date).toLocaleDateString('en-US') : "-",
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
        fontSize: 11
      },
      bodyStyles: { fontSize: 10 },
      margin: { left: 14, right: 14 },
      styles: { overflow: 'linebreak' },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 30 },
        2: { cellWidth: 25 },
        3: { cellWidth: 'auto' }
      }
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
    
    doc.save(`pending_followups_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const downloadChartAsImage = async (chartRef: React.RefObject<HTMLDivElement>, chartName: string) => {
    if (!chartRef.current) return;
    
    const canvas = await html2canvas(chartRef.current, {
      scale: 2,
      backgroundColor: '#ffffff'
    });
    
    const link = document.createElement('a');
    link.download = `${chartName}_${new Date().toISOString().split('T')[0]}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const downloadAllCharts = async () => {
    if (pieChartRef.current) {
      await downloadChartAsImage(pieChartRef, 'pending_followups_pie_chart');
    }
    if (barChartRef.current) {
      setTimeout(async () => {
        await downloadChartAsImage(barChartRef, 'pending_followups_bar_chart');
      }, 500);
    }
  };

  useEffect(() => {
    getUsersReport()
      .then((res) => {
        if (res?.pending) {
          setData(res.pending);
          const processedData = processChartData(res.pending);
          setChartData(processedData);
        } else {
          console.warn("No pending data found");
          setData([]);
          setChartData(null);
        }
      })
      .catch((err) => {
        console.error("Error fetching report:", err);
      });
  }, []);

  // Function to format time
  const formatTime = (timeStr: string | undefined) => {
    if (!timeStr) return "-";
    
    try {
      const [hours, minutes] = timeStr.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes.padStart(2, '0')} ${ampm}`;
    } catch (error) {
      return timeStr;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto mb-16">
      {/* Header with buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/reports")}>
            ← Back
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2 ml-auto">
          <Button
            variant="outline"
            onClick={() => chartData && downloadChartAsImage(pieChartRef, 'pending_followups_pie_chart')}
            disabled={!chartData?.pieData?.length}
          >
            Download Pie Chart
          </Button>
          <Button
            variant="outline"
            onClick={() => chartData && downloadChartAsImage(barChartRef, 'pending_followups_bar_chart')}
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
            Download Full Report (PDF)
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      {data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-[#491180]">{data.length}</div>
              <p className="text-sm text-muted-foreground">Total Followups</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-[#E0B100]">
                {[...new Set(data.map(item => item.name))].length}
              </div>
              <p className="text-sm text-muted-foreground">Unique Clients</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-[#491180]">
                {[...new Set(data.map(item => item.date))].length}
              </div>
              <p className="text-sm text-muted-foreground">Unique Dates</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-[#E0B100]">
                {Math.round(data.length / Math.max([...new Set(data.map(item => item.name))].length, 1))}
              </div>
              <p className="text-sm text-muted-foreground">Avg per Client</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Charts Section */}
      {chartData && (chartData.pieData.length > 0 || chartData.barData.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Pie Chart Card */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-[#491180] to-[#3A0D6B]">
              <CardTitle className="text-lg text-white">Followups by Client</CardTitle>
              <p className="text-sm text-white/80">Distribution of followups across clients</p>
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
                      {chartData.pieData.map((_entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name, props) => [
                        value, 
                        props.payload.fullName || name
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
              <CardTitle className="text-lg text-white">Followups by Date</CardTitle>
              <p className="text-sm text-white/80">Daily followup distribution</p>
            </CardHeader>
            <CardContent>
              <div ref={barChartRef} className="w-full h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
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
                          return new Date(payload[0].payload.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          });
                        }
                        return label;
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="count" 
                      name="Number of Followups" 
                      fill="#8884d8" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Data Table Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-[#491180] to-[#3A0D6B]">
          <CardTitle className="text-xl text-white">Pending Followups ({data.length})</CardTitle>
          <div className="text-sm text-white/80">
            Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </CardHeader>
        <CardContent>
          {data.length === 0 ? (
            <div className="text-center py-12 ">
              <p className="text-lg text-muted-foreground">No pending followups found.</p>
              <p className="text-sm text-muted-foreground mt-2">
                All followups are completed or no data is available.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto border rounded-lg mt-7">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#34024e] to-[#7e06f6] text-white">
                  <tr>
                    <th className="p-3 text-left font-medium">Client Name</th>
                    <th className="p-3 text-left font-medium">Property</th>
                    <th className="p-3 text-left font-medium">Value</th>
                    <th className="p-3 text-left font-medium">Contact Info</th>
                    <th className="p-3 text-left font-medium">date</th>
                    <th className="p-3 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((r) => (
                    <tr key={r.id} className="border-b hover:bg-[#491180]/5 transition-colors">
                      <td className="p-3">
                        <div className="font-medium">{r.name}</div>
                        {r.email && (
                          <div className="text-sm text-muted-foreground">{r.email}</div>
                        )}
                      </td>
                       <td className="p-3">
                          <div className="font-medium">{r.properties?.title || r.property_name || "No Property"}</div>
                          {r.properties?.description && (
                            <div className="text-sm text-muted-foreground truncate max-w-xs" title={r.properties.description}>
                              {r.properties.description.substring(0, 50)}...
                            </div>
                          )}
                        </td>

                           <td className="p-3">
                          {r.budget ? (
                            <div className="font-bold text-[#491180]">
                              {parseFloat(r.budget).toLocaleString()}
                            </div>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>
                      <td className="p-3 font-medium text-[#080600]">
                        {r.mobile_number || "-"}
                      </td>
                      <td className="p-3">
                        <div className="max-w-xs truncate" title={r.name}>
                          {r.date ? new Date(r.date).toLocaleDateString('en-US') : "-"}
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-[#E0B100] to-[#C69B00] text-white">
                          Pending
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Follow-up Tips */}
      {data.length > 0 && (
        <Card className="mt-6">
          <CardHeader className="bg-gradient-to-r from-[#491180] to-[#E0B100]">
            <CardTitle className="text-lg text-white">Follow-up Tips</CardTitle>
            <p className="text-sm text-white/80">Best practices for effective follow-ups</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow hover:border-[#491180]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#491180]/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#491180]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-[#491180]">Timing</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Follow up within 24-48 hours for maximum response rate.
                </p>
              </div>
              
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow hover:border-[#E0B100]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#E0B100]/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#E0B100]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-[#E0B100]">Personalization</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Personalize your follow-up messages based on previous interactions.
                </p>
              </div>
              
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow hover:border-[#491180]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#491180]/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#491180]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-[#491180]">Documentation</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Keep detailed notes for each follow-up to track progress and next steps.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}