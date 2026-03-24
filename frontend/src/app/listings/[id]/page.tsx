"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Property {
  id: number;
  title: string;
  price: number;
  beds: number;
  baths: number;
  property_type: string;
  suburb: string;
  description: string;
  address: string;
  internal_notes?: string;
  is_active: boolean;
}

export default function PropertyDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const headers: Record<string, string> = {};
        if (isAdmin) {
          headers["Authorization"] = "Bearer admin-token";
        }
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings/${id}`, { headers });
        if (!res.ok) {
          if (res.status === 404) router.push("/");
          return;
        }
        const json = await res.json();
        setProperty(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProperty();
  }, [id, isAdmin, router]);

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-center">
      <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
    </div>
  );
  
  if (!property) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Navbar Minimal */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-slate-500 hover:text-indigo-600 font-medium flex items-center gap-2 group transition-colors">
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Search
          </Link>
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                isAdmin 
                  ? "bg-rose-100 text-rose-700 border border-rose-200" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
          >
            {isAdmin ? "Admin Security: ACTIVE" : "Switch to Admin"}
          </button>
        </div>
      </nav>

      {/* Hero Image Area */}
      <div className="w-full h-80 bg-slate-900 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        <div className="max-w-5xl mx-auto px-6 h-full flex items-end pb-8 relative z-20">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-end w-full">
               <div className="text-white">
                  <div className="flex items-center gap-3 mb-3">
                     <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                        {property.property_type}
                     </span>
                     {!property.is_active && (
                       <span className="bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                          Off Market
                       </span>
                     )}
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 drop-shadow-md">{property.title}</h1>
                  <p className="text-slate-300 font-medium text-lg flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    {property.address}, {property.suburb}
                  </p>
               </div>
               <div className="text-white text-right shrink-0">
                  <p className="text-slate-300 uppercase text-sm font-bold tracking-widest mb-1">Asking Price</p>
                  <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400 drop-shadow-sm">
                    ${property.price.toLocaleString()}
                  </div>
               </div>
            </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Details column */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex divide-x divide-slate-100">
             <div className="flex-1 text-center">
                <p className="text-slate-500 font-medium mb-1">Bedrooms</p>
                <p className="text-3xl font-black text-slate-800">{property.beds}</p>
             </div>
             <div className="flex-1 text-center">
                <p className="text-slate-500 font-medium mb-1">Bathrooms</p>
                <p className="text-3xl font-black text-slate-800">{property.baths}</p>
             </div>
             <div className="flex-1 text-center">
                <p className="text-slate-500 font-medium mb-1">Property ID</p>
                <p className="text-3xl font-black text-slate-800">#{property.id}</p>
             </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
              About this property
            </h2>
            <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-wrap">
              {property.description}
            </p>
          </div>

          {property.internal_notes && (
            <div className="bg-rose-50 border-l-4 border-rose-500 rounded-r-2xl shadow-sm p-6 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 text-rose-500/10">
                 <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
              </div>
              <h3 className="text-lg font-bold text-rose-900 mb-3 flex items-center gap-2">
                 <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                 Confidential Agent Notes
              </h3>
              <p className="text-rose-800 font-medium relative z-10">{property.internal_notes}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-center">
              <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full mx-auto flex items-center justify-center mb-4 text-2xl font-bold shadow-inner">
                 TJ
              </div>
              <h3 className="text-xl font-bold text-slate-900">TechKraft Agent</h3>
              <p className="text-slate-500 mb-6">Listing Specialist</p>
              
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-indigo-200">
                 Contact Agent
              </button>
           </div>
           
           <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200">
               <h4 className="font-bold text-slate-900 mb-4">Location Map Placeholder</h4>
               <div className="w-full h-40 bg-slate-300 rounded-lg flex items-center justify-center shadow-inner">
                  <span className="text-slate-500">Map UI</span>
               </div>
           </div>
        </div>

      </div>
    </div>
  );
}
