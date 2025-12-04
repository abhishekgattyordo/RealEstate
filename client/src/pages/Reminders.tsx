// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import ReminderCalendar from "@/components/ReminderCalendar";
// import ReminderCard from "@/components/ReminderCard";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Plus } from "lucide-react";

// const mockReminders = [
// {
//   id: "1",
//   title: "Follow up on property viewing for Downtown Apartment",
//   clientName: "John Smith",
//   date: "Nov 15, 2025",
//   time: "10:00 AM",
//   status: "pending" as const
// },
//   {
//     id: "2",
//     title: "Send contract documents",
//     clientName: "Sarah Johnson",
//     date: "Nov 14, 2025",
//     time: "2:00 PM",
//     status: "overdue" as const
//   },
//   {
//     id: "3",
//     title: "Client meeting scheduled",
//     clientName: "Mike Davis",
//     date: "Nov 12, 2025",
//     time: "11:00 AM",
//     status: "completed" as const
//   },
//   {
//     id: "4",
//     title: "Property showing at Beverly Hills",
//     clientName: "Emma Wilson",
//     date: "Nov 16, 2025",
//     time: "3:00 PM",
//     status: "pending" as const
//   }
// ];

// const calendarReminders = [
//   { id: "1", date: "2025-11-15", title: "Follow up with John", time: "10:00 AM" },
//   { id: "2", date: "2025-11-15", title: "Property viewing", time: "2:00 PM" },
//   { id: "3", date: "2025-11-20", title: "Client meeting", time: "11:00 AM" },
// ];

// export default function Reminders() {
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     clientName: "",
//     date: "",
//     time: "",
//     notes: ""
//   });

//   const handleAddReminder = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Reminder added:", formData);
//     setShowAddForm(false);
//     setFormData({ title: "", clientName: "", date: "", time: "", notes: "" });
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between gap-4 flex-wrap">
//         <div>
//           <h2 className="text-2xl md:text-3xl font-bold">Reminders</h2>
//           <p className="text-muted-foreground">Track your follow-ups and appointments</p>
//         </div>
//         <Button onClick={() => setShowAddForm(true)} data-testid="button-add-reminder">
//           <Plus className="h-4 w-4 mr-2" />
//           Add Reminder
//         </Button>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2">
//           <ReminderCalendar
//             reminders={calendarReminders}
//             onAddReminder={() => setShowAddForm(true)}
//             onSelectDate={(date) => console.log("Selected date:", date)}
//           />
//         </div>

//         <div className="space-y-4">
//           <h3 className="font-semibold text-lg">Upcoming Reminders</h3>
//           {mockReminders
//             .filter(r => r.status !== "completed")
//             .map(reminder => (
//               <ReminderCard
//                 key={reminder.id}
//                 {...reminder}
//                 onComplete={(id) => console.log("Complete:", id)}
//                 onEdit={(id) => console.log("Edit:", id)}
//                 onDelete={(id) => console.log("Delete:", id)}
//               />
//             ))}
//         </div>
//       </div>

//       <div>
//         <h3 className="font-semibold text-lg mb-4">All Reminders</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {mockReminders.map(reminder => (
//             <ReminderCard
//               key={reminder.id}
//               {...reminder}
//               onComplete={(id) => console.log("Complete:", id)}
//               onEdit={(id) => console.log("Edit:", id)}
//               onDelete={(id) => console.log("Delete:", id)}
//             />
//           ))}
//         </div>
//       </div>

//       <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Add New Reminder</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleAddReminder} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="title">Title *</Label>
//               <Input
//                 id="title"
//                 value={formData.title}
//                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                 required
//                 data-testid="input-title"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="clientName">Client Name *</Label>
//               <Input
//                 id="clientName"
//                 value={formData.clientName}
//                 onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
//                 required
//                 data-testid="input-client-name"
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="date">Date *</Label>
//                 <Input
//                   id="date"
//                   type="date"
//                   value={formData.date}
//                   onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//                   required
//                   data-testid="input-date"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="time">Time *</Label>
//                 <Input
//                   id="time"
//                   type="time"
//                   value={formData.time}
//                   onChange={(e) => setFormData({ ...formData, time: e.target.value })}
//                   required
//                   data-testid="input-time"
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="notes">Notes</Label>
//               <Textarea
//                 id="notes"
//                 value={formData.notes}
//                 onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
//                 rows={3}
//                 data-testid="input-notes"
//               />
//             </div>

//             <div className="flex gap-2 pt-4">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => setShowAddForm(false)}
//                 className="flex-1"
//                 data-testid="button-cancel"
//               >
//                 Cancel
//               </Button>
//               <Button type="submit" className="flex-1" data-testid="button-submit">
//                 Add Reminder
//               </Button>
//             </div>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }



import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import ReminderCalendar from "@/components/ReminderCalendar";
import ReminderCard from "@/components/ReminderCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { supabase } from "../supabaseClient";
import toast, { Toaster } from "react-hot-toast";

interface Reminder {
  id: string;
  title: string;
  clientName: string;
  date: string;
  time: string;
  notes?: string;
  status: "pending" | "completed" | "overdue";
  user_id: string;
}

// Inside your component after fetching reminders from Supabase

export default function Reminders() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    clientName: "",
    date: "",
    time: "",
    notes: "",
  });
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const calendarReminders = reminders.map((r) => ({
    id: r.id,
    date: r.date, // ensure YYYY-MM-DD format
    title: r.title,
    time: r.time,
  }));

  const handleAddReminder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.clientName ||
      !formData.date ||
      !formData.time
    )
      return;

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      alert("User not authenticated!");
      console.error("User error:", userError);
      return;
    }
    const userId = user.id;

    const { data: userProfile, error: profileError } = await supabase
      .from("users")
      .select("company_id")
      .eq("id", user.id)
      .single();

    if (profileError || !userProfile) {
      console.error("User profile not found", profileError);
      alert("❌ User profile not found. Please contact support.");
      return;
    }

    const companyId = userProfile.company_id;

    if (editingReminder) {
      // ----- UPDATE EXISTING REMINDER -----
      const { error } = await supabase
        .from("reminders")
        .update({
          title: formData.title,
          client_name: formData.clientName,
          date: formData.date,
          time: formData.time,
          notes: formData.notes,
        })
        .eq("id", editingReminder.id);

      if (error) {
        console.error("Error updating reminder:", error.message);
        alert("Failed to update reminder.");
      } else {
        // Update parent state
        setReminders((prev) =>
          prev.map((r) =>
            r.id === editingReminder.id ? { ...r, ...formData } : r
          )
        );
        setEditingReminder(null); // reset editing state
        setFormData({
          title: "",
          clientName: "",
          date: "",
          time: "",
          notes: "",
        });
        setShowAddForm(false);
      }
    } else {
      // ----- ADD NEW REMINDER -----
      const { data, error } = await supabase
        .from("reminders")
        .insert({
          title: formData.title,
          company_id: companyId,
          client_name: formData.clientName,
          date: formData.date,
          time: formData.time,
          notes: formData.notes,
          status: "pending",
          user_id: userId,
        })
        .select("*");

      if (error) {
        console.error("Error adding reminder:", error.message);
        alert("Failed to add reminder.");
      } else if (data && data.length > 0) {
        const newReminder = data[0];

        // ⭐ ADD NOTIFICATION
        await supabase.from("activity_feed").insert([
          {
            user_id: userId,
            company_id: companyId,
            action_type: "reminder",
            title: `Reminder Added`,
            description: `Reminder for ${formData.clientName} on ${formData.date} at ${formData.time}`,
            related_id: newReminder.id,
            created_at: new Date().toISOString(),
          },
        ]);
        setReminders((prev) => [...prev, data[0]]);
        setShowAddForm(false);
        setFormData({
          title: "",
          clientName: "",
          date: "",
          time: "",
          notes: "",
        });
      }
    }
  };

  const fetchReminders = async () => {
    setLoading(true);

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("User not authenticated:", userError);
      setLoading(false);
      return;
    }

    const userId = user.id;

    const { data: userProfile, error: profileError } = await supabase
      .from("users")
      .select("company_id")
      .eq("id", userId)
      .single();

    if (profileError || !userProfile) {
      console.error("User profile not found", profileError);
      setReminders([]);
      setLoading(false);
      return;
    }

    const companyId = userProfile.company_id;
    console.log("Logged-in user's company_id:", companyId);

    // Fetch reminders
    const { data, error } = await supabase
      .from("reminders")
      .select("*")
      .eq("company_id", companyId)
      .order("date", { ascending: true });

    if (error) {
      console.error("Error fetching reminders:", error.message);
    } else if (data) {
  const mappedReminders = data.map((r: any) => ({
    ...r,
    clientName: r.client_name, // map from snake_case to camelCase
  }));
  setReminders(mappedReminders);
}


    setLoading(false);
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this reminder?"
    );
    if (!confirmed) return;

    // Delete from Supabase
    const { error } = await supabase.from("reminders").delete().eq("id", id);

    if (error) {
      alert("Failed to delete reminder: " + error.message);
      console.error(error);
    } else {
      // Update state to remove from UI
      setReminders((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const handleEdit = (id: string) => {
    const reminder = reminders.find((r) => r.id === id); // find reminder by id
    if (reminder) {
      setEditingReminder(reminder); // store it in state
      setFormData({
        title: reminder.title,
        clientName: reminder.clientName,
        date: reminder.date,
        time: reminder.time,
        notes: reminder.notes || "",
      });
      setShowAddForm(true); // open the form
    }
  };

  const handleComplete = async (id: string) => {
    setUpdatingId(id);
    const reminder = reminders.find((r) => r.id === id);
    if (!reminder) return;

    const newStatus = reminder.status === "completed" ? "pending" : "completed";

    const { error } = await supabase
      .from("reminders")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      console.error("Error updating reminder status:", error.message);
      alert("Failed to update status");
    } else {
      setReminders((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
    }

    setUpdatingId(null);
  };



  
 const notifiedRef = useRef<Set<string>>(new Set());
const insertedRef = useRef<Set<string>>(new Set());
const audioRef = useRef<HTMLAudioElement | null>(null);
const remindersRef = useRef<Reminder[]>([]);

useEffect(() => {
  remindersRef.current = reminders;
}, [reminders]);

useEffect(() => {
  audioRef.current = new Audio("/notification.mp3");
}, []);

useEffect(() => {
  const checkReminders = async () => {
    const now = new Date();
    const nowDate = now.toISOString().split("T")[0];
    const nowTime = now.toTimeString().slice(0, 5);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const userId = user.id;

    const { data: userProfile } = await supabase
      .from("users")
      .select("company_id")
      .eq("id", userId)
      .single();
    const companyId = userProfile?.company_id;

    for (const reminder of remindersRef.current) {
      const reminderDate = reminder.date.split("T")[0];
      const reminderTime = reminder.time.slice(0, 5);

      const alreadyNotified = notifiedRef.current.has(reminder.id);
      const isMatch =
        reminder.status === "pending" &&
        reminderDate === nowDate &&
        reminderTime === nowTime;

      if (isMatch && !alreadyNotified) {
        const reminderDateFormatted = new Date(reminder.date).toLocaleDateString();

        try {
          await audioRef.current?.play();
        } catch (e) {
          console.error("Audio error:", e);
        }

        toast(`Reminder: ${reminder.title} - Client: ${reminder.clientName}`);

        if (Notification.permission === "granted") {
          new Notification(`Reminder: ${reminder.title}`, {
            body: `Client: ${reminder.clientName}\nTime: ${reminder.time}`,
            icon: "/notification-icon.png",
          });
        }

        if (!insertedRef.current.has(reminder.id)) {
          const { data, error } = await supabase
            .from("activity_feed")
            .insert([
              {
                user_id: reminder.user_id,
                company_id: companyId,
                action_type: "reminder",
                title: "Reminder Triggered",
                description: `Reminder for ${reminder.clientName} on ${reminderDateFormatted} at ${reminder.time}`,
                related_id: reminder.id,
                created_at: new Date().toISOString(),
              },
            ])
            .select("*");

          if (error) console.error("❌ Insert Error:", error);
          else console.log("✅ Insert Success:", data);

          insertedRef.current.add(reminder.id);
        }

        notifiedRef.current.add(reminder.id);
      }
    }
  };

  const interval = setInterval(checkReminders, 10000);
  return () => clearInterval(interval);
}, []);



  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Reminders</h2>
          <p className="text-muted-foreground">
            Track your follow-ups and appointments
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          data-testid="button-add-reminder"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Reminder
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ReminderCalendar
            reminders={calendarReminders}
            onAddReminder={() => setShowAddForm(true)}
            onSelectDate={(date) => console.log("Selected date:", date)}
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Upcoming Reminders</h3>
          {reminders
            .filter((r) => r.status !== "completed")
            .map((reminder) => (
              <ReminderCard
                key={reminder.id}
                {...reminder}
                onComplete={handleComplete}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-4">All Reminders</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reminders.map((reminder) => (
            <ReminderCard
              key={reminder.id}
              {...reminder}
              onComplete={handleComplete}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Reminder</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddReminder} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                data-testid="input-title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name *</Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) =>
                  setFormData({ ...formData, clientName: e.target.value })
                }
                required
                data-testid="input-client-name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                  data-testid="input-date"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <div className="grid grid-cols-2 gap-2">
                  {/* Hours (00–23) */}
                  <select
                    className="border rounded px-2 py-2"
                    value={formData.time.split(":")[0] || ""}
                    onChange={(e) => {
                      const minute = formData.time.split(":")[1] || "00";
                      setFormData({
                        ...formData,
                        time: `${e.target.value}:${minute}`,
                      });
                    }}
                  >
                    {Array.from({ length: 24 }, (_, i) => {
                      const hr = String(i).padStart(2, "0");
                      return (
                        <option key={hr} value={hr}>
                          {hr}
                        </option>
                      );
                    })}
                  </select>

                  {/* Minutes (00–59) */}
                  <select
                    className="border rounded px-2 py-2"
                    value={formData.time.split(":")[1] || ""}
                    onChange={(e) => {
                      const hour = formData.time.split(":")[0] || "00";
                      setFormData({
                        ...formData,
                        time: `${hour}:${e.target.value}`,
                      });
                    }}
                  >
                    {Array.from({ length: 60 }, (_, i) => {
                      const min = String(i).padStart(2, "0");
                      return (
                        <option key={min} value={min}>
                          {min}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                rows={3}
                data-testid="input-notes"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddForm(false)}
                className="flex-1"
                data-testid="button-cancel"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                data-testid="button-submit"
              >
                Add Reminder
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
