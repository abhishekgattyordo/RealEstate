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

export default function LeadsByLocation() {
  const [data, setData] = useState<any>({});
  const [chartData, setChartData] = useState<any>(null);
  const navigate = useNavigate();
  
  // Refs for capturing charts as images
  const pieChartRef = useRef<HTMLDivElement>(null);
  const barChartRef = useRef<HTMLDivElement>(null);

  // Process data for charts
  const processChartData = (locationData: any) => {
    if (!locationData || Object.keys(locationData).length === 0) {
      return null;
    }

    const locations = Object.keys(locationData);
    
    // Prepare pie chart data
    const pieData = locations.map((location, index) => ({
      name: location.length > 20 ? `${location.substring(0, 17)}...` : location,
      value: locationData[location].length,
      fullName: location
    }));

    // Prepare bar chart data (sort by count descending)
    const barData = locations
      .map(location => ({
        location: location.length > 15 ? `${location.substring(0, 12)}...` : location,
        leads: locationData[location].length,
        fullLocation: location
      }))
      .sort((a, b) => b.leads - a.leads);

    return { pieData, barData, totalLeads: pieData.reduce((sum, item) => sum + item.value, 0) };
  };

  // Colors for charts
  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
    '#8884D8', '#82CA9D', '#FF6B6B', '#4ECDC4',
    '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD',
    '#98D8C8', '#F7B7A3', '#D291BC', '#F67280',
    '#C06C84', '#6C5B7B', '#355C7D', '#99B898'
  ];

  const downloadPDF = async () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Add Title
    doc.setFontSize(20);
    doc.setTextColor(73, 17, 128); // Primary color
    doc.text("Leads by Location Report", pageWidth / 2, 15, { align: 'center' });
    
    // Add report date
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 23, { align: 'center' });
    
    let currentY = 30;
    
    // Add summary statistics
    if (chartData) {
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text("Summary Statistics", 14, currentY);
      currentY += 8;
      
      doc.setFontSize(11);
      doc.text(`Total Locations: ${Object.keys(data).length}`, 14, currentY);
      doc.text(`Total Leads: ${chartData.totalLeads}`, 80, currentY);
      currentY += 12;
    }
    
    // Add charts section heading
    if (chartData) {
      doc.setFontSize(16);
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
    }
    
    // Add detailed data section
    doc.setFontSize(16);
    doc.text("Detailed Leads by Location", 14, currentY);
    currentY += 10;
    
    // Generate tables for each location
    const locations = Object.keys(data);
    
    for (const location of locations) {
      const leads = data[location];
      
      // Check if we need a new page
      if (currentY > 250) {
        doc.addPage();
        currentY = 20;
      }
      
      // Location header
      doc.setFontSize(12);
      doc.setTextColor(73, 17, 128);
      doc.text(`${location} (${leads.length} leads)`, 14, currentY);
      currentY += 8;
      
      // Prepare table data
      const rows = leads.map((e: any) => [
        e.name || "-",
        e.property_name || e.properties?.title || "-",
        e.mobile_number || "-",
        e.date || "-"
      ]);
      
      // Generate table
      autoTable(doc, {
        startY: currentY,
        head: [["Name", "Property", "Mobile", "Date"]],
        body: rows,
        margin: { left: 14, right: 14 },
        theme: "grid",
        headStyles: { 
          fillColor: [73, 17, 128],
          textColor: 255,
          fontSize: 10,
          fontStyle: 'bold'
        },
        bodyStyles: { fontSize: 9 },
        styles: { overflow: 'linebreak' },
        columnStyles: {
          0: { cellWidth: 40 },
          1: { cellWidth: 45 },
          2: { cellWidth: 35 },
          3: { cellWidth: 30 }
        }
      });
      
      // Update Y position for next section
      currentY = (doc as any).lastAutoTable?.finalY + 10 || currentY + 20;
    }
    
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
    
    doc.save(`leads_by_location_${new Date().toISOString().split('T')[0]}.pdf`);
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
      await downloadChartAsImage(pieChartRef, 'leads_location_pie_chart');
    }
    if (barChartRef.current) {
      setTimeout(async () => {
        await downloadChartAsImage(barChartRef, 'leads_location_bar_chart');
      }, 500);
    }
  };

  useEffect(() => {
    getUsersReport()
      .then((res) => {
        if (!res) {
          console.warn("API response is null or undefined");
          setData({});
          setChartData(null);
          return;
        }

        if (res.byLocation) {
          setData(res.byLocation);
          const processedData = processChartData(res.byLocation);
          setChartData(processedData);
        } else {
          console.warn("No byLocation data found in API response");
          setData({});
          setChartData(null);
        }
      })
      .catch((err) => {
        console.error("Error fetching report:", err);
        setData({});
        setChartData(null);
      });
  }, []);

  const locations = Object.keys(data);

  return (
    <div className="px-3 sm:px-4 max-w-7xl mx-auto mb-16">
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
            onClick={() => chartData && downloadChartAsImage(pieChartRef, 'leads_location_pie_chart')}
            disabled={!chartData?.pieData?.length}
          >
            Download Pie Chart
          </Button>
          <Button
            variant="outline"
            onClick={() => chartData && downloadChartAsImage(barChartRef, 'leads_location_bar_chart')}
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
            className="bg-primary text-white hover:bg-primary/90"
            onClick={downloadPDF}
          >
            Download Full Report (PDF)
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      {locations.length > 0 && chartData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{locations.length}</div>
              <p className="text-sm text-muted-foreground">Total Locations</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">{chartData.totalLeads}</div>
              <p className="text-sm text-muted-foreground">Total Leads</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-orange-600">
                {chartData.totalLeads > 0 
                  ? (chartData.totalLeads / locations.length).toFixed(1)
                  : 0}
              </div>
              <p className="text-sm text-muted-foreground">Avg Leads per Location</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Charts Section */}
      {chartData && (chartData.pieData.length > 0 || chartData.barData.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Pie Chart Card */}
          <Card>
                <CardHeader>
              <CardTitle className="text-lg">Leads Distribution by Location</CardTitle>
              <p className="text-sm text-muted-foreground">Percentage of total leads per location</p>
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
            <CardHeader>
              <CardTitle className="text-lg">Top Locations by Leads Count</CardTitle>
              <p className="text-sm text-muted-foreground">Number of leads per location (sorted)</p>
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
                      dataKey="location" 
                      angle={-45}
                      textAnchor="end"
                      height={70}
                    />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name, props) => [
                        value, 
                        `Location: ${props.payload.fullLocation}`
                      ]}
                      labelStyle={{ fontWeight: 'bold' }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="leads" 
                      name="Number of Leads" 
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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">
            Leads by Location {locations.length > 0 && `(${locations.length} locations, ${chartData?.totalLeads || 0} leads)`}
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </CardHeader>
        <CardContent>
          {locations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No leads found by location.</p>
              <p className="text-sm text-muted-foreground mt-2">
                No location data is available or all locations are empty.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {locations.map((loc) => {
                const totalLeads = data[loc].length;
                const locationLeads = data[loc];

                return (
                  <div key={loc} className="border rounded-lg overflow-hidden">
                    {/* Location Header */}
                    <div className="bg-primary text-primary-foreground p-3 flex justify-between items-center">
                      <div>
                        <h2 className="font-semibold text-lg">{loc}</h2>
                        <p className="text-sm opacity-90">{totalLeads} {totalLeads === 1 ? 'lead' : 'leads'}</p>
                      </div>
                      <div className="text-sm">
                        {Math.round((totalLeads / (chartData?.totalLeads || 1)) * 100)}% of total
                      </div>
                    </div>

                    {/* Leads Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="p-3 text-left font-medium">Name</th>
                            <th className="p-3 text-left font-medium">Property</th>
                            <th className="p-3 text-left font-medium">Mobile</th>
                            <th className="p-3 text-left font-medium">Date</th>
                            <th className="p-3 text-left font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {locationLeads.map((e: any, index: number) => (
                            <tr 
                              key={e.id || index} 
                              className="border-b hover:bg-muted/50 transition-colors"
                            >
                              <td className="p-3">
                                <div className="font-medium">{e.name || "-"}</div>
                                {e.email && (
                                  <div className="text-sm text-muted-foreground">{e.email}</div>
                                )}
                              </td>
                              <td className="p-3">
                                {e.property_name || e.properties?.title || "-"}
                              </td>
                              <td className="p-3 font-medium">
                                {e.mobile_number || "-"}
                              </td>
                              <td className="p-3">
                                {e.date ? new Date(e.date).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                }) : '-'}
                              </td>
                              <td className="p-3">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  Lead
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Locations Summary */}
      {chartData?.barData && chartData.barData.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Top Performing Locations</CardTitle>
            <p className="text-sm text-muted-foreground">Locations with highest number of leads</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {chartData.barData.slice(0, 8).map((item: any, index: number) => (
                <div 
                  key={index} 
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <h3 className="font-medium" title={item.fullLocation}>
                        {item.location}
                      </h3>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {Math.round((item.leads / chartData.totalLeads) * 100)}%
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-primary">{item.leads}</div>
                  <p className="text-sm text-muted-foreground">leads</p>
                  <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full"
                      style={{ 
                        width: `${(item.leads / chartData.totalLeads) * 100}%`,
                        backgroundColor: COLORS[index % COLORS.length]
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}