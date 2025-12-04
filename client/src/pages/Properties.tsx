

// import { useState } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";
// import PropertyCard from "@/components/PropertyCard";
// import PropertyList, { Property } from "@/components/PropertyFilter";
// import AddPropertyForm from "@/components/AddPropertyForm";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { supabase } from "@/supabaseClient";
// import ViewPropertyModal from "./ViewPropertyModal";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// interface PropertyCardProps {
//   id: string;
//   images: string[];
//   title: string;
//   location: string;
//   price: string; // formatted price
//   type: string; // Buy / Sell
//   bedrooms: number;
//   bathrooms: number;
//   listing_type: string;
//   area: number; // area in sqft
//   onView: (id: string) => void;
//   mobile_number?: string;
//   onContact: (id: string) => void;
// }

// export default function Properties() {
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [activeTab, setActiveTab] = useState("all");
//   const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedProperty, setSelectedProperty] = useState<Property | null>(
//     null
//   );
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [viewProperty, setViewProperty] = useState<Property | null>(null);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const navigate = useNavigate();

//   // ✅ Edit property handler

//   const handleEdit = (id: string) => {
//     console.log("Editing property ID:", id);
//     console.log(
//       "Available property IDs:",
//       filteredProperties.map((p) => p.id)
//     );

//     const property = filteredProperties.find((p) => p.id === id);
//     console.log("Matched property:", property);

//     if (property) {
//       setSelectedProperty(property); // same as setSelectedEnquiry
//       setShowEditForm(true); // show the edit form/modal
//     } else {
//       console.warn("No property found for this ID!");
//     }
//   };

//   // ✅ Delete property handler
//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this property?")) return;

//     const { error } = await supabase.from("properties").delete().eq("id", id);

//     if (error) {
//       console.error("Error deleting property:", error);
//       toast.error("Failed to delete property!");
//     } else {
//       alert("Property deleted successfully!");
//       toast.success("Property deleted successfully!");
//       setFilteredProperties((prev) => prev.filter((p) => p.id !== id));
//     }
//   };

//   // Receive filtered data from PropertyList
//   const handleFiltered = (data: Property[]) => {
//     const normalized = data.map((p) => ({
//       ...p,
//       listing_type: (p.listing_type || "").trim().toLowerCase(), // "rent" or "sale"
//     }));

//     console.log("Filtered data from PropertyList:", data);
//     console.log("Normalized data:", normalized);

//     setFilteredProperties(normalized);
//     setLoading(false);
//   };

//   // Tab-specific lists using listing_type
//   // "Buy" tab = properties for sale
//   // "Buy" tab = properties for sale
//   const buyProperties = filteredProperties.filter(
//     (p) => p.listing_type === "for sale"
//   );

//   // "Rent" tab = properties for rent
//   const sellProperties = filteredProperties.filter(
//     (p) => p.listing_type === "for rent"
//   );

//   const handleAddProperty = (data: any) => {
//     console.log("Property added:", data);
//     setShowAddForm(false);
//   };

//   // Map Property to PropertyCardProps
//   const mapToCardProps = (property: Property): PropertyCardProps => ({
//     id: property.id,
//     user_id: property.user_id,
//     images: property.images || ["/placeholder.png"],
//     title: property.title,
//     location: property.location,
//     price: `₹ ${property.price?.toLocaleString() || "N/A"}`,
//     type:
//       property.listing_type?.toLowerCase() === "sale"
//         ? "Sell"
//         : property.listing_type?.toLowerCase() === "buy"
//         ? "Buy"
//         : property.listing_type?.toLowerCase() === "rent"
//         ? "Rent"
//         : "N/A",
//     bedrooms: property.bedrooms,

//     bathrooms: property.bathrooms,
//     listing_type: property.listing_type,
//     area: property.area_sqft,

//     onView: (id) => navigate(`/properties/view/${id}`),
//     onContact: (id) => console.log("Contact for property:", id),
//     onEdit: handleEdit, // ✅ Add this
//     onDelete: handleDelete, // ✅ Add this
//   });

 



//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between gap-4 flex-wrap">
//         <div>
//           <h2 className="text-2xl md:text-3xl font-bold text-primary">
//             Properties
//           </h2>
//           <p className="text-muted-foreground">
//             Browse and manage property listings
//           </p>
//         </div>
//         <Button
//           onClick={() => setShowAddForm(true)}
//           data-testid="button-add-property"
//         >
//           <Plus className="h-4 w-4 mr-2" />
//           Add Property
//         </Button>
//       </div>

//       {/* Filter Component */}
//       <PropertyList onFiltered={handleFiltered} />

//       {/* Tabs */}
//       <Tabs value={activeTab} onValueChange={setActiveTab}>
//         <TabsList className="grid w-full grid-cols-3 max-w-md">
//           <TabsTrigger value="all">All</TabsTrigger>
//           <TabsTrigger value="buy">Buy</TabsTrigger>
//           <TabsTrigger value="sell">Sell</TabsTrigger>
//         </TabsList>

//         {/* All Properties */}
//         <TabsContent value="all" className="mt-6">
//           {loading ? (
//             <p>Loading...</p>
//           ) : filteredProperties.length === 0 ? (
//             <p>No properties found.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {filteredProperties.map((property) => (
//                 <PropertyCard key={property.id} {...mapToCardProps(property)} />
//               ))}
//             </div>
//           )}
//         </TabsContent>

//         {/* Buy Properties */}
//         <TabsContent value="buy" className="mt-6">
//           {buyProperties.length === 0 ? (
//             <p>No properties available for buying.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {buyProperties.map((property) => (
//                 <PropertyCard key={property.id} {...mapToCardProps(property)} />
//               ))}
//             </div>
//           )}
//         </TabsContent>

//         {/* Sell Properties */}
//         <TabsContent value="sell" className="mt-6">
//           {sellProperties.length === 0 ? (
//             <p>No properties available for selling.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {sellProperties.map((property) => (
//                 <PropertyCard key={property.id} {...mapToCardProps(property)} />
//               ))}
//             </div>
//           )}
//         </TabsContent>
//       </Tabs>

//       {/* Add Property Dialog */}
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

//       <Dialog open={showEditForm} onOpenChange={setShowEditForm}><TabsList className="grid w-full grid-cols-3 max-w-m
//         <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle>Edit Property</DialogTitle>
//           </DialogHeader>

//           {selectedProperty && (
//             <AddPropertyForm
//               property={selectedProperty} // prefill form with selected property
//               onSubmit={(updatedData) => {
//                 // Update the list of properties after edit
//                 setFilteredProperties((prev) =>
//                   prev.map((p) =>
//                     p.id === selectedProperty.id ? { ...p, ...updatedData } : p
//                   )
//                 );
//                 setShowEditForm(false);
//                 setSelectedProperty(null);
//               }}
//               onCancel={() => {
//                 setShowEditForm(false);
//                 setSelectedProperty(null);
//               }}
//             />
//           )}
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
import { toast } from "react-toastify";

interface PropertyCardProps {
  id: string;
  images: string[];
  title: string;
  location: string;
  price: string; // formatted price
  type: string; // Buy / Sell
  bedrooms: number;
  bathrooms: number;
   user_id?: string | null;
  listing_type: string;
  area: number; // area in sqft
  description?: string;
  rent_type?: string;
   property_categories?: string;
   contact_name?: string;
  contact_phone?: string;
  property_type?: string;
  onView: (id: string) => void;
  onEdit?: (id: string) => void; 
  mobile_number?: string;
  onContact: (id: string) => void;
  onDelete?: (id: string) => void;
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
  
const sellProperties = filteredProperties.filter(
  (p) => (p.listing_type || "").toLowerCase() === "for sale"
);

const buyProperties = filteredProperties.filter(
  (p) => (p.listing_type || "").toLowerCase() === "for buy"
);

const rentProperties = filteredProperties.filter(
  (p) => (p.listing_type || "").toLowerCase() === "for rent"
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
  property.listing_type?.toLowerCase() === "for sale"
    ? "Sale"
    : property.listing_type?.toLowerCase() === "for buy"
    ? "Buy"
    : property.listing_type?.toLowerCase().includes("rent") // ✅ change here
    ? "Rent"
    : "N/A",

    bedrooms: property.bedrooms,
 property_type: property.property_type,
 rent_type: property.rent_type,
    bathrooms: property.bathrooms,
    description: property.description,
    contact_name: property.contact_name,   // ✅ Add
  contact_phone: property.contact_phone,
    listing_type: property.listing_type,
    property_categories: property.property_categories,
    area: property.area_sqft,

    onView: (id) => navigate(`/properties/view/${id}`),
    onContact: (id) => console.log("Contact for property:", id),
    onEdit: handleEdit, // ✅ Add this
    onDelete: handleDelete, // ✅ Add this
  });

 



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
        <TabsList className="grid w-full grid-cols-4 max-w-md">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="buy">Buy</TabsTrigger>
          <TabsTrigger value="sale">Sell</TabsTrigger>
           <TabsTrigger value="rent">Rent</TabsTrigger>
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
        <TabsContent value="sale" className="mt-6">
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

        <TabsContent value="rent" className="mt-6">
  {rentProperties.length === 0 ? (
    <p>No properties available for rent.</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {rentProperties.map((property) => (
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
