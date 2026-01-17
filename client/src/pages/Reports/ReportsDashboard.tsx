// import React from "react";
// import { useNavigate } from "react-router-dom";

// const ReportsDashboard = () => {
//   const navigate = useNavigate();

//   const items = [
//     { title: "Pending Followups", path: "/reports/pending-followups" },
//     { title: "Total Converted", path: "/reports/converted" },
//     { title: "Lost Leads", path: "/reports/lost-leads" },
//     { title: "Leads by Location", path: "/reports/leads-by-location" },
//   ];

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">Reports</h2>

//       <div className="flex flex-col gap-4">
//         {items.map((item) => (
//           <div
//             key={item.title}
//             onClick={() => navigate(item.path)}
//            className="w-full cursor-pointer text-primary font-semibold hover:underline transition py-2 px-4 border rounded"

//           >
//             {item.title}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ReportsDashboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsersReport } from "@/services/reportService";

const ReportsDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reportData, setReportData] = useState<any>(null);

  const reportItems = [
    {
      title: "Pending Followups",
      path: "/reports/pending-followups",
      icon: "📋",
      description: "View and manage upcoming client followups",
      color: "from-[#491180] to-[#3A0D6B]",
      countColor: "bg-[#E0B100]",
      iconBg: "bg-[#491180]/10",
      iconColor: "text-[#491180]",
      dataKey: "pending",
      statusId: 2
    },
    // {
    //   title: "Follow-up Completed",
    //   path: "/reports/followup-completed",
    //   icon: "✅",
    //   description: "Completed follow-ups history",
    //   color: "from-[#10B981] to-[#059669]",
    //   countColor: "bg-[#491180]",
    //   iconBg: "bg-[#10B981]/10",
    //   iconColor: "text-[#10B981]",
    //   dataKey: "followupCompleted",
    //   statusId: 3
    // },
    {
      title: "Total Converted",
      path: "/reports/converted",
      icon: "🎯",
      description: "Track successful lead conversions",
      color: "from-[#8B5CF6] to-[#7C3AED]",
      countColor: "bg-[#E0B100]",
      iconBg: "bg-[#8B5CF6]/10",
      iconColor: "text-[#8B5CF6]",
      dataKey: "converted",
      statusId: 4
    },
    {
      title: "Lost Leads",
      path: "/reports/lost-leads",
      icon: "📉",
      description: "Analyze and recover lost opportunities",
      color: "from-[#EF4444] to-[#DC2626]",
      countColor: "bg-[#E0B100]",
      iconBg: "bg-[#EF4444]/10",
      iconColor: "text-[#EF4444]",
      dataKey: "lost",
      statusId: 6
    },
    {
      title: "Leads by Location",
      path: "/reports/leads-by-location",
      icon: "📍",
      description: "Geographic distribution of leads",
      color: "from-[#3B82F6] to-[#1D4ED8]",
      countColor: "bg-[#491180]",
      iconBg: "bg-[#3B82F6]/10",
      iconColor: "text-[#3B82F6]",
      dataKey: "byLocation",
      statusId: null
    },
    // {
    //   title: "All Enquiries",
    //   path: "/reports/all-enquiries",
    //   icon: "📊",
    //   description: "Complete enquiry database",
    //   color: "from-[#F59E0B] to-[#D97706]",
    //   countColor: "bg-[#491180]",
    //   iconBg: "bg-[#F59E0B]/10",
    //   iconColor: "text-[#F59E0B]",
    //   dataKey: "allEnquiries",
    //   statusId: null
    // }
  ];

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching report data for dashboard...");
      
      const data = await getUsersReport();
      console.log("Dashboard data received:", data);
      
      if (data) {
        setReportData(data);
        
        // Calculate total enquiries from all categories
        const totalEnquiries = 
          (data.pending?.length || 0) +
          (data.followupCompleted?.length || 0) +
          (data.converted?.length || 0) +
          (data.lost?.length || 0);
        
        // Add allEnquiries count to the data
        data.allEnquiries = totalEnquiries;
      } else {
        setError("No data returned from server");
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load reports data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getRecentPendingFollowups = () => {
    if (!reportData?.pending) return [];
    
    // Sort by date (newest first) and take top 4
    return reportData.pending
      .filter((enquiry: any) => enquiry.date)
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4)
      .map((enquiry: any) => ({
        id: enquiry.id,
        name: enquiry.name,
        date: enquiry.date,
        property_name: enquiry.property_name,
        mobile_number: enquiry.mobile_number,
        budget: enquiry.budget,
        time: formatTimeAgo(enquiry.date),
        action: `${enquiry.name} - ${enquiry.property_name || 'No Property'}`,
        icon: "⏳",
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
        value: "Pending"
      }));
  };

  const getCountForReport = (dataKey: string): number => {
    if (!reportData) return 0;
    
    switch (dataKey) {
      case "pending":
        return reportData.pending?.length || 0;
      case "followupCompleted":
        return reportData.followupCompleted?.length || 0;
      case "converted":
        return reportData.converted?.length || 0;
      case "lost":
        return reportData.lost?.length || 0;
      case "byLocation":
        return Object.keys(reportData.byLocation || {}).length;
      case "allEnquiries":
        return reportData.allEnquiries || 0;
      default:
        return 0;
    }
  };

  const calculateConversionRate = () => {
    if (!reportData) return 0;
    
    const convertedCount = reportData.converted?.length || 0;
    const totalEnquiries = reportData.allEnquiries || 0;
    
    if (totalEnquiries === 0) return 0;
    return ((convertedCount / totalEnquiries) * 100).toFixed(1);
  };

  const calculateActiveLeads = () => {
    if (!reportData) return 0;
    
    return (
      (reportData.pending?.length || 0) +
      (reportData.followupCompleted?.length || 0)
    );
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getTopLocation = () => {
    if (!reportData?.byLocation) return "N/A";
    
    const locations = reportData.byLocation;
    const locationKeys = Object.keys(locations);
    
    if (locationKeys.length === 0) return "N/A";
    
    const topLocation = locationKeys
      .reduce((a, b) => locations[a].length > locations[b].length ? a : b);
    
    // Truncate if too long
    return topLocation.length > 15 
      ? `${topLocation.substring(0, 12)}...` 
      : topLocation;
  };

  const handleActivityClick = (enquiry: any) => {
    // Navigate to pending followups report
    navigate("/reports/pending-followups", { 
      state: { 
        highlightId: enquiry.id,
        enquiryDetails: {
          id: enquiry.id,
          name: enquiry.name,
          date: enquiry.date,
          property_name: enquiry.property_name,
          mobile_number: enquiry.mobile_number,
          budget: enquiry.budget
        }
      }
    });
  };

  const handleViewAllPending = () => {
    navigate("/reports/pending-followups");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8 mb-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Real-time insights and reports for your business performance
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border">
                <span className="text-sm text-gray-600">Last updated:</span>
                <span className="font-medium text-gray-900">
                  {new Date().toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <button 
                onClick={() => navigate("/")}
                className="px-4 py-2 text-sm font-medium text-[#491180] hover:text-[#3A0D6B] transition-colors"
              >
                ← Back to Dashboard
              </button>
            </div>
          </div>
          
          {/* Stats Summary */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Enquiries</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {loading ? "..." : reportData?.allEnquiries || 0}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-[#491180]/10 flex items-center justify-center">
                  <span className="text-2xl">📈</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Followups</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {loading ? "..." : getCountForReport('pending')}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-[#E0B100]/10 flex items-center justify-center">
                  <span className="text-2xl">⏳</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {loading ? "..." : `${calculateConversionRate()}%`}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Top Location</p>
                  <p className="text-xl font-bold text-gray-900 truncate">
                    {loading ? "..." : getTopLocation()}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center">
                  <span className="text-2xl">📍</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Available Reports</h2>
              <p className="text-gray-600">Click on any report to view detailed analytics</p>
            </div>
            <button 
              onClick={fetchReportData}
              disabled={loading}
              className="mt-2 md:mt-0 px-4 py-2 text-sm font-medium text-[#491180] hover:text-[#3A0D6B] transition-colors flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#491180]"></div>
                  Refreshing...
                </>
              ) : (
                <>
                  <span>🔄</span>
                  Refresh Data
                </>
              )}
            </button>
          </div>
          
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <div className="text-red-500 mb-2">⚠️ {error}</div>
              <button 
                onClick={fetchReportData}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reportItems.map((item) => {
                const count = getCountForReport(item.dataKey);
                
                return (
                  <div
                    key={item.title}
                    onClick={() => navigate(item.path)}
                    className="group cursor-pointer bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    {/* Top gradient bar */}
                    <div className={`h-2 ${item.color} bg-gradient-to-r`}></div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-14 h-14 rounded-xl ${item.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <span className={`text-2xl ${item.iconColor}`}>{item.icon}</span>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${item.countColor} text-white`}>
                            {loading ? "..." : count}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            {item.dataKey === 'byLocation' ? 'locations' : 'items'}
                          </p>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#491180] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                        <span className="text-sm font-medium text-[#491180] group-hover:text-[#3A0D6B] transition-colors">
                          View Report →
                        </span>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Stats & Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Pending Followups */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Recent Pending Followups</h3>
                <p className="text-sm text-gray-500">
                  Click on any follow-up to view details and take action
                </p>
              </div>
              <button
                onClick={handleViewAllPending}
                className="text-sm font-medium text-[#491180] hover:text-[#3A0D6B] transition-colors flex items-center gap-1"
              >
                View All ({getCountForReport('pending')})
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-3">
  {loading ? (
    <div className="text-center py-8">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#491180]"></div>
      <p className="mt-2 text-gray-500">Loading pending followups...</p>
    </div>
  ) : getRecentPendingFollowups().length === 0 ? (
    <div className="text-center py-8 text-gray-500">
      <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <p className="text-lg text-gray-600">No pending followups found</p>
      <p className="text-sm text-gray-500 mt-1">Great! You're all caught up.</p>
    </div>
  ) : (
    getRecentPendingFollowups().map((enquiry, idx) => (
      <div
        key={idx}
        onClick={() => handleActivityClick(enquiry)}
        className="
          flex flex-col sm:flex-row
          sm:items-center sm:justify-between
          gap-3 p-3
          hover:bg-yellow-50 rounded-lg
          transition-all duration-200 cursor-pointer
          group border border-transparent
          hover:border-[#E0B100] hover:shadow-sm
        "
      >
        {/* LEFT SECTION */}
        <div className="flex items-start gap-3 w-full">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
              <span className="text-lg">⏳</span>
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-medium text-gray-900 break-words sm:truncate group-hover:text-[#491180] transition-colors">
              {enquiry.name}
            </p>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
              <span className="break-words">
                {enquiry.property_name || 'No Property'}
              </span>
              <span className="hidden sm:inline">•</span>
              <span>{enquiry.time}</span>

              {enquiry.mobile_number && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <span>{enquiry.mobile_number}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center justify-between sm:justify-end gap-2">
          <span className="text-xs font-medium px-2 py-1 rounded bg-yellow-100 text-yellow-600">
            Pending
          </span>

          <svg
            className="w-5 h-5 text-gray-400 group-hover:text-[#491180] transition-colors hidden sm:block"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    ))
  )}
</div>

            
            {/* Pending Followup Stats */}
            <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-[#491180]">
                  {loading ? "..." : getCountForReport("pending")}
                </div>
                <div className="text-xs text-gray-500">Total Pending</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-[#E0B100]">
                  {loading ? "..." : getRecentPendingFollowups().length}
                </div>
                <div className="text-xs text-gray-500">Recent</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-[#10B981]">
                  {loading ? "..." : getCountForReport("converted")}
                </div>
                <div className="text-xs text-gray-500">Converted</div>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-gradient-to-br from-[#491180] to-[#3A0D6B] rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Follow-up Tips</h3>
            <div className="space-y-4">
              {[
                {
                  tip: `Follow up within 24 hours for ${getCountForReport('pending')} pending leads`,
                  icon: "⏰"
                },
                {
                  tip: "Personalize your follow-up messages",
                  icon: "💬"
                },
                {
                  tip: "Set reminders for important follow-ups",
                  icon: "🔔"
                },
                {
                  tip: "Track response rates to improve strategy",
                  icon: "📈"
                }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-white">{item.icon}</span>
                  </div>
                  <p className="text-white/90 text-sm">
                    {loading ? "Loading tip..." : item.tip}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Urgency Level</p>
                  <p className="text-white font-medium">
                    {getCountForReport('pending') > 10 ? "High" : 
                     getCountForReport('pending') > 5 ? "Medium" : "Low"}
                  </p>
                </div>
                <button 
                  onClick={fetchReportData}
                  disabled={loading}
                  className="px-4 py-2 bg-white text-[#491180] rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update Now"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-6">
              <span>Real-time Analytics Dashboard</span>
              <span>•</span>
              <span>
                {loading ? "Fetching data..." : `Last updated: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
              </span>
            </div>
            <div className="flex items-center gap-4 mt-2 md:mt-0">
              <span className="text-[#491180] font-medium">
                {loading ? "Loading..." : `${getCountForReport('pending')} pending followups`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsDashboard;