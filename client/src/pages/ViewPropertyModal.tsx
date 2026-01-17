import { useParams, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { 
  Bed, 
  Bath, 
  Square, 
  MapPin, 
  Phone, 
  User, 
  ArrowLeft,
  Calendar,
  Home,
  DollarSign,
  Type,
  Heart,
  Share2,
  Star,
  ChevronRight,
  ExternalLink
} from "lucide-react";

export default function ViewPropertyPage() {
  const { id } = useParams();
  const [location, navigate] = useLocation();
  const [property, setProperty] = useState<any>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProperties, setRelatedProperties] = useState<any[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) {
        console.error(error);
      } else {
        setProperty(data);
        setMainImage(data.images?.[0] || null);
        
        // Fetch related properties
        fetchRelatedProperties(data.property_type, data.location, data.id);
      }
      setLoading(false);
    };

    fetchProperty();
  }, [id]);

  const fetchRelatedProperties = async (propertyType: string, location: string, currentId: string) => {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .or(`property_type.eq.${propertyType},location.ilike.%${location}%`)
      .neq("id", currentId)
      .limit(4);

    if (!error && data) {
      setRelatedProperties(data);
    }
  };

  const shareProperty = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleViewDetails = (propertyId: string) => {
    // Navigate to the correct route: /properties/view/:id
    navigate(`/properties/view/${propertyId}`);
    
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


const handleBackClick = () => {
  if (window.history.length > 1) {
    window.history.back();   // ✅ correct for wouter
  } else {
    navigate('/properties');
  }
};



  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-200 rounded-full mb-4"></div>
          <div className="h-4 bg-blue-200 rounded w-48"></div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏠</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Property Not Found</h2>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist.</p>
          <button
            onClick={handleBackClick}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBackClick}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md border border-gray-200"
          >
            <ArrowLeft size={18} />
            Back to Listings
          </button>
          
         
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Hero Section */}
          <div className="relative">
            {mainImage ? (
              <div className="relative h-[500px]">
                <img
                  src={mainImage}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg max-w-2xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin size={18} />
                          <span>{property.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                        
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[500px] bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center">
                <div className="text-center">
                  <Home size={64} className="text-blue-300 mx-auto mb-4" />
                  <span className="text-gray-400 text-lg">No Image Available</span>
                </div>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {property.images && property.images.length > 1 && (
            <div className="px-6 py-4 bg-gray-50 border-b">
              <p className="text-sm font-medium text-gray-600 mb-3">All Images ({property.images.length})</p>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {property.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setMainImage(img)}
                    className={`flex-shrink-0 relative overflow-hidden rounded-lg transition-all duration-300 transform hover:scale-105 ${
                      mainImage === img 
                        ? 'ring-2 ring-blue-500 ring-offset-2 scale-105' 
                        : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-24 h-24 object-cover"
                    />
                    <div className={`absolute inset-0 ${mainImage === img ? 'bg-blue-500/20' : 'bg-black/10'}`}></div>
                    {mainImage === img && (
                      <div className="absolute top-2 left-2 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Property Details */}
              <div className="lg:col-span-2 space-y-8">
                {/* Price Badge */}
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 rounded-xl">
                  <DollarSign className="text-blue-600" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="text-3xl font-bold text-gray-900">
                      ₹{property.price?.toLocaleString()}
                      {property.rent_type && (
                        <span className="text-lg font-normal text-gray-600"> / {property.rent_type}</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl text-center group hover:bg-blue-50 transition-colors duration-300">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3 group-hover:bg-blue-200 transition-colors">
                      <Bed className="text-blue-600" size={24} />
                    </div>
                    <p className="text-sm text-gray-600">Bedrooms</p>
                    <p className="text-xl font-semibold text-gray-900">{property.bedrooms || "-"}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl text-center group hover:bg-blue-50 transition-colors duration-300">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3 group-hover:bg-blue-200 transition-colors">
                      <Bath className="text-blue-600" size={24} />
                    </div>
                    <p className="text-sm text-gray-600">Bathrooms</p>
                    <p className="text-xl font-semibold text-gray-900">{property.bathrooms || "-"}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl text-center group hover:bg-blue-50 transition-colors duration-300">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3 group-hover:bg-blue-200 transition-colors">
                      <Square className="text-blue-600" size={24} />
                    </div>
                    <p className="text-sm text-gray-600">Area</p>
                    <p className="text-xl font-semibold text-gray-900">
                      {property.area_sqft ? `${property.area_sqft} sqft` : "-"}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl text-center group hover:bg-blue-50 transition-colors duration-300">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3 group-hover:bg-blue-200 transition-colors">
                      <Type className="text-blue-600" size={24} />
                    </div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="text-xl font-semibold text-gray-900">{property.property_type || "-"}</p>
                  </div>
                </div>

                {/* Description */}
                {property.description && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {property.description}
                    </p>
                  </div>
                )}

                {/* Additional Details */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="text-gray-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Available From</p>
                        <p className="font-medium text-gray-900">
                          {property.available_from || "Immediately"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Home className="text-gray-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Furnishing</p>
                        <p className="font-medium text-gray-900">
                          {property.furnishing || "Not Specified"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Contact Card */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-lg border border-blue-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
                  
                  <div className="space-y-6">
                    {/* Contact Person */}
                    {property.contact_name && (
                      <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="text-blue-600" size={24} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Contact Person</p>
                          <p className="font-semibold text-gray-900">{property.contact_name}</p>
                        </div>
                      </div>
                    )}

                    {/* Phone Number */}
                    {property.contact_phone && (
                      <div className="p-4 bg-white rounded-xl shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                          <Phone className="text-blue-600" size={20} />
                          <span className="font-medium text-gray-900">Phone Number</span>
                        </div>
                        <a 
                          href={`tel:${property.contact_phone}`}
                          className="block text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          {property.contact_phone}
                        </a>
                        <button className="mt-4 w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                          Call Now
                        </button>
                      </div>
                    )}

                    {/* Inquiry Form Note */}
                    <div className="mt-6 p-4 bg-white/80 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Interested in this property? Contact the owner directly or schedule a visit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Properties Section */}
        {relatedProperties.length > 0 && (
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Similar Properties</h2>
                <p className="text-gray-600">You might also be interested in</p>
              </div>
              <button 
                onClick={() => navigate('/properties')}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                View All <ChevronRight size={18} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProperties.map((relatedProp) => (
                <div 
                  key={relatedProp.id}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200 cursor-pointer"
                  onClick={() => handleViewDetails(relatedProp.id)}
                >
                  {/* Property Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={relatedProp.images?.[0] || `https://via.placeholder.com/400x300?text=${relatedProp.property_type}`}
                      alt={relatedProp.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {relatedProp.property_type}
                      </div>
                    </div>
                    <button 
                      className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFavorite(!isFavorite);
                      }}
                    >
                      <Heart size={18} className="text-gray-600" />
                    </button>
                  </div>
                  
                  {/* Property Details */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 line-clamp-1">{relatedProp.title}</h3>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium">4.5</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-gray-600 mb-3">
                      <MapPin size={14} />
                      <span className="text-sm line-clamp-1">{relatedProp.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Bed size={16} className="text-gray-500" />
                          <span className="text-sm text-gray-700">{relatedProp.bedrooms || "-"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath size={16} className="text-gray-500" />
                          <span className="text-sm text-gray-700">{relatedProp.bathrooms || "-"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Square size={16} className="text-gray-500" />
                          <span className="text-sm text-gray-700">
                            {relatedProp.area_sqft ? `${relatedProp.area_sqft} sqft` : "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Price</p>
                          <p className="font-bold text-lg text-gray-900">
                            ₹{relatedProp.price?.toLocaleString()}
                          </p>
                        </div>
                        <button 
                          className="inline-flex items-center gap-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(relatedProp.id);
                          }}
                        >
                          View Details
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

       
      </div>
    </div>
  );
}