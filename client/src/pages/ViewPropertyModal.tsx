import { useParams } from "wouter";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

export default function ViewPropertyPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();
      if (error) console.error(error);
      else {
        setProperty(data);
        setMainImage(data.images?.[0] || null);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property)
    return (
      <p className="text-center mt-20 text-gray-500">Loading property...</p>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Main Image + Thumbnails */}
        <div className="space-y-4">
          {mainImage ? (
            <img
              src={mainImage}
              alt={property.title}
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
          ) : (
            <div className="bg-gray-200 w-full h-96 flex items-center justify-center rounded-lg">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}

          {property.images && property.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto mt-2">
              {property.images.map((img: string, idx: number) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                    mainImage === img ? "border-blue-600" : "border-transparent"
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right: Property Details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{property.title}</h1>
          <p className="text-gray-500">{property.location}</p>
          <p className="text-2xl font-semibold text-blue-600">
            ₹ {property.price?.toLocaleString()}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="grid grid-cols-2 gap-4 mt-4">
              {/* Rent Type */}
              {property.rent_type && (
                <div className="space-y-1">
                  <p className="text-gray-800 font-semibold">Type :</p>
                  <p className="text-gray-800">{property.rent_type}</p>
                </div>
              )}

              {/* Property Type */}
              {property.property_type && (
                <div className="space-y-1">
                  <p className="text-gray-600 font-semibold">Property Type :</p>
                  <p className="text-gray-800">{property.property_type}</p>
                </div>
              )}
            </div>
          </div>
 <div className="grid grid-cols-4  mt-4">
     <div className="space-y-1">
            <p className="text-gray-600 font-semibold">Bedrooms :</p>
            <p className="text-gray-800">{property.bedrooms}</p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-600 font-semibold">Bathrooms :</p>
            <p className="text-gray-800">{property.bathrooms}</p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-600 font-semibold">Area :</p>
            <p className="text-gray-800">
              {property.area_sqft ? `${property.area_sqft} sqft` : "-"}
            </p>
          </div>
 </div>

  <div className="grid grid-cols-4  mt-4">

    {property.contact_name && (
    <div className="space-y-1">
      <p className="text-gray-800 font-semibold">Contact Name</p>
      <p className="text-gray-700">{property.contact_name}</p>
    </div>
  )}

  {/* Contact Phone */}
  {property.contact_phone && (
    <div className="space-y-1">
      <p className="text-gray-800 font-semibold">Phone</p>
      <p className="text-gray-700">{property.contact_phone}</p>
    </div>
  )}
  </div>
       

          {property.description && (
            <div className="mt-4">
              <h2 className="text-gray-600 font-semibold">Description</h2>
              <p className="text-gray-700">{property.description}</p>
            </div>
          )}

          <button
            onClick={() => window.history.back()}
            className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
