import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { User, Mail, MessageSquare, LogOut } from "lucide-react";
import { supabase } from "../supabaseClient";

interface ProfileSettingsProps {
  onLogout: () => void;
}

interface Profile {
  name: string;
  email: string;
  phone: string;
}

export default function ProfileSettings({ onLogout }: ProfileSettingsProps) {
  const [profile, setProfile] = useState<Profile>({
    name: "",
    email: "",
    phone: "",
  });

  const [notifications, setNotifications] = useState({
    email: false,
    whatsapp: false,
    local: false,
  });

  // ✅ Save Profile Info (users table)
  const handleSaveProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const profileData = {
        id: user.id,
        name: profile.name,
        email: user.email,
        phone: profile.phone,
      };

      const { error } = await supabase
        .from("users")
        .upsert(profileData, { onConflict: "id" });

      if (error) console.error("Error saving profile:", error.message);
      else alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  // ✅ Save Notification Preferences
  const saveNotifications = async (
    updatedValues: Partial<typeof notifications>
  ) => {
    setNotifications((prev) => ({ ...prev, ...updatedValues }));

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const updatedData = {
      user_id: user.id,
      email: updatedValues.email ?? notifications.email,
      whatsapp: updatedValues.whatsapp ?? notifications.whatsapp,
      local: updatedValues.local ?? notifications.local,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("user_notifications")
      .upsert(updatedData);
    if (error) console.error("Error updating notifications:", error.message);
  };

  // ✅ Fetch Profile + Notification Data
  useEffect(() => {
    async function fetchData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch profile from users table
      const { data: profileData } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (profileData) {
        setProfile({
          name: profileData.name || "",
          email: profileData.email || "",
          phone: profileData.phone || "",
        });
      }

      // Fetch notifications
      const { data: notifData } = await supabase
        .from("user_notifications")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (notifData) {
        setNotifications({
          email: notifData.email,
          whatsapp: notifData.whatsapp,
          local: notifData.local,
        });
      }
    }

    fetchData();
  }, []);

  return (
    <div className="space-y-6 mb-22 md:mb-0">
      {/* Profile Info */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  disabled
                  className="pl-9 bg-gray-100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  className="pl-9"
                />
              </div>
            </div>
          </div>

          <Button onClick={handleSaveProfile} className="w-full">
            Save Changes
          </Button>

          <Button
            variant="destructive"
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/login";
            }}
            className="w-full"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
