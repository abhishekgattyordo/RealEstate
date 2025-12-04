// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Upload } from "lucide-react";
// import { supabase } from "@/supabaseClient";

// interface AddPropertyFormProps {
//   onSubmit: (data: any) => void;
//   onCancel?: () => void;
// }

// export default function AddPropertyForm({ onSubmit, onCancel }: AddPropertyFormProps) {
//   const [formData, setFormData] = useState({
//     title: "",
//     location: "",
//     price: "",
//     propertyType: "",
//     bedrooms: "",
//     bathrooms: "",
//     area: "",
//     description: "",
//     contactName: "",
//     contactPhone: "",
//     listingType: "sell"
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   const updateField = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Add New Property</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="listingType">Listing Type *</Label>
//             <Select
//               value={formData.listingType}
//               onValueChange={(value) => updateField("listingType", value)}
//             >
//               <SelectTrigger id="listingType" data-testid="select-listing-type">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="sell">For Sale</SelectItem>
//                 <SelectItem value="rent">For Rent</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="title">Property Title *</Label>
//             <Input
//               id="title"
//               value={formData.title}
//               onChange={(e) => updateField("title", e.target.value)}
//               placeholder="e.g., Modern Luxury Villa"
//               required
//               data-testid="input-title"
//             />
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="location">Location *</Label>
//               <Input
//                 id="location"
//                 value={formData.location}
//                 onChange={(e) => updateField("location", e.target.value)}
//                 placeholder="City, State"
//                 required
//                 data-testid="input-location"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="price">Price *</Label>
//               <Input
//                 id="price"
//                 value={formData.price}
//                 onChange={(e) => updateField("price", e.target.value)}
//                 placeholder="$500,000"
//                 required
//                 data-testid="input-price"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="propertyType">Property Type *</Label>
//               <Select
//                 value={formData.propertyType}
//                 onValueChange={(value) => updateField("propertyType", value)}
//               >
//                 <SelectTrigger id="propertyType" data-testid="select-property-type">
//                   <SelectValue placeholder="Select type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="house">House</SelectItem>
//                   <SelectItem value="apartment">Apartment</SelectItem>
//                   <SelectItem value="villa">Villa</SelectItem>
//                   <SelectItem value="condo">Condo</SelectItem>
//                   <SelectItem value="commercial">Commercial</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="area">Area (sq ft)</Label>
//               <Input
//                 id="area"
//                 value={formData.area}
//                 onChange={(e) => updateField("area", e.target.value)}
//                 placeholder="2,500"
//                 data-testid="input-area"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="bedrooms">Bedrooms</Label>
//               <Input
//                 id="bedrooms"
//                 type="number"
//                 value={formData.bedrooms}
//                 onChange={(e) => updateField("bedrooms", e.target.value)}
//                 placeholder="3"
//                 data-testid="input-bedrooms"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="bathrooms">Bathrooms</Label>
//               <Input
//                 id="bathrooms"
//                 type="number"
//                 value={formData.bathrooms}
//                 onChange={(e) => updateField("bathrooms", e.target.value)}
//                 placeholder="2"
//                 data-testid="input-bathrooms"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="description">Description</Label>
//             <Textarea
//               id="description"
//               value={formData.description}
//               onChange={(e) => updateField("description", e.target.value)}
//               rows={4}
//               placeholder="Enter property details..."
//               data-testid="input-description"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label>Property Images</Label>
//             <div className="border-2 border-dashed border-border rounded-md p-8 text-center hover-elevate active-elevate-2 cursor-pointer">
//               <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
//               <p className="text-sm text-muted-foreground">Click to upload images</p>
//               <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
//             </div>
//           </div>

//           <div className="border-t pt-4 mt-4">
//             <h3 className="font-semibold mb-4">Contact Information</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="contactName">Contact Name *</Label>
//                 <Input
//                   id="contactName"
//                   value={formData.contactName}
//                   onChange={(e) => updateField("contactName", e.target.value)}
//                   required
//                   data-testid="input-contact-name"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="contactPhone">Contact Phone *</Label>
//                 <Input
//                   id="contactPhone"
//                   type="tel"
//                   value={formData.contactPhone}
//                   onChange={(e) => updateField("contactPhone", e.target.value)}
//                   required
//                   data-testid="input-contact-phone"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="flex gap-2 pt-4">
//             {onCancel && (
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={onCancel}
//                 className="flex-1"
//                 data-testid="button-cancel"
//               >
//                 Cancel
//               </Button>
//             )}
//             <Button type="submit" className="flex-1" data-testid="button-submit">
//               Add Property
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }

// import { useState, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Upload } from "lucide-react";
// import { supabase } from "@/supabaseClient";

// interface Property {
//   id: string;
//   user_id: string;
//   listing_type: string;
//   title: string;
//   location: string;
//   price: number;
//   property_type: string;
//   area_sqft: number;
//   bedrooms: number;
//   bathrooms: number;
//   description: string;
//   contact_name: string;
//   contact_phone: string;
//   images: string[]; // array of public URLs
// }
// interface AddPropertyFormProps {
//   onSubmit: (data: any) => void;
//   onCancel?: () => void;
//    property?: Property;
// }

// export default function AddPropertyForm({
//   onSubmit,
//   onCancel,
//    property,
// }: AddPropertyFormProps) {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [images, setImages] = useState<File[]>([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [options, setOptions] = useState<{ id: string; name: string }[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [propertyTypeOptions, setPropertyTypeOptions] = useState<{ id: string; name: string }[]>([]);

// const [formData, setFormData] = useState({
//   title: "",
//   location: "",
//   price: "",
//   propertyType: "",
//   bedrooms: "",
//   bathrooms: "",
//   area: "",
//   description: "",
//   contactName: "",
//   contactPhone: "",
//   listingType: "sell",
// });

// const [existingImages, setExistingImages] = useState<string[]>([]);

// useEffect(() => {
//   if (property) {
//     setFormData({
//       title: property.title || "",
//       location: property.location || "",
//       price: property.price?.toString() || "",
//       propertyType: property.property_type || "",
//       bedrooms: property.bedrooms?.toString() || "",
//       bathrooms: property.bathrooms?.toString() || "",
//       area: property.area_sqft?.toString() || "",
//       description: property.description || "",
//       contactName: property.contact_name || "",
//       contactPhone: property.contact_phone || "",
//       listingType: property.listing_type || "sell",
//     });

//     setExistingImages(property.images || []);
//   }
// }, [property]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     setIsSubmitting(true);

//     try {
//       // Await the user object
//       const {
//         data: { user },
//         error: userError,
//       } = await supabase.auth.getUser();

//       if (userError) {
//         console.error("Error fetching user:", userError);
//         alert("❌ Failed to get authenticated user: " + userError.message);
//         return;
//       }

//       if (!user) {
//         console.error("No authenticated user found.");
//         alert("⚠️ You must be logged in to add a property.");
//         return;
//       }

//       const uploadedImageUrls: string[] = [];

//       for (const file of images) {
//         const filePath = `${user.id}/${Date.now()}_${file.name}`; // unique path
//         const { data: uploadData, error: uploadError } = await supabase.storage
//           .from("propertie_images")
//           .upload(filePath, file);

//         if (uploadError) {
//           console.error("Error uploading image:", uploadError.message);
//           alert("❌ Failed to upload image: " + uploadError.message);
//           return;
//         }

//         // Get public URL
//         const { data: publicData } = supabase.storage
//           .from("propertie_images")
//           .getPublicUrl(filePath);

//         uploadedImageUrls.push(publicData.publicUrl);
//       }

//       // Insert property with the current user's ID
//       const { data, error } = await supabase.from("properties").insert([
//         {
//           user_id: user.id, // ✅ user ID from supabase
//           listing_type: formData.listingType,
//           title: formData.title,
//           location: formData.location,
//           price: parseFloat(formData.price),
//           property_type: formData.propertyType,
//           area_sqft: parseFloat(formData.area),
//           bedrooms: parseInt(formData.bedrooms),
//           bathrooms: parseInt(formData.bathrooms),
//           description: formData.description,
//           contact_name: formData.contactName,
//           contact_phone: formData.contactPhone,
//           images: uploadedImageUrls,
//         },
//       ]);

//       if (error) {
//         console.error("Error adding property:", error.message);
//         alert("❌ Failed to add property: " + error.message);
//       } else {
//         alert("✅ Property added successfully!");
//         console.log("Inserted:", data);

//         onSubmit(formData);

//         // Optionally reset the form
//         setFormData({
//           title: "",
//           location: "",
//           price: "",
//           propertyType: "",
//           bedrooms: "",
//           bathrooms: "",
//           area: "",
//           description: "",
//           contactName: "",
//           contactPhone: "",
//           listingType: "sell",
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       alert("⚠️ Unexpected error occurred.");
//     } finally {
//       setIsSubmitting(false); // Re-enable button after operation
//     }
//   };

//   const updateField = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files && files.length > 0) {
//       setImages((prev) => [...prev, ...Array.from(files)]);
//       e.target.value = ""; // reset input so same files can be selected again
//     }
//   };

//   const handleUploadClick = () => {
//     fileInputRef.current?.click();
//   };

//   useEffect(() => {
//     async function fetchListingTypes() {
//       const { data, error } = await supabase.from("listing_types").select("*");

//       if (error) {
//         console.error("Error fetching listing types:", error);
//       } else {
//         setOptions(data || []);
//       }
//       setLoading(false);
//     }

//     fetchListingTypes();
//   }, []);

//   useEffect(() => {
//   async function fetchPropertyTypes() {
//     const { data, error } = await supabase.from("property_types").select("*");

//     if (error) {
//       console.error("Error fetching property types:", error);
//     } else {
//       setPropertyTypeOptions(data || []);
//     }
//   }

//   fetchPropertyTypes();
// }, []);

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Add New Property</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="listingType">Listing Type *</Label>
//             <Select
//               value={formData.listingType}
//               onValueChange={(value) => updateField("listingType", value)}
//             >
//               <SelectTrigger id="listingType" data-testid="select-listing-type">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 {options.map((option) => (
//                   <SelectItem key={option.id} value={option.name}>
//                     {option.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="title">Property Title *</Label>
//             <Input
//               id="title"
//               value={formData.title}
//               onChange={(e) => updateField("title", e.target.value)}
//               placeholder="e.g., Modern Luxury Villa"
//               required
//               data-testid="input-title"
//             />
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="location">Location *</Label>
//               <Input
//                 id="location"
//                 value={formData.location}
//                 onChange={(e) => updateField("location", e.target.value)}
//                 placeholder="City, State"
//                 required
//                 data-testid="input-location"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="price">Price *</Label>
//               <Input
//                 id="price"
//                 value={formData.price}
//                 onChange={(e) => updateField("price", e.target.value)}
//                 placeholder="$500,000"
//                 required
//                 data-testid="input-price"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//   <Label htmlFor="propertyType">Property Type *</Label>
//   <Select
//     value={formData.propertyType}
//     onValueChange={(value) => updateField("propertyType", value)}
//   >
//     <SelectTrigger
//       id="propertyType"
//       data-testid="select-property-type"
//     >
//       <SelectValue placeholder="Select type" />
//     </SelectTrigger>
//     <SelectContent>
//       {propertyTypeOptions.map((option) => (
//         <SelectItem key={option.id} value={option.name}>
//           {option.name}
//         </SelectItem>
//       ))}
//     </SelectContent>
//   </Select>
// </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="bedrooms">Bedrooms</Label>
//               <Input
//                 id="bedrooms"
//                 type="number"
//                 value={formData.bedrooms}
//                 onChange={(e) => updateField("bedrooms", e.target.value)}
//                 placeholder="3"
//                 data-testid="input-bedrooms"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="bathrooms">Bathrooms</Label>
//               <Input
//                 id="bathrooms"
//                 type="number"
//                 value={formData.bathrooms}
//                 onChange={(e) => updateField("bathrooms", e.target.value)}
//                 placeholder="2"
//                 data-testid="input-bathrooms"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="description">Description</Label>
//             <Textarea
//               id="description"
//               value={formData.description}
//               onChange={(e) => updateField("description", e.target.value)}
//               rows={4}
//               placeholder="Enter property details..."
//               data-testid="input-description"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label>Property Images</Label>

//             <div
//               className="border-2 border-dashed border-border rounded-md p-8 text-center hover-elevate active-elevate-2 cursor-pointer"
//               onClick={handleUploadClick} // trigger file input
//             >
//               <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
//               <p className="text-sm text-muted-foreground">
//                 Click to upload images
//               </p>
//               <p className="text-xs text-muted-foreground mt-1">
//                 PNG, JPG up to 10MB
//               </p>
//             </div>

//             {/* Hidden file input */}
//             <input
//               type="file"
//               ref={fileInputRef}
//               multiple
//               accept="image/png, image/jpeg"
//               className="hidden"
//               onChange={handleFiles}
//             />

//             {/* Optional: Preview uploaded images */}
//             <div className="flex flex-wrap gap-2 mt-2">
//               {images.map((file, idx) => (
//                 <img
//                   key={idx}
//                   src={URL.createObjectURL(file)}
//                   alt={file.name}
//                   className="h-24 w-24 object-cover rounded"
//                 />
//               ))}
//             </div>
//           </div>

//           <div className="border-t pt-4 mt-4">
//             <h3 className="font-semibold mb-4">Contact Information</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="contactName">Contact Name *</Label>
//                 <Input
//                   id="contactName"
//                   value={formData.contactName}
//                   onChange={(e) => updateField("contactName", e.target.value)}
//                   required
//                   data-testid="input-contact-name"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="contactPhone">Contact Phone *</Label>
//                 <Input
//                   id="contactPhone"
//                   type="tel"
//                   value={formData.contactPhone}
//                   onChange={(e) => updateField("contactPhone", e.target.value)}
//                   required
//                   data-testid="input-contact-phone"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="flex gap-2 pt-4">
//             {onCancel && (
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={onCancel}
//                 className="flex-1"
//                 data-testid="button-cancel"
//               >
//                 Cancel
//               </Button>
//             )}
//             <Button
//               type="submit"
//               className="flex-1"
//               data-testid="button-submit"
//               disabled={isSubmitting} // ✅ Disable while submitting
//             >
//               {isSubmitting ? "Adding..." : "Add Property"}
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }




import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";
import { supabase } from "@/supabaseClient";
import toast from "react-hot-toast";

interface Property {
  id: string;
  user_id: string;
  listing_type: string;
  title: string;
  location: string;
  price: number;
  property_type: string;
  area_sqft: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  contact_name: string;
  contact_phone: string;
  rent_type: string;
  images: string[];
}

interface AddPropertyFormProps {
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  property?: Property;
}

export default function AddPropertyForm({
  onSubmit,
  onCancel,
  property,
}: AddPropertyFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [propertyCategory, setPropertyCategory] = useState("");
  const [residentialCategories, setResidentialCategories] = useState<string[]>(
    []
  );
  const [commercialCategories, setCommercialCategories] = useState<string[]>(
    []
  );
  const [options, setOptions] = useState<{ id: string; name: string }[]>([]);
  const [propertyTypeOptions, setPropertyTypeOptions] = useState<
    { id: string; name: string }[]
  >([]);
  const [rentTypeOptions, setRentTypeOptions] = useState<
    { id: string; name: string }[]
  >([]);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    description: "",
    contactName: "",
    contactPhone: "",
    listingType: "sale",
    rentType: "",
  });

  // Populate form if editing
  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title || "",
        location: property.location || "",
        price: property.price?.toString() || "",
        propertyType: property.property_type || "",
        bedrooms: property.bedrooms?.toString() || "",
        bathrooms: property.bathrooms?.toString() || "",
        area: property.area_sqft?.toString() || "",
        description: property.description || "",
        contactName: property.contact_name || "",
        contactPhone: property.contact_phone || "",
        listingType: property.listing_type || "sale",
        rentType: property.rent_type || "",
      });
      setExistingImages(property.images || []);
    }
  }, [property]);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImages((prev) => [...prev, ...Array.from(files)]);
      e.target.value = "";
    }
  };

  useEffect(() => {
    console.log("Form Data:", formData);
  }, [formData]);
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    async function fetchListingTypes() {
      const { data, error } = await supabase.from("listing_types").select("*");
      if (error) {
        console.error("Error fetching listing types:", error);
      } else {
        console.log("Fetched Listing Types:", data);
        setOptions(data || []);
      }
    }
    fetchListingTypes();
  }, []);

  useEffect(() => {
    async function fetchRentTypes() {
      const { data, error } = await supabase.from("rent_types").select("*");
      if (!error) {
        console.log("Fetched Rent Types:", data); // <-- debug output
        setRentTypeOptions(data || []);
      } else {
        console.error("Error fetching Rent Types:", error);
      }
    }
    fetchRentTypes();
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      try {
        // Fetch Residential Categories
        const { data: resData, error: resError } = await supabase
          .from("residential_categories")
          .select("name")
          .order("id", { ascending: true });

        if (resError) throw resError;
        setResidentialCategories(resData?.map((item) => item.name) || []);

        // Fetch Commercial Categories
        const { data: comData, error: comError } = await supabase
          .from("commercial_categories")
          .select("name")
          .order("id", { ascending: true });

        if (comError) throw comError;
        setCommercialCategories(comData?.map((item) => item.name) || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    }

    fetchCategories();
  }, []);

  const getCategoryOptions = () => {
    const listingTypeValue = formData.listingType?.toLowerCase();
    const rentTypeValue = formData.rentType?.toLowerCase();

   
    if (listingTypeValue === "for rent") {
      if (rentTypeValue === "residential") return residentialCategories;
      if (rentTypeValue === "commercial") return commercialCategories;
      return []; 
    }

    // For Buy or Sale, show all categories by default
    if (listingTypeValue === "for buy") {
      if (rentTypeValue === "residential") return residentialCategories;
      if (rentTypeValue === "commercial") return commercialCategories;
      return []; 
    }
    if (listingTypeValue === "for sale") {
      if (rentTypeValue === "residential") return residentialCategories;
      if (rentTypeValue === "commercial") return commercialCategories;
      return [];
    }

    return [];
  };

  useEffect(() => {
    async function fetchPropertyTypes() {
      const { data, error } = await supabase.from("property_types").select("*");
      if (!error) setPropertyTypeOptions(data || []);
    }
    fetchPropertyTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // --- Validation block ---
    if (!formData.rentType) {
      toast.error("⚠️ Please select a Property Type");
      setIsSubmitting(false);
      return;
    }

    if (!formData.title.trim()) {
      toast.error("⚠️ Please enter a Property Title");
      setIsSubmitting(false);
      return;
    }

    if (!formData.location.trim()) {
      toast.error("⚠️ Please enter Location");
      setIsSubmitting(false);
      return;
    }

    if (!formData.price.trim()) {
      toast.error("⚠️ Please enter Price");
      setIsSubmitting(false);
      return;
    }

    if (!formData.contactName.trim()) {
      toast.error("⚠️ Please enter Contact Name");
      setIsSubmitting(false);
      return;
    }

    if (!formData.contactPhone.trim()) {
      toast.error("⚠️ Please enter Contact Phone");
      setIsSubmitting(false);
      return;
    }

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        alert("⚠️ You must be logged in to add/update a property.");
        return;
      }

      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;

      console.log("USER ID:", userId);

      if (!userId) {
        alert("Please log in.");
        return;
      }

      const { data: userProfile, error: profileError } = await supabase
        .from("users")
        .select("company_id")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError || !userProfile) {
        console.error("User profile not found", profileError);
        alert("❌ User profile not found. Please contact support.");
        return;
      }

      const companyId = userProfile.company_id;

      // Combine existing and new uploaded images
      const allImages = [...existingImages];

      for (const file of images) {
        const filePath = `${user.id}/${Date.now()}_${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("propertie_images")
          .upload(filePath, file);

        if (uploadError) {
          alert("❌ Failed to upload image: " + uploadError.message);
          return;
        }

        const { data: publicData } = supabase.storage
          .from("propertie_images")
          .getPublicUrl(filePath);

        allImages.push(publicData.publicUrl);
      }

      if (property) {
        // Update existing property
        const { error } = await supabase
          .from("properties")
          .update({
            listing_type: formData.listingType,
            title: formData.title,
            property_type: propertyCategory,
            location: formData.location,
            price: parseFloat(formData.price),
            area_sqft: parseFloat(formData.area),
            bedrooms: parseInt(formData.bedrooms),
            bathrooms: parseInt(formData.bathrooms),
            description: formData.description,
            contact_name: formData.contactName,
            contact_phone: formData.contactPhone,
            rent_type: formData.rentType,
            images: allImages,
            updated_at: new Date().toISOString(),
          })
          .eq("id", property.id);

        if (error) {
          alert("❌ Failed to update property: " + error.message);
        } else {
          alert("✅ Property updated successfully!");
          onSubmit(formData);
        }
      } else {
        // Insert new property
        const { error } = await supabase
          .from("properties")
          .insert([
            {
              user_id: user.id,
              company_id: companyId,
              listing_type: formData.listingType,
              title: formData.title,
              location: formData.location,
              price: parseFloat(formData.price),
              area_sqft: parseFloat(formData.area),
              bedrooms: parseInt(formData.bedrooms),
              bathrooms: parseInt(formData.bathrooms),
              description: formData.description,
              contact_name: formData.contactName,
              contact_phone: formData.contactPhone,
              rent_type: formData.rentType,
              images: allImages,
              property_type: propertyCategory,
              created_at: new Date().toISOString(),
            },
          ])
          .select();

        if (error) {
          alert("❌ Failed to add property: " + error.message);
        } else {
          await supabase.from("activity_feed").insert([
            {
              user_id: user.id,
              company_id: companyId,
              action_type: "property",
              title: `Property Updated`,
              description: `Updated property: ${formData.title} (${formData.location})`,
              related_id: null,
              created_at: new Date().toISOString(),
            },
          ]);

          alert("✅ Property added successfully!");
          onSubmit(formData);
          setFormData({
            title: "",
            location: "",
            price: "",
            propertyType: "",
            bedrooms: "",
            bathrooms: "",
            area: "",
            description: "",
            contactName: "",
            contactPhone: "",
            listingType: "sale",
            rentType: "",
          });
          setExistingImages([]);
          setImages([]);
        }
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {property ? "Update Property" : "Add New Property"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="listingType">Listing Type *</Label>
            <Select
              value={formData.listingType}
              onValueChange={(value) => updateField("listingType", value)}
            >
              <SelectTrigger id="listingType">
                <SelectValue placeholder="Select listing type" />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                 <SelectItem key={option.id} value={option.name.toLowerCase()}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.listingType && (
            <div className="space-y-2 mt-2">
              <Label htmlFor="rentType">Property Type *</Label>
              <Select
                value={formData.rentType}
                onValueChange={(value) => updateField("rentType", value)} // <-- this saves to formData.rentType
              >
                <SelectTrigger id="rentType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {rentTypeOptions.map((option) => (
                    <SelectItem
                      key={option.id}
                      value={option.name.toLowerCase()}
                    >
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Property Category - show only if Property Type / Rent Type is selected */}
          {formData.rentType && (
            <div className="space-y-2 mt-2">
              <Label htmlFor="propertyCategory">Property Category *</Label>
              <Select
                value={propertyCategory}
                onValueChange={(value) => setPropertyCategory(value)}
              >
                <SelectTrigger id="propertyCategory">
                  <SelectValue placeholder="Select property category" />
                </SelectTrigger>
                <SelectContent>
                  {getCategoryOptions().map((cat, idx) => (
                    <SelectItem key={idx} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Property Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="e.g., Modern Luxury Villa"
              required
            />
          </div>

          {/* Location & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => updateField("location", e.target.value)}
                placeholder="City, State"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => updateField("price", e.target.value)}
                placeholder="$500,000"
                required
              />
            </div>
          </div>


          {/* Bedrooms & Bathrooms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input
                id="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={(e) => updateField("bedrooms", e.target.value)}
                placeholder="3"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input
                id="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={(e) => updateField("bathrooms", e.target.value)}
                placeholder="2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="area">Area (sqft)</Label>
              <Input
                id="area"
                type="number"
                value={formData.area}
                onChange={(e) => updateField("area", e.target.value)}
                placeholder="1200"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={4}
              placeholder="Enter property details..."
            />
          </div>

          {/* Images */}
          <div className="space-y-2">
            <Label>Property Images</Label>
            <div
              className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer"
              onClick={handleUploadClick}
            >
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Click to upload images
              </p>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handleFiles}
            />

            <div className="flex flex-wrap gap-2 mt-2">
              {/* Existing Images */}
              {existingImages.map((url, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={url}
                    alt={`existing-${idx}`}
                    className="h-24 w-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    onClick={() => {
                      setExistingImages((prev) =>
                        prev.filter((_, i) => i !== idx)
                      );
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}

              {/* Newly Selected Images */}
              {images.map((file, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="h-24 w-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    onClick={() => {
                      setImages((prev) => prev.filter((_, i) => i !== idx));
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t pt-4 mt-4">
            <h3 className="font-semibold mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Name *</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => updateField("contactName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone *</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => updateField("contactPhone", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-4">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
              >
                Cancel
              </Button>
            )}
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : property
                ? "Update Property"
                : "Add Property"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
