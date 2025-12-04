// import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { MapPin, Phone, Eye, Edit, Trash2, Pencil } from "lucide-react";
// import Properties from "@/pages/Properties";

// interface PropertyCardProps {
//   id: string;
//   images?: string[];
//   title: string;
//   location: string;
//   price: string;
//   type: "Buy" | "Sell";
//   bedrooms?: number;
//   bathrooms?: number;
//   area?: string;
//   onView: (id: string) => void;
//   onContact: (id: string) => void;
//   onEdit?: (id: string) => void;
//   onDelete?: (id: string) => void;
// }

// export default function PropertyCard({
//   id,
//   images = [],
//   title,
//   location,
//   price,
//   type,
//   bedrooms,
//   bathrooms,
//   area,
//   onView,
//   onContact,
//   onEdit,
//   onDelete,
// }: PropertyCardProps) {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   return (
//     <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 rounded-lg">
//       {/* Image Carousel */}
//       <div className="relative w-full h-64 bg-gray-100 rounded-t-lg overflow-hidden">
//         {images.length > 0 ? (
//           <img
//             src={images[currentIndex]}
//             alt={`${title} ${currentIndex + 1}`}
//             className="object-cover w-full h-full transition-transform duration-300"
//           />
//         ) : (
//           <div className="flex items-center justify-center h-full w-full text-muted-foreground">
//             No Image
//           </div>
//         )}

//         {/* Carousel Navigation */}
//         {images.length > 1 && (
//           <>
//             <button
//               onClick={() =>
//                 setCurrentIndex(
//                   (currentIndex - 1 + images.length) % images.length
//                 )
//               }
//               className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
//             >
//               ◀
//             </button>
//             <button
//               onClick={() =>
//                 setCurrentIndex((currentIndex + 1) % images.length)
//               }
//               className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
//             >
//               ▶
//             </button>
//           </>
//         )}

//         {/* Thumbnail Indicators */}
//         {images.length > 1 && (
//           <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
//             {images.map((_, idx) => (
//               <span
//                 key={idx}
//                 className={`h-2 w-2 rounded-full transition-all ${
//                   idx === currentIndex ? "bg-white" : "bg-white/50"
//                 }`}
//               />
//             ))}
//           </div>
//         )}

//         {/* Badge */}
//         <Badge
//           className="absolute top-3 right-3 px-3 py-1 rounded-lg font-medium shadow-md"
//           variant={type === "Buy" ? "default" : "destructive"}
//         >
//           {type}
//         </Badge>
//       </div>

//       {/* Content */}
//       <CardContent className="p-4 space-y-2">
//         <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
//         <div className="flex items-center gap-1 text-sm text-muted-foreground">
//           <MapPin className="h-4 w-4" />
//           <span className="line-clamp-1">{location}</span>
//         </div>

//         <div className="text-xl font-bold text-primary">{price}</div>

//         {(bedrooms || bathrooms || area) && (
//           <div className="flex gap-3 text-xs text-muted-foreground mt-1">
//             {bedrooms && <span>{bedrooms} beds</span>}
//             {bathrooms && <span>{bathrooms} baths</span>}
//             {area && <span>{area}</span>}
//           </div>
//         )}

//         {/* View & Contact Buttons */}
//         <div className="flex gap-2 pt-3 items-center justify-between">
//           {/* View & Contact Buttons */}
//           <div className="flex gap-2 flex-1">
//             <Button
//               size="sm"
//               variant="outline"
//               className="flex-1"
//               onClick={() => onView(id)}
//             >
//               <Eye className="h-4 w-4 mr-1" />
//               View
//             </Button>
//             <Button size="sm" className="flex-1" onClick={() => onContact(id)}>
//               <Phone className="h-4 w-4 mr-1" />
//               Contact
//             </Button>
//           </div>

//           {/* Icons inline with buttons */}
//           {/* <div className="flex gap-2 pl-2">

//             <div className="flex gap-2 pt-2">
//                <Button
//                 size="icon"
//                 variant="ghost"
//                 onClick={() => onEdit?.(id)}
//                 data-testid={`button-edit-${id}`}
//               >
//                 <Pencil className="h-4 w-4" />
//               </Button>
//                   <Button
//                 size="icon"
//                 variant="ghost"
//                 onClick={() => onDelete?.(id)} // ✅ calls parent handler
//               >
//                 <Trash2 className="h-4 w-4" />
//               </Button>
//             </div>
//           </div> */}
//         </div>

//         {(onEdit || onDelete) && (
//           <div className="flex justify-end gap-3 pt-3 border-t mt-2">
//             {onEdit && (
//               <button
//                 onClick={() => onEdit(id)}
//                 className="text-blue-500 hover:text-blue-700 transition"
//                 title="Edit"
//               >
//                 <Edit className="h-5 w-5" />
//               </button>
//             )}
//             {onDelete && (
//               <button
//                 onClick={() => onDelete(id)}
//                 className="text-red-500 hover:text-red-700 transition"
//                 title="Delete"
//               >
//                 <Trash2 className="h-5 w-5" />
//               </button>
//             )}
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }


import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Eye, Edit, Trash2, Pencil } from "lucide-react";
import Properties from "@/pages/Properties";
import { supabase } from "@/supabaseClient";
import { useEffect } from "react";

interface PropertyCardProps {
  id: string;
  images?: string[];
  user_id?: string | null;
  title: string;
  location: string;
  price: string;
  type: "Buy" | "Sale" | "Rent";
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  mobile_number: string;
  property_type?: string;
  rent_type?: string;
  contact_name?: string; // ✅ Add this
  contact_phone?: string;
  property_categories?: string;
  description?: string;
  onView: (id: string) => void;
  onContact: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function PropertyCard({
  id,
  user_id,
  images = [],
  title,
  location,
  price,
  type,
  bedrooms,
  bathrooms,
  description,
  property_type,
  mobile_number,
  contact_name,
  rent_type,
  property_categories,
  contact_phone,
  area,
  onView,
  onContact,
  onEdit,
  onDelete,
}: PropertyCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);

  console.log("PropertyCard prop user_id:", user_id);
  console.log("PropertyCard Received Number:", mobile_number);
  console.log("Badge Type Value:", type);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      setLoggedInUserId(data?.user?.id ?? null);
    };
    loadUser();
  }, []);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 rounded-lg relative">
      {/* Image Carousel */}
      <div className="relative w-full h-64 bg-gray-100 rounded-t-lg">
        {images.length > 0 ? (
          <img
            src={images[currentIndex]}
            alt={`${title} ${currentIndex + 1}`}
            className="object-cover w-full h-full transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full text-muted-foreground">
            No Image
          </div>
        )}

        {/* Carousel Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrentIndex(
                  (currentIndex - 1 + images.length) % images.length
                )
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
            >
              ◀
            </button>
            <button
              onClick={() =>
                setCurrentIndex((currentIndex + 1) % images.length)
              }
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
            >
              ▶
            </button>
          </>
        )}

        {/* Thumbnail Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`h-2 w-2 rounded-full transition-all ${
                  idx === currentIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        {/* Badge */}
        <Badge
          className="absolute top-1 right-1 px-2 py-0.5 text-xs rounded-md font-semibold shadow-md ml-3"
          style={{
            backgroundColor:
              type === "Buy" ? "blue" : type === "Sale" ? "red" : "gray",
            color: "white",
          }}
        >
          {type}
        </Badge>
      </div>

      {/* Content */}
      <CardContent className="p-4 mt-3 space-y-2">
        <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="line-clamp-1">{location}</span>
        </div>

        <div className="text-xl font-bold text-primary">{price}</div>

        {(rent_type || property_type) && (
          <div className="text-sm font-medium text-muted-foreground mt-1">
            {rent_type && <span>Type: {rent_type}</span>}
            {rent_type && property_type && (
              <span className="mx-2">|</span>
            )}
            {property_type && (
              <span>Category: {property_type}</span>
            )}
          </div>
        )}

        {description && (
          <p className="text-sm text-muted-foreground line-clamp-3 mt-1">
            {description}
          </p>
        )}

        {(bedrooms || bathrooms || area) && (
          <div className="flex gap-3 text-xs text-muted-foreground mt-1">
            {bedrooms && <span>{bedrooms} beds</span>}
            {bathrooms && <span>{bathrooms} baths</span>}
            {area && <span>{area} sqft</span>}
          </div>
        )}

        {/* Contact Info */}
        {(contact_name || contact_phone) && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
            <Phone className="h-4 w-4" />
            {contact_name && <span>{contact_name}</span>}
            {contact_name && contact_phone && <span>|</span>}{" "}
            {/* optional separator */}
            {contact_phone && <span>{contact_phone}</span>}
          </div>
        )}

        {/* View & Contact Buttons */}
        <div className="flex gap-2 pt-3 items-center justify-between">
          {/* View & Contact Buttons */}
          <div className="flex gap-2 flex-1">
            <Button
              size="sm"
              variant="outline"
              className="flex-1"
              onClick={() => onView(id)}
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
          </div>
        </div>

        {/* Icons inline with buttons */}
        {/* <div className="flex gap-2 pl-2">
           
            <div className="flex gap-2 pt-2">
               <Button
                size="icon"
                variant="ghost"
                onClick={() => onEdit?.(id)}
                data-testid={`button-edit-${id}`}
              >
                <Pencil className="h-4 w-4" />
              </Button>
                  <Button
                size="icon"
                variant="ghost"
                onClick={() => onDelete?.(id)} // ✅ calls parent handler
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div> */}

        {loggedInUserId && loggedInUserId === user_id && (
          <div className="flex justify-end gap-3 pt-3 border-t mt-2">
            {onEdit && (
              <button
                onClick={() => onEdit(id)}
                className="text-blue-500 hover:text-blue-700 transition"
                title="Edit"
              >
                <Edit className="h-5 w-5" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(id)}
                className="text-red-500 hover:text-red-700 transition"
                title="Delete"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
