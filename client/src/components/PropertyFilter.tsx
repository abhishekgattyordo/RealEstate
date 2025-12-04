// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Card, CardContent } from "@/components/ui/card";
// import { Search, SlidersHorizontal } from "lucide-react";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";

// interface PropertyFilterProps {
//   onFilter: (filters: any) => void;
// }

// export default function PropertyFilter({ onFilter }: PropertyFilterProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [filters, setFilters] = useState({
//     search: "",
//     location: "",
//     minPrice: "",
//     maxPrice: "",
//     propertyType: "",
//     bedrooms: ""
//   });

//   const handleApply = () => {
//     onFilter(filters);
//     setIsOpen(false);
//   };

//   const handleReset = () => {
//     const resetFilters = {
//       search: "",
//       location: "",
//       minPrice: "",
//       maxPrice: "",
//       propertyType: "",
//       bedrooms: ""
//     };
//     setFilters(resetFilters);
//     onFilter(resetFilters);
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex gap-2">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search properties..."
//             value={filters.search}
//             onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//             className="pl-9"
//             data-testid="input-search"
//           />
//         </div>
//         <Collapsible open={isOpen} onOpenChange={setIsOpen}>
//           <CollapsibleTrigger asChild>
//             <Button variant="outline" data-testid="button-toggle-filters">
//               <SlidersHorizontal className="h-4 w-4 mr-2" />
//               Filters
//             </Button>
//           </CollapsibleTrigger>
//           <CollapsibleContent className="absolute right-0 left-0 z-10 mt-2">
//             <Card>
//               <CardContent className="p-4 space-y-4">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="location">Location</Label>
//                     <Input
//                       id="location"
//                       placeholder="City, State"
//                       value={filters.location}
//                       onChange={(e) => setFilters({ ...filters, location: e.target.value })}
//                       data-testid="input-location"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="propertyType">Property Type</Label>
//                     <Select
//                       value={filters.propertyType}
//                       onValueChange={(value) => setFilters({ ...filters, propertyType: value })}
//                     >
//                       <SelectTrigger id="propertyType" data-testid="select-property-type">
//                         <SelectValue placeholder="Select type" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="house">House</SelectItem>
//                         <SelectItem value="apartment">Apartment</SelectItem>
//                         <SelectItem value="villa">Villa</SelectItem>
//                         <SelectItem value="condo">Condo</SelectItem>
//                         <SelectItem value="commercial">Commercial</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="minPrice">Min Price</Label>
//                     <Input
//                       id="minPrice"
//                       type="number"
//                       placeholder="$0"
//                       value={filters.minPrice}
//                       onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
//                       data-testid="input-min-price"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="maxPrice">Max Price</Label>
//                     <Input
//                       id="maxPrice"
//                       type="number"
//                       placeholder="Any"
//                       value={filters.maxPrice}
//                       onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
//                       data-testid="input-max-price"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="bedrooms">Bedrooms</Label>
//                     <Select
//                       value={filters.bedrooms}
//                       onValueChange={(value) => setFilters({ ...filters, bedrooms: value })}
//                     >
//                       <SelectTrigger id="bedrooms" data-testid="select-bedrooms">
//                         <SelectValue placeholder="Any" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="1">1+</SelectItem>
//                         <SelectItem value="2">2+</SelectItem>
//                         <SelectItem value="3">3+</SelectItem>
//                         <SelectItem value="4">4+</SelectItem>
//                         <SelectItem value="5">5+</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>

//                 <div className="flex gap-2 pt-2">
//                   <Button
//                     variant="outline"
//                     onClick={handleReset}
//                     className="flex-1"
//                     data-testid="button-reset"
//                   >
//                     Reset
//                   </Button>
//                   <Button
//                     onClick={handleApply}
//                     className="flex-1"
//                     data-testid="button-apply"
//                   >
//                     Apply Filters
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </CollapsibleContent>
//         </Collapsible>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { supabase } from "../supabaseClient";

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  listing_type: string;
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
   property_categories?: string;
  images: string[];
  description: string;
  property_type?: string;
  created_at: string;
  company_id: string;
  mobile_number?: string;
  user_id?: string | null;
  contact_name?: string;
  rent_type?: string;
  contact_phone?: string; 
}

interface PropertyListProps {
  onFiltered: (data: Property[]) => void; // callback to parent
}

export default function PropertyList({ onFiltered }: PropertyListProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
  });
  const [locations, setLocations] = useState<string[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // ---------- Fetch all properties ----------
  // useEffect(() => {

  //   async function fetchProperties() {
  //     const { data, error } = await supabase
  //       .from("properties")
  //       .select("*")
  //       .order("created_at", { ascending: false });

  //     if (!error && data) {
  //       setProperties(data);
  //       onFiltered(data); // send all properties initially
  //     }
  //   }
  //   fetchProperties();
  // }, []);

  useEffect(() => {
    async function fetchProperties() {
      try {
        // 1️⃣ Get logged-in user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          console.error("User not found", userError);
          return;
        }

        // 2️⃣ Fetch user's company_id from users table
        const { data: userProfile, error: profileError } = await supabase
          .from("users")
          .select("company_id")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError || !userProfile) {
          console.error("User profile or company_id not found", profileError);
          return;
        }

        const companyId = userProfile.company_id;

        if (!companyId) {
          console.error("No company linked to this user");
          return;
        }

        // 3️⃣ Fetch properties for that company_id
        const { data: propertiesData, error: propertiesError } = await supabase
          .from("properties")
          .select("*")
          .eq("company_id", companyId)
          .order("created_at", { ascending: false });

        if (propertiesError) {
          console.error("Error fetching properties:", propertiesError);
          return;
        }

        if (propertiesData) {
          setProperties(propertiesData);
          onFiltered(propertiesData);
        }
      } catch (err) {
        console.error("Unexpected error fetching properties:", err);
      }
    }

    fetchProperties();
  }, []);

  // ---------- Fetch distinct filter options ----------

  useEffect(() => {
    async function fetchDistinct(column: string) {
      try {
        // 1️⃣ Get logged-in user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          console.error("User not found", userError);
          return [];
        }

        // 2️⃣ Get user's company_id
        const { data: userProfile, error: profileError } = await supabase
          .from("users")
          .select("company_id")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError || !userProfile) {
          console.error("Company id not found", profileError);
          return [];
        }

        const companyId = userProfile.company_id;

        // 3️⃣ Fetch distinct values only for this company_id
        const { data, error } = await supabase
          .from("properties")
          .select(column)
          .eq("company_id", companyId)
          .not(column, "is", null);

        if (!error && data) {
          const unique = Array.from(
            new Set(data.map((r: any) => r[column]))
          ).filter(Boolean);
          return unique.sort();
        }
      } catch (e) {
        console.error("Error fetching distinct values:", e);
      }

      return [];
    }

    // Fetch location & property types
    fetchDistinct("location").then(setLocations);
    fetchDistinct("property_type").then(setPropertyTypes);
  }, []);

  // ---------- Apply filters ----------
  const applyFilters = () => {
    let result = [...properties];

    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search)
      );
    }

    if (filters.location) {
      const loc = filters.location.toLowerCase();
      result = result.filter((p) => p.location.toLowerCase().includes(loc));
    }

   if (filters.propertyType) {
  result = result.filter(
    (p) => p.property_type?.toLowerCase() === filters.propertyType.toLowerCase()
  );
}


    if (filters.minPrice) {
      result = result.filter((p) => p.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= Number(filters.maxPrice));
    }

    if (filters.bedrooms) {
      result = result.filter((p) => p.bedrooms >= Number(filters.bedrooms));
    }

    onFiltered(result);
    setIsFilterOpen(false); // send filtered data to parent
  };

  const resetFilters = () => {
    const empty = {
      search: "",
      location: "",
      propertyType: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
    };
    setFilters(empty);
    onFiltered(properties);
  };

  return (
    <div className="space-y-4">
      {/* Search & Filters */}
      <div className="flex gap-2">
        <div className="relative flex-1 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search properties..."
              value={filters.search}
              onChange={(e) => {
                const value = e.target.value;
                const updatedFilters = { ...filters, search: value };
                setFilters(updatedFilters);

                if (!value) {
                  // If input is empty, reset filters automatically
                  onFiltered(properties);
                } else {
                  applyFilters(updatedFilters);
                }
              }}
              className="pl-9"
            />
          </div>

          {Object.values(filters).some((val) => val) && (
            <Button onClick={resetFilters} className="flex-none">
              Remove Filters
            </Button>
          )}
        </div>

        <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="absolute right-0 left-20 z-10 mt-2">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Location */}
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Select
                      value={filters.location}
                      onValueChange={(v) =>
                        setFilters({ ...filters, location: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc) => (
                          <SelectItem key={loc} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Property Type */}
                  <div className="space-y-2">
                    <Label>Property Type</Label>
                    <Select
                      value={filters.propertyType}
                      onValueChange={(v) =>
                        setFilters({ ...filters, propertyType: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyTypes.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Min Price */}
                  <div className="space-y-2">
                    <Label>Min Price</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={filters.minPrice}
                      onChange={(e) =>
                        setFilters({ ...filters, minPrice: e.target.value })
                      }
                    />
                  </div>

                  {/* Max Price */}
                  <div className="space-y-2">
                    <Label>Max Price</Label>
                    <Input
                      type="number"
                      placeholder="Any"
                      value={filters.maxPrice}
                      onChange={(e) =>
                        setFilters({ ...filters, maxPrice: e.target.value })
                      }
                    />
                  </div>

                  {/* Bedrooms */}
                  <div className="space-y-2">
                    <Label>Bedrooms</Label>
                    <Select
                      value={filters.bedrooms}
                      onValueChange={(v) =>
                        setFilters({ ...filters, bedrooms: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        {["1", "2", "3", "4", "5"].map((n) => (
                          <SelectItem key={n} value={n}>
                            {n}+
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={resetFilters}
                    className="flex-1"
                  >
                    Reset
                  </Button>
                  <Button onClick={applyFilters} className="flex-1">
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
