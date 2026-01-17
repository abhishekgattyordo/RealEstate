// // import { useState } from "react";
// // import { Card, CardContent } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// // import { Button } from "@/components/ui/button";
// // import { MapPin, Phone, Eye, Edit, Trash2, Pencil } from "lucide-react";
// // import Properties from "@/pages/Properties";

// // interface PropertyCardProps {
// //   id: string;
// //   images?: string[];
// //   title: string;
// //   location: string;
// //   price: string;
// //   type: "Buy" | "Sell";
// //   bedrooms?: number;
// //   bathrooms?: number;
// //   area?: string;
// //   onView: (id: string) => void;
// //   onContact: (id: string) => void;
// //   onEdit?: (id: string) => void;
// //   onDelete?: (id: string) => void;
// // }

// // export default function PropertyCard({
// //   id,
// //   images = [],
// //   title,
// //   location,
// //   price,
// //   type,
// //   bedrooms,
// //   bathrooms,
// //   area,
// //   onView,
// //   onContact,
// //   onEdit,
// //   onDelete,
// // }: PropertyCardProps) {
// //   const [currentIndex, setCurrentIndex] = useState(0);

// //   return (
// //     <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 rounded-lg">
// //       {/* Image Carousel */}
// //       <div className="relative w-full h-64 bg-gray-100 rounded-t-lg overflow-hidden">
// //         {images.length > 0 ? (
// //           <img
// //             src={images[currentIndex]}
// //             alt={`${title} ${currentIndex + 1}`}
// //             className="object-cover w-full h-full transition-transform duration-300"
// //           />
// //         ) : (
// //           <div className="flex items-center justify-center h-full w-full text-muted-foreground">
// //             No Image
// //           </div>
// //         )}

// //         {/* Carousel Navigation */}
// //         {images.length > 1 && (
// //           <>
// //             <button
// //               onClick={() =>
// //                 setCurrentIndex(
// //                   (currentIndex - 1 + images.length) % images.length
// //                 )
// //               }
// //               className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
// //             >
// //               ◀
// //             </button>
// //             <button
// //               onClick={() =>
// //                 setCurrentIndex((currentIndex + 1) % images.length)
// //               }
// //               className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
// //             >
// //               ▶
// //             </button>
// //           </>
// //         )}

// //         {/* Thumbnail Indicators */}
// //         {images.length > 1 && (
// //           <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
// //             {images.map((_, idx) => (
// //               <span
// //                 key={idx}
// //                 className={`h-2 w-2 rounded-full transition-all ${
// //                   idx === currentIndex ? "bg-white" : "bg-white/50"
// //                 }`}
// //               />
// //             ))}
// //           </div>
// //         )}

// //         {/* Badge */}
// //         <Badge
// //           className="absolute top-3 right-3 px-3 py-1 rounded-lg font-medium shadow-md"
// //           variant={type === "Buy" ? "default" : "destructive"}
// //         >
// //           {type}
// //         </Badge>
// //       </div>

// //       {/* Content */}
// //       <CardContent className="p-4 space-y-2">
// //         <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
// //         <div className="flex items-center gap-1 text-sm text-muted-foreground">
// //           <MapPin className="h-4 w-4" />
// //           <span className="line-clamp-1">{location}</span>
// //         </div>

// //         <div className="text-xl font-bold text-primary">{price}</div>

// //         {(bedrooms || bathrooms || area) && (
// //           <div className="flex gap-3 text-xs text-muted-foreground mt-1">
// //             {bedrooms && <span>{bedrooms} beds</span>}
// //             {bathrooms && <span>{bathrooms} baths</span>}
// //             {area && <span>{area}</span>}
// //           </div>
// //         )}

// //         {/* View & Contact Buttons */}
// //         <div className="flex gap-2 pt-3 items-center justify-between">
// //           {/* View & Contact Buttons */}
// //           <div className="flex gap-2 flex-1">
// //             <Button
// //               size="sm"
// //               variant="outline"
// //               className="flex-1"
// //               onClick={() => onView(id)}
// //             >
// //               <Eye className="h-4 w-4 mr-1" />
// //               View
// //             </Button>
// //             <Button size="sm" className="flex-1" onClick={() => onContact(id)}>
// //               <Phone className="h-4 w-4 mr-1" />
// //               Contact
// //             </Button>
// //           </div>

// //           {/* Icons inline with buttons */}
// //           {/* <div className="flex gap-2 pl-2">

// //             <div className="flex gap-2 pt-2">
// //                <Button
// //                 size="icon"
// //                 variant="ghost"
// //                 onClick={() => onEdit?.(id)}
// //                 data-testid={`button-edit-${id}`}
// //               >
// //                 <Pencil className="h-4 w-4" />
// //               </Button>
// //                   <Button
// //                 size="icon"
// //                 variant="ghost"
// //                 onClick={() => onDelete?.(id)} // ✅ calls parent handler
// //               >
// //                 <Trash2 className="h-4 w-4" />
// //               </Button>
// //             </div>
// //           </div> */}
// //         </div>

// //         {(onEdit || onDelete) && (
// //           <div className="flex justify-end gap-3 pt-3 border-t mt-2">
// //             {onEdit && (
// //               <button
// //                 onClick={() => onEdit(id)}
// //                 className="text-blue-500 hover:text-blue-700 transition"
// //                 title="Edit"
// //               >
// //                 <Edit className="h-5 w-5" />
// //               </button>
// //             )}
// //             {onDelete && (
// //               <button
// //                 onClick={() => onDelete(id)}
// //                 className="text-red-500 hover:text-red-700 transition"
// //                 title="Delete"
// //               >
// //                 <Trash2 className="h-5 w-5" />
// //               </button>
// //             )}
// //           </div>
// //         )}
// //       </CardContent>
// //     </Card>
// //   );
// // }


// import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { MapPin, Phone, Eye, Edit, Trash2, Pencil } from "lucide-react";
// import Properties from "@/pages/Properties";
// import { supabase } from "@/supabaseClient";
// import { useEffect } from "react";

// interface PropertyCardProps {
//   id: string;
//   images?: string[];
//   user_id?: string | null;
//   title: string;
//   location: string;
//   price: string;
//   type: "Buy" | "Sale" | "Rent";
//   bedrooms?: number;
//   bathrooms?: number;
//   area?: string;
//   mobile_number: string;
//   property_type?: string;
//   rent_type?: string;
//   contact_name?: string; // ✅ Add this
//   contact_phone?: string;
//   property_categories?: string;
//   description?: string;
//   onView: (id: string) => void;
//   onContact: (id: string) => void;
//   onEdit?: (id: string) => void;
//   onDelete?: (id: string) => void;
// }

// export default function PropertyCard({
//   id,
//   user_id,
//   images = [],
//   title,
//   location,
//   price,
//   type,
//   bedrooms,
//   bathrooms,
//   description,
//   property_type,
//   mobile_number,
//   contact_name,
//   rent_type,
//   property_categories,
//   contact_phone,
//   area,
//   onView,
//   onContact,
//   onEdit,
//   onDelete,
// }: PropertyCardProps) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);

//   console.log("PropertyCard prop user_id:", user_id);
//   console.log("PropertyCard Received Number:", mobile_number);
//   console.log("Badge Type Value:", type);

//   useEffect(() => {
//     const loadUser = async () => {
//       const { data } = await supabase.auth.getUser();
//       setLoggedInUserId(data?.user?.id ?? null);
//     };
//     loadUser();
//   }, []);

//   return (
//     <Card className="hover:shadow-lg transition-shadow duration-300 rounded-lg relative">
//       {/* Image Carousel */}
//       <div className="relative w-full h-64 bg-gray-100 rounded-t-lg">
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
//           className="absolute top-1 right-1 px-2 py-0.5 text-xs rounded-md font-semibold shadow-md ml-3"
//           style={{
//             backgroundColor:
//               type === "Buy" ? "blue" : type === "Sale" ? "red" : "gray",
//             color: "white",
//           }}
//         >
//           {type}
//         </Badge>
//       </div>

//       {/* Content */}
//       <CardContent className="p-4 mt-3 space-y-2">
//         <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
//         <div className="flex items-center gap-1 text-sm text-muted-foreground">
//           <MapPin className="h-4 w-4" />
//           <span className="line-clamp-1">{location}</span>
//         </div>

//         <div className="text-xl font-bold text-primary">{price}</div>

//         {(rent_type || property_type) && (
//           <div className="text-sm font-medium text-muted-foreground mt-1">
//             {rent_type && <span>Type: {rent_type}</span>}
//             {rent_type && property_type && (
//               <span className="mx-2">|</span>
//             )}
//             {property_type && (
//               <span>Category: {property_type}</span>
//             )}
//           </div>
//         )}

//         {description && (
//           <p className="text-sm text-muted-foreground line-clamp-3 mt-1">
//             {description}
//           </p>
//         )}

//         {(bedrooms || bathrooms || area) && (
//           <div className="flex gap-3 text-xs text-muted-foreground mt-1">
//             {bedrooms && <span>{bedrooms} beds</span>}
//             {bathrooms && <span>{bathrooms} baths</span>}
//             {area && <span>{area} sqft</span>}
//           </div>
//         )}

//         {/* Contact Info */}
//         {(contact_name || contact_phone) && (
//           <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
//             <Phone className="h-4 w-4" />
//             {contact_name && <span>{contact_name}</span>}
//             {contact_name && contact_phone && <span>|</span>}{" "}
//             {/* optional separator */}
//             {contact_phone && <span>{contact_phone}</span>}
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
//           </div>
//         </div>

//         {/* Icons inline with buttons */}
//         {/* <div className="flex gap-2 pl-2">
           
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

//         {loggedInUserId && loggedInUserId === user_id && (
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
import { 
  MapPin, 
  Phone, 
  Eye, 
  Edit, 
  Trash2, 
  Bed, 
  Bath, 
  Square, 
  Heart, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  DollarSign,
  Home,
  User,
  MessageCircle
} from "lucide-react";
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
  contact_name?: string;
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
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      setLoggedInUserId(data?.user?.id ?? null);
    };
    loadUser();
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Buy": return "bg-gradient-to-r from-blue-600 to-blue-800";
      case "Sale": return "bg-gradient-to-r from-red-500 to-red-700";
      case "Rent": return "bg-gradient-to-r from-emerald-500 to-emerald-700";
      default: return "bg-gradient-to-r from-gray-600 to-gray-800";
    }
  };

  const formatPrice = (price: string) => {
    if (!price) return "Price on request";
    const numPrice = parseInt(price.replace(/[^0-9]/g, ''));
    if (isNaN(numPrice)) return price;
    return `₹${numPrice.toLocaleString()}`;
  };

  return (
    <Card
  className="group hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden border border-gray-200 hover:border-blue-300 bg-white h-full flex flex-col cursor-pointer"
  onClick={() => onView(id)}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>

      {/* Image Carousel - Reduced Height */}
      <div className="relative w-full h-52 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {images.length > 0 ? (
          <>
            <img
              src={images[currentIndex]}
              alt={`${title} ${currentIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-full text-gray-400">
            <Home className="h-10 w-10 mb-2 opacity-30" />
            <span className="text-xs font-medium">No Image</span>
          </div>
        )}

        {/* Carousel Navigation - Only show on hover */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((currentIndex - 1 + images.length) % images.length);
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-1.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-110 opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex((currentIndex + 1) % images.length);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-1.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-110 opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Top Badges - Compact */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <Badge className={`${getTypeColor(type)} text-white px-2 py-1 text-xs font-semibold shadow-md`}>
            {type}
          </Badge>
          
          
        </div>

        {/* Image Counter - Minimal */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <div className="flex gap-1">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 w-1 rounded-full transition-all duration-200 ${
                    idx === currentIndex 
                      ? 'bg-white w-4' 
                      : 'bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content - Compact */}
      <CardContent className="p-4 flex-1 flex flex-col">
        {/* Property Title & Location */}
        <div className="mb-2">
          <h3 className="text-base font-semibold text-gray-900 line-clamp-1 mb-1">
            {title}
          </h3>
          <div className="flex items-center gap-1 text-gray-600">
            <MapPin className="h-3 w-3 flex-shrink-0" />
            <span className="text-xs line-clamp-1">{location}</span>
          </div>
        </div>

        {/* Price - Compact */}
        <div className="flex items-center gap-1 mb-2">
          <DollarSign className="h-4 w-4 text-emerald-600 flex-shrink-0" />
          <span className="text-lg font-bold text-gray-900">{formatPrice(price)}</span>
          {rent_type && (
            <span className="text-xs text-gray-500 ml-1">/{rent_type}</span>
          )}
        </div>

        {/* Property Type & Category - Compact */}
        {(property_type || property_categories) && (
          <div className="flex flex-wrap gap-1 mb-3">
            {property_type && (
              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200 px-1.5 py-0.5">
                {property_type}
              </Badge>
            )}
            {property_categories && (
              <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200 px-1.5 py-0.5">
                {property_categories}
              </Badge>
            )}
          </div>
        )}

        {/* Quick Stats - Compact with Labels */}
        {(bedrooms || bathrooms || area) && (
          <div className="flex justify-between py-2 border-y border-gray-100 mb-2">
            {bedrooms !== undefined && (
              <div className="text-center flex-1">
                <Bed className="h-3.5 w-3.5 text-blue-600 mx-auto mb-0.5" />
                <span className="text-xs font-medium text-gray-900 block">{bedrooms}</span>
                <span className="text-[10px] text-gray-500">bed</span>
              </div>
            )}
            {bathrooms !== undefined && (
              <div className="text-center flex-1 border-x border-gray-100">
                <Bath className="h-3.5 w-3.5 text-blue-600 mx-auto mb-0.5" />
                <span className="text-xs font-medium text-gray-900 block">{bathrooms}</span>
                <span className="text-[10px] text-gray-500">bath</span>
              </div>
            )}
            {area && (
              <div className="text-center flex-1">
                <Square className="h-3.5 w-3.5 text-blue-600 mx-auto mb-0.5" />
                <span className="text-xs font-medium text-gray-900 block">{area}</span>
                <span className="text-[10px] text-gray-500">sqft</span>
              </div>
            )}
          </div>
        )}

        {/* Description - Reduced space */}
        {description && (
          <p className="text-xs text-gray-600 line-clamp-2 mb-2 flex-1">
            {description}
          </p>
        )}

        {/* Contact Info - Compact */}
        {(contact_name || contact_phone) && (
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md mb-3">
            <div className="h-7 w-7 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-3.5 w-3.5 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              {contact_name && (
                <p className="text-xs font-medium text-gray-900 truncate">{contact_name}</p>
              )}
              {contact_phone && (
                <div className="flex items-center gap-1 text-gray-600">
                  <Phone className="h-2.5 w-2.5 flex-shrink-0" />
                  <span className="text-xs truncate">{contact_phone}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons - Compact */}
        <div className="flex gap-2 mt-auto">
          <Button
            onClick={() => onView(id)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm h-8 shadow-sm hover:shadow transition-all duration-200"
          >
            <Eye className="h-3.5 w-3.5 mr-1.5" />
            View
          </Button>
          
       
        </div>

        {/* Owner Actions - Compact */}
        {loggedInUserId && loggedInUserId === user_id && (
          <div className="flex justify-end gap-1 pt-2 mt-2 border-t border-gray-100">
            {onEdit && (
              <Button
                onClick={() => onEdit(id)}
                variant="ghost"
                size="sm"
                className="h-7 text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs"
              >
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                onClick={() => onDelete(id)}
                variant="ghost"
                size="sm"
                className="h-7 text-red-600 hover:text-red-700 hover:bg-red-50 text-xs"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Delete
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}