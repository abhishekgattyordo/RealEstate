import ProfileSettings from "@/components/ProfileSettings";
import { useLocation } from "wouter";

export default function Settings() {
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    console.log("Logging out...");
    setLocation("/login");
  };

  return (
    <div className="space-y-6 mb-16">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-primary">Settings</h2>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <ProfileSettings onLogout={handleLogout} />
    </div>
  );
}
