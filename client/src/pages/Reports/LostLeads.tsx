

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
//       theme: "grid",
//       headStyles: {
//         fillColor: [73, 17, 128], // primary color
//         textColor: [255, 255, 255], // white text
//         fontStyle: "bold",
//       },
//       margin: { top: 20 },
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
//               <div className="overflow-x-auto w-full">
//                 <table className="w-full border text-center min-w-[600px]">
//                   <thead className="bg-primary text-white">
//                     <tr>
//                       <th className="px-4 py-2">Name</th>
//                       <th className="px-4 py-2">Property</th>
//                       <th className="px-4 py-2">Mobile</th>
//                       <th className="px-4 py-2">Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {data.map((e) => (
//                       <tr key={e.id} className="border">
//                         <td className="px-4 py-2">{e.name}</td>
//                         <td className="px-4 py-2">
//                           {e.properties?.title || "-"}
//                         </td>
//                         <td className="px-4 py-2">{e.mobile_number}</td>
//                         <td className="px-4 py-2">{e.date}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </>
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
  Line
} from "recharts";

export default function LostLeads() {
  const [data, setData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any>(null);
  const navigate = useNavigate();
  
  // Refs for capturing charts as images
  const pieChartRef = useRef<HTMLDivElement>(null);
  const barChartRef = useRef<HTMLDivElement>(null);
  const lineChartRef = useRef<HTMLDivElement>(null);

  // Process data for charts
  const processChartData = (lostLeads: any[]) => {
    if (!lostLeads.length) return null;

    // Group by property for pie chart
    const propertyCounts: Record<string, number> = {};
    // Group by date for bar chart
    const dateCounts: Record<string, number> = {};
    // Group by month for line chart
    const monthCounts: Record<string, number> = {};

    lostLeads.forEach(item => {
      // Count by property
      const property = item.properties?.title || "Unknown Property";
      propertyCounts[property] = (propertyCounts[property] || 0) + 1;
      
      // Count by date
      if (item.date) {
        dateCounts[item.date] = (dateCounts[item.date] || 0) + 1;
        
        // Extract month for line chart
        const month = new Date(item.date).toLocaleDateString('en-US', { 
          month: 'short',
          year: '2-digit'
        });
        monthCounts[month] = (monthCounts[month] || 0) + 1;
      }
    });

    // Prepare pie chart data (top 10 properties)
    const pieData = Object.entries(propertyCounts)
      .map(([property, count]) => ({
        name: property.length > 20 ? `${property.substring(0, 17)}...` : property,
        value: count,
        fullProperty: property
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);

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

    // Prepare line chart data (sort by month)
    const lineData = Object.entries(monthCounts)
      .map(([month, count]) => ({
        month,
        count,
        fullMonth: month
      }))
      .sort((a, b) => {
        const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const aMonth = a.month.split(' ')[0];
        const bMonth = b.month.split(' ')[0];
        return monthOrder.indexOf(aMonth) - monthOrder.indexOf(bMonth);
      });

    return { 
      pieData, 
      barData, 
      lineData,
      totalLeads: lostLeads.length,
      topProperties: Object.entries(propertyCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
    };
  };

  // Updated color scheme with primary #491180 and secondary #E0B100
  const COLORS = [
   '#8884d8', // Primary
    '#00C49F',
  ];

  const downloadPDF = async () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Add Title with primary color
    doc.setFontSize(20);
    doc.setTextColor(73, 17, 128); // Primary #491180
    doc.text("Lost Leads Analysis Report", pageWidth / 2, 15, { align: 'center' });
    
    // Add report date
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 23, { align: 'center' });
    
    let currentY = 30;
    
    // Add summary statistics
    if (chartData) {
      doc.setFontSize(14);
      doc.setTextColor(73, 17, 128); // Primary
      doc.text("Summary Overview", 14, currentY);
      currentY += 8;
      
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(`Total Lost Leads: ${chartData.totalLeads}`, 14, currentY);
      doc.text(`Time Period: ${data.length > 0 ? 
        new Date(data[data.length - 1].date).toLocaleDateString() : 'N/A'} to ${data.length > 0 ? 
        new Date(data[0].date).toLocaleDateString() : 'N/A'}`, 80, currentY);
      currentY += 12;
      
      // Add top properties summary
      if (chartData.topProperties.length > 0) {
        doc.setFontSize(12);
        doc.setTextColor(73, 17, 128); // Primary
        doc.text("Top Properties with Lost Leads:", 14, currentY);
        currentY += 6;
        
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        chartData.topProperties.forEach(([property, count]: [string, number], index: number) => {
          doc.text(`${index + 1}. ${property.substring(0, 30)}${property.length > 30 ? '...' : ''}: ${count} leads`, 20, currentY);
          currentY += 5;
        });
        currentY += 5;
      }
    }
    
    // Add charts section heading
    if (chartData) {
      doc.setFontSize(16);
      doc.setTextColor(73, 17, 128); // Primary
      doc.text("Visual Analysis", 14, currentY);
      currentY += 5;
      
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
      
      // Capture and add Line Chart if it exists
      if (lineChartRef.current && chartData.lineData.length > 0) {
        doc.setFontSize(12);
        doc.setTextColor(73, 17, 128); // Primary
        doc.text("Monthly Trend", 14, currentY);
        currentY += 5;
        
        const canvas = await html2canvas(lineChartRef.current, {
          scale: 2,
          backgroundColor: '#ffffff'
        });
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 14, currentY, 180, 60);
        currentY += 70;
      }
    }
    
    // Add detailed data section
    doc.setFontSize(16);
    doc.setTextColor(73, 17, 128); // Primary
    doc.text("Detailed Lost Leads", 14, currentY);
    currentY += 10;
    
    // Prepare Data for table
    const headers = [["Name", "Property", "Mobile", "Date", "Last Contact"]];
    const rows = data.map((e) => [
      e.name || "-",
      e.properties?.title || "-",
      e.mobile_number || "-",
      e.date ? new Date(e.date).toLocaleDateString('en-US') : "-",
      e.last_contact_date ? new Date(e.last_contact_date).toLocaleDateString('en-US') : "N/A"
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
        fontStyle: 'bold'
      },
      bodyStyles: { fontSize: 9 },
      margin: { left: 14, right: 14 },
      styles: { overflow: 'linebreak' },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 50 },
        2: { cellWidth: 35 },
        3: { cellWidth: 30 },
        4: { cellWidth: 35 }
      },
      didDrawPage: function(data) {
        // Add "Confidential" watermark with secondary color
        doc.setFontSize(40);
        doc.setTextColor(224, 177, 0, 0.1); // Secondary #E0B100 with transparency
       
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
    
    doc.save(`lost_leads_report_${new Date().toISOString().split('T')[0]}.pdf`);
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
    const charts = [
      { ref: pieChartRef, name: 'lost_leads_pie_chart' },
      { ref: barChartRef, name: 'lost_leads_bar_chart' },
      { ref: lineChartRef, name: 'lost_leads_line_chart' }
    ];
    
    for (let i = 0; i < charts.length; i++) {
      if (charts[i].ref.current) {
        await downloadChartAsImage(charts[i].ref, charts[i].name);
        // Small delay between downloads
        if (i < charts.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    }
  };

  useEffect(() => {
    getUsersReport()
      .then((res) => {
        if (res?.lost) {
          setData(res.lost);
          const processedData = processChartData(res.lost);
          setChartData(processedData);
        } else {
          console.warn("No lost leads data found");
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

  const totalLeads = data.length;

  return (
    <div className="p-6 max-w-7xl mx-auto mb-16">
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
            onClick={() => chartData && downloadChartAsImage(pieChartRef, 'lost_leads_pie_chart')}
            disabled={!chartData?.pieData?.length}
          >
            Download Pie Chart
          </Button>
          <Button
            variant="outline"
            onClick={() => chartData && downloadChartAsImage(barChartRef, 'lost_leads_bar_chart')}
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

      {/* Warning Alert */}
      {totalLeads > 0 && (
        <div className="mb-6 p-4 bg-gradient-to-r from-[#491180]/10 to-[#E0B100]/10 border border-[#E0B100] rounded-lg">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-[#E0B100] rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-[#491180]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-[#491180]">Lost Leads Alert</h3>
              <p className="text-sm text-[#491180]">
                You have {totalLeads} lost leads. Consider reviewing your follow-up strategies.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      {totalLeads > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-[#491180]">{totalLeads}</div>
              <p className="text-sm text-muted-foreground">Total Lost Leads</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-[#E0B100]">
                {[...new Set(data.map(item => item.properties?.title))].filter(Boolean).length}
              </div>
              <p className="text-sm text-muted-foreground">Properties Affected</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-[#491180]">
                {[...new Set(data.map(item => item.date))].length}
              </div>
              <p className="text-sm text-muted-foreground">Days with Losses</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-[#E0B100]">
                {data.length > 0 ? 
                  Math.round(totalLeads / [...new Set(data.map(item => item.date))].length * 100) / 100 
                  : 0}
              </div>
              <p className="text-sm text-muted-foreground">Avg per Day</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Charts Section */}
      {chartData && (chartData.pieData.length > 0 || chartData.barData.length > 0) && (
        <div className="space-y-6 mb-8">
          {/* Pie and Bar Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart Card */}
            <Card>
            <CardHeader className="bg-gradient-to-r from-[#491180] to-[#3A0D6B]">
                <CardTitle className="text-lg text-white">Lost Leads by Property</CardTitle>
                <p className="text-sm text-white/80">Top 10 properties with most lost leads</p>
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
                <CardTitle className="text-lg text-white">Daily Conversion Rate</CardTitle>
                <p className="text-sm text-white/80">Last 30 days conversion performance</p>
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

          {/* Line Chart Card */}
          {chartData.lineData.length > 0 && (
            <Card>
              <CardHeader className="bg-gradient-to-r from-[#491180] to-[#E0B100]">
                <CardTitle className="text-lg text-white">Monthly Trend Analysis</CardTitle>
                <p className="text-sm text-white/80">Lost leads trend over months</p>
              </CardHeader>
              <CardContent>
                <div ref={lineChartRef} className="w-full h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData.lineData}
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
                      <Line 
                        type="monotone" 
                        dataKey="count" 
                        name="Lost Leads" 
                        stroke="#491180" 
                        strokeWidth={3}
                        dot={{ r: 6 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
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
            <CardTitle className="text-xl text-white">Lost Leads Details</CardTitle>
            <p className="text-sm text-white/80">
              {totalLeads === 0 ? 'No lost leads found' : `${totalLeads} lost leads found`}
            </p>
          </div>
          <div className="text-sm text-white/80">
            Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </CardHeader>
        <CardContent>
          {totalLeads === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-lg text-muted-foreground">No lost leads found.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Great! All leads are currently active or converted.
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
                      <th className="p-3 text-left font-medium">Contact Info</th>
                      <th className="p-3 text-left font-medium">Date Lost</th>
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
                          <div className="font-medium">{e.name || "Unknown"}</div>
                          {e.email && (
                            <div className="text-sm text-muted-foreground">{e.email}</div>
                          )}
                        </td>
                        <td className="p-3">
                          <div className="font-medium">{e.properties?.title || "No Property"}</div>
                          {e.properties?.description && (
                            <div className="text-sm text-muted-foreground truncate max-w-xs" title={e.properties.description}>
                              {e.properties.description.substring(0, 50)}...
                            </div>
                          )}
                        </td>
                        <td className="p-3">
                          <div className="font-medium">{e.mobile_number || "N/A"}</div>
                          {e.phone && (
                            <div className="text-sm text-muted-foreground">Phone: {e.phone}</div>
                          )}
                        </td>
                        <td className="p-3">
                          {e.date ? (
                            <div>
                              <div className="font-medium">
                                {new Date(e.date).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </div>
                              <div className="text-sm text-[#E0B100]">
                                {Math.floor((new Date().getTime() - new Date(e.date).getTime()) / (1000 * 60 * 60 * 24))} days ago
                              </div>
                            </div>
                          ) : "-"}
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
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            Lost
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

      {/* Recovery Suggestions */}
      {totalLeads > 0 && (
        <Card>
          <CardHeader className="bg-gradient-to-r from-[#491180] to-[#E0B100]">
            <CardTitle className="text-lg text-white">Recovery Recommendations</CardTitle>
            <p className="text-sm text-white/80">Suggestions to prevent future lead loss</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow hover:border-[#491180]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#491180]/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#491180]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-[#491180]">Follow-up Strategy</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Implement a 7-day follow-up sequence with personalized messages for lost leads.
                </p>
              </div>
              
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow hover:border-[#E0B100]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#E0B100]/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#E0B100]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-[#E0B100]">Offer Review</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Review pricing and offers for properties with highest lost lead counts.
                </p>
              </div>
              
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow hover:border-[#491180]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#491180]/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#491180]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-[#491180]">Team Training</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Conduct weekly training sessions on objection handling and lead retention.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}