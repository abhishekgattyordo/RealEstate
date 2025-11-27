import { Home, Building2, Users, Bell, BarChart3 } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Building2, label: "Properties", path: "/properties" },
    { icon: Users, label: "Enquiries", path: "/enquiries" },
    { icon: Bell, label: "Reminders", path: "/reminders" },
    { icon: BarChart3, label: "Reports", path: "/reports" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-card-border md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
          <Link key={item.path} href={item.path}>
  <a
    className={`flex flex-col items-center justify-center gap-1 px-3 py-2 min-h-16 hover-elevate active-elevate-2 transition-colors
      ${isActive ? "text-primary" : "text-muted-foreground"}
      ${item.label === "Reports" ? "mr-3" : ""} 
    `}
    data-testid={`nav-${item.label.toLowerCase()}`}
  >
    <Icon className="h-5 w-5" />
    <span className="text-xs font-medium">{item.label}</span>
  </a>
</Link>

          );
        })}
      </div>
    </nav>
  );
}
