// import { useState } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import PropertyCard from "@/components/PropertyCard";
// import PropertyFilter from "@/components/PropertyFilter";
// import AddPropertyForm from "@/components/AddPropertyForm";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Plus } from "lucide-react";

// import villa from "@assets/generated_images/Modern_luxury_villa_exterior_68d0642c.png";
// import apartment from "@assets/generated_images/Modern_apartment_interior_cc358818.png";
// import house from "@assets/generated_images/Family_house_exterior_82ca1fe0.png";
// import condo from "@assets/generated_images/Luxury_condo_building_2cca3e4b.png";
// import cottage from "@assets/generated_images/Cozy_cottage_exterior_644fce70.png";
// import commercial from "@assets/generated_images/Commercial_office_building_d56401ae.png";

// const mockProperties = [
//   {
//     id: "1",
//     image: villa,
//     title: "Modern Luxury Villa",
//     location: "Beverly Hills, CA",
//     price: "$2,450,000",
//     type: "Buy" as const,
//     bedrooms: 5,
//     bathrooms: 4,
//     area: "4,200 sq ft"
//   },
//   {
//     id: "2",
//     image: apartment,
//     title: "Spacious Downtown Apartment",
//     location: "Manhattan, NY",
//     price: "$850,000",
//     type: "Buy" as const,
//     bedrooms: 3,
//     bathrooms: 2,
//     area: "1,800 sq ft"
//   },
//   {
//     id: "3",
//     image: house,
//     title: "Cozy Family House",
//     location: "Austin, TX",
//     price: "$625,000",
//     type: "Sell" as const,
//     bedrooms: 4,
//     bathrooms: 3,
//     area: "2,500 sq ft"
//   },
//   {
//     id: "4",
//     image: condo,
//     title: "Luxury High-Rise Condo",
//     location: "Miami, FL",
//     price: "$1,200,000",
//     type: "Buy" as const,
//     bedrooms: 3,
//     bathrooms: 3,
//     area: "2,100 sq ft"
//   },
//   {
//     id: "5",
//     image: cottage,
//     title: "Charming Cottage",
//     location: "Portland, OR",
//     price: "$485,000",
//     type: "Sell" as const,
//     bedrooms: 2,
//     bathrooms: 2,
//     area: "1,400 sq ft"
//   },
//   {
//     id: "6",
//     image: commercial,
//     title: "Commercial Office Space",
//     location: "San Francisco, CA",
//     price: "$3,800,000",
//     type: "Buy" as const,
//     area: "8,500 sq ft"
//   }
// ];

// export default function Properties() {
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [activeTab, setActiveTab] = useState("all");

//   const handleFilter = (filters: any) => {
//     console.log("Filters applied:", filters);
//   };

//   const handleAddProperty = (data: any) => {
//     console.log("Property added:", data);
//     setShowAddForm(false);
//   };

//   const buyProperties = mockProperties.filter(p => p.type === "Buy");
//   const sellProperties = mockProperties.filter(p => p.type === "Sell");

//   return (
//     <div className="space-y-6">

//       <div className="flex items-center justify-between gap-4 flex-wrap">
//         <div>
//          <h2 className="text-2xl md:text-3xl font-bold text-primary">Properties</h2>
//           <p className="text-muted-foreground">Browse and manage property listings</p>
//         </div>
//         <Button onClick={() => setShowAddForm(true)} data-testid="button-add-property">
//           <Plus className="h-4 w-4 mr-2" />
//           Add Property
//         </Button>
//       </div>

//       <PropertyFilter onFilter={handleFilter} />

//       <Tabs value={activeTab} onValueChange={setActiveTab}>
//         <TabsList className="grid w-full grid-cols-3 max-w-md">
//           <TabsTrigger value="all" data-testid="tab-all">All</TabsTrigger>
//           <TabsTrigger value="buy" data-testid="tab-buy">Buy</TabsTrigger>
//           <TabsTrigger value="sell" data-testid="tab-sell">Sell</TabsTrigger>
//         </TabsList>

//         <TabsContent value="all" className="mt-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {mockProperties.map(property => (
//               <PropertyCard
//                 key={property.id}
//                 {...property}
//                 onView={(id) => console.log("View property:", id)}
//                 onContact={(id) => console.log("Contact for property:", id)}
//               />
//             ))}
//           </div>
//         </TabsContent>

//         <TabsContent value="buy" className="mt-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {buyProperties.map(property => (
//               <PropertyCard
//                 key={property.id}
//                 {...property}
//                 onView={(id) => console.log("View property:", id)}
//                 onContact={(id) => console.log("Contact for property:", id)}
//               />
//             ))}
//           </div>
//         </TabsContent>

//         <TabsContent value="sell" className="mt-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {sellProperties.map(property => (
//               <PropertyCard
//                 key={property.id}
//                 {...property}
//                 onView={(id) => console.log("View property:", id)}
//                 onContact={(id) => console.log("Contact for property:", id)}
//               />
//             ))}
//           </div>
//         </TabsContent>
//       </Tabs>

//       <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
//         <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle>Add New Property</DialogTitle>
//           </DialogHeader>
//           <AddPropertyForm
//             onSubmit={handleAddProperty}
//             onCancel={() => setShowAddForm(false)}
//           />
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import PropertyCard from "@/components/PropertyCard";
// import PropertyFilter from "@/components/PropertyFilter";
// import AddPropertyForm from "@/components/AddPropertyForm";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Plus } from "lucide-react";
// import { supabase } from "@/supabaseClient";

// export default function Properties() {
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [activeTab, setActiveTab] = useState("all");
//   const [properties, setProperties] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const handleFilter = (filters: any) => {
//     console.log("Filters applied:", filters);
//   };

//   const handleAddProperty = (data: any) => {
//     console.log("Property added:", data);
//     setShowAddForm(false);
//     fetchProperties(); // refresh list after adding
//   };

//   // Fetch properties from Supabase
//   const fetchProperties = async () => {
//     setLoading(true);
//     const { data, error } = await supabase
//       .from("properties")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (error) {
//       console.error("Error fetching properties:", error.message);
//     } else {
//       // Map each property to fix images & listing type for PropertyCard
//       const formatted = (data || []).map((p: any) => ({
//         ...p,
//         image: p.images?.[0] || "/placeholder.png", // first image or fallback
//         type: p.listing_type === "sell" ? "Sell" : "Buy",
//         price: `$${Number(p.price).toLocaleString()}`,
//       }));
//       setProperties(formatted);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   const buyProperties = properties.filter(p => p.type === "Buy");
//   const sellProperties = properties.filter(p => p.type === "Sell");

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between gap-4 flex-wrap">
//         <div>
//           <h2 className="text-2xl md:text-3xl font-bold text-primary">Properties</h2>
//           <p className="text-muted-foreground">Browse and manage property listings</p>
//         </div>
//         <Button onClick={() => setShowAddForm(true)} data-testid="button-add-property">
//           <Plus className="h-4 w-4 mr-2" />
//           Add Property
//         </Button>
//       </div>

//       <PropertyFilter onFilter={handleFilter} />

//       {loading ? (
//         <p>Loading properties...</p>
//       ) : (
//         <Tabs value={activeTab} onValueChange={setActiveTab}>
//           <TabsList className="grid w-full grid-cols-3 max-w-md">
//             <TabsTrigger value="all" data-testid="tab-all">All</TabsTrigger>
//             <TabsTrigger value="buy" data-testid="tab-buy">Buy</TabsTrigger>
//             <TabsTrigger value="sell" data-testid="tab-sell">Sell</TabsTrigger>
//           </TabsList>

//           <TabsContent value="all" className="mt-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {properties.map(property => (
//                 <PropertyCard
//                   key={property.id}
//                   {...property}
//                   onView={(id) => console.log("View property:", id)}
//                   onContact={(id) => console.log("Contact for property:", id)}
//                 />
//               ))}
//             </div>
//           </TabsContent>

//           <TabsContent value="buy" className="mt-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {buyProperties.map(property => (
//                 <PropertyCard
//                   key={property.id}
//                   {...property}
//                   onView={(id) => console.log("View property:", id)}
//                   onContact={(id) => console.log("Contact for property:", id)}
//                 />
//               ))}
//             </div>
//           </TabsContent>

//           <TabsContent value="sell" className="mt-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {sellProperties.map(property => (
//                 <PropertyCard
//                   key={property.id}
//                   {...property}
//                   onView={(id) => console.log("View property:", id)}
//                   onContact={(id) => console.log("Contact for property:", id)}
//                 />
//               ))}
//             </div>
//           </TabsContent>
//         </Tabs>
//       )}

//       <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
//         <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle>Add New Property</DialogTitle>
//           </DialogHeader>
//           <AddPropertyForm
//             onSubmit={handleAddProperty}
//             onCancel={() => setShowAddForm(false)}
//           />
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }



import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import PropertyList, { Property } from "@/components/PropertyFilter";
import AddPropertyForm from "@/components/AddPropertyForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/supabaseClient";
import ViewPropertyModal from "./ViewPropertyModal";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

interface PropertyCardProps {
  id: string;
  images: string[];
  title: string;
  location: string;
  price: string; // formatted price
  type: string; // Buy / Sell
  bedrooms: number;
  bathrooms: number;
  listing_type: string;
  area: number; // area in sqft
  onView: (id: string) => void;
    mobile_number?: string;
  onContact: (id: string) => void;
}

export default function Properties() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [showEditForm, setShowEditForm] = useState(false);
  const [viewProperty, setViewProperty] = useState<Property | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const navigate = useNavigate();

  // ✅ Edit property handler

  const handleEdit = (id: string) => {
    console.log("Editing property ID:", id);
    console.log(
      "Available property IDs:",
      filteredProperties.map((p) => p.id)
    );

    const property = filteredProperties.find((p) => p.id === id);
    console.log("Matched property:", property);

    if (property) {
      setSelectedProperty(property); // same as setSelectedEnquiry
      setShowEditForm(true); // show the edit form/modal
    } else {
      console.warn("No property found for this ID!");
    }
  };

  // ✅ Delete property handler
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return;

    const { error } = await supabase.from("properties").delete().eq("id", id);

    if (error) {
      console.error("Error deleting property:", error);
      toast.error("Failed to delete property!");
    } else {
      alert("Property deleted successfully!");
        toast.success("Property deleted successfully!");
      setFilteredProperties((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Receive filtered data from PropertyList
  const handleFiltered = (data: Property[]) => {
    const normalized = data.map((p) => ({
      ...p,
      listing_type: (p.listing_type || "").trim().toLowerCase(), // "rent" or "sale"
    }));

    console.log("Filtered data from PropertyList:", data);
    console.log("Normalized data:", normalized);

    setFilteredProperties(normalized);
    setLoading(false);
  };

  // Tab-specific lists using listing_type
  // "Buy" tab = properties for sale
  // "Buy" tab = properties for sale
  const buyProperties = filteredProperties.filter(
    (p) => p.listing_type === "for sale"
  );

  // "Rent" tab = properties for rent
  const sellProperties = filteredProperties.filter(
    (p) => p.listing_type === "for rent"
  );

  const handleAddProperty = (data: any) => {
    console.log("Property added:", data);
    setShowAddForm(false);
  };

  // Map Property to PropertyCardProps
  const mapToCardProps = (property: Property): PropertyCardProps => ({
    id: property.id,
    user_id: property.user_id,
    images: property.images || ["/placeholder.png"],
    title: property.title,
    location: property.location,
    price: `₹ ${property.price?.toLocaleString() || "N/A"}`,
    type:
      property.listing_type?.toLowerCase() === "sale"
        ? "Sell"
        : property.listing_type?.toLowerCase() === "rent"
        ? "Buy"
        : "N/A",
    bedrooms: property.bedrooms,
    
    bathrooms: property.bathrooms,
    listing_type: property.listing_type,
    area: property.area_sqft,

    onView: (id) => navigate(`/properties/view/${id}`),
    onContact: (id) => console.log("Contact for property:", id),
    onEdit: handleEdit, // ✅ Add this
    onDelete: handleDelete, // ✅ Add this
  });

  // const handleView = async (id: string) => {
  //   console.log("handleView called with ID:", id);

  //   if (!id) {
  //     console.warn("No ID provided to handleView!");
  //     return;
  //   }

  //   const { data, error } = await supabase
  //     .from("properties")
  //     .select("*")
  //     .eq("id", id)
  //     .single();

  //   console.log("Supabase response:", { data, error });

  //   if (error) {
  //     console.error("Error fetching property:", error);
  //     return;
  //   }

  //   console.log("Property fetched successfully:", data);
  //   setViewProperty(data); // store the property details
  //   setShowViewModal(true); // open the modal
  // };

  async function checkMyCompany(userId: string) {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("id", userId)  // fetch company with specific id
    .maybeSingle();

  console.log("========== MY COMPANY ==========");
  if (error) {
    console.error("❌ ERROR FETCHING COMPANY:", error);
  } else {
    console.log("✅ COMPANY DATA:", data);
  }
  console.log("================================");
}


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            Properties
          </h2>
          <p className="text-muted-foreground">
            Browse and manage property listings
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          data-testid="button-add-property"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>

      {/* Filter Component */}
      <PropertyList onFiltered={handleFiltered} />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="buy">Buy</TabsTrigger>
          <TabsTrigger value="sell">Sell</TabsTrigger>
        </TabsList>

        {/* All Properties */}
        <TabsContent value="all" className="mt-6">
          {loading ? (
            <p>Loading...</p>
          ) : filteredProperties.length === 0 ? (
            <p>No properties found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} {...mapToCardProps(property)} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Buy Properties */}
        <TabsContent value="buy" className="mt-6">
          {buyProperties.length === 0 ? (
            <p>No properties available for buying.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {buyProperties.map((property) => (
                <PropertyCard key={property.id} {...mapToCardProps(property)} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Sell Properties */}
        <TabsContent value="sell" className="mt-6">
          {sellProperties.length === 0 ? (
            <p>No properties available for selling.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sellProperties.map((property) => (
                <PropertyCard key={property.id} {...mapToCardProps(property)} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Add Property Dialog */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Property</DialogTitle>
          </DialogHeader>
          <AddPropertyForm
            onSubmit={handleAddProperty}
            onCancel={() => setShowAddForm(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>
          </DialogHeader>

          {selectedProperty && (
            <AddPropertyForm
              property={selectedProperty} // prefill form with selected property
              onSubmit={(updatedData) => {
                // Update the list of properties after edit
                setFilteredProperties((prev) =>
                  prev.map((p) =>
                    p.id === selectedProperty.id ? { ...p, ...updatedData } : p
                  )
                );
                setShowEditForm(false);
                setSelectedProperty(null);
              }}
              onCancel={() => {
                setShowEditForm(false);
                setSelectedProperty(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
