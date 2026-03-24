"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Property {
  id: number;
  title: string;
  price: number;
  beds: number;
  baths: number;
  property_type: string;
  suburb: string;
  internal_notes?: string;
  address: string;
}

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [beds, setBeds] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        ...(keyword && { keyword }),
        ...(beds && { beds }),
        ...(type && { property_type: type })
      });

      const headers: Record<string, string> = {};
      if (isAdmin) {
        headers["Authorization"] = "Bearer admin-token";
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings?${params}`, {
        headers
      });
      const json = await res.json();
      setProperties(json.data || []);
      setTotalPages(json.meta?.total_pages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, keyword, beds, type, isAdmin]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProperties();
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [fetchProperties]);

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900 pb-20">
      {/* Header / Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-6xl mx-auto px-6 py-8 relative z-10">
          <header className="flex flex-col sm:flex-row items-center justify-between mb-12">
            <h1 className="text-2xl font-black tracking-tighter">
              TECHKRAFT<span className="text-indigo-400">REALTY</span>
            </h1>
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className={`mt-4 sm:mt-0 px-5 py-2 rounded-full font-medium text-sm tracking-wide transition-all shadow-md ${
                isAdmin 
                  ? "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/30" 
                  : "bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20"
              }`}
            >
              {isAdmin ? "Admin Security: ACTIVE" : "Switch to Admin"}
            </button>
          </header>

          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Find your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-cyan-300">perfect home</span>.
            </h2>
            <p className="text-slate-300 text-lg md:text-xl font-light">
              Discover premium properties across the most desirable neighborhoods.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-20">
        
        {/* Search Bar Glassmorphism */}
        <section className="bg-white/80 backdrop-blur-xl p-4 md:p-6 rounded-2xl shadow-xl border border-white/50 mb-12 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input
              type="text"
              placeholder="Search by city, suburb, or keyword..."
              value={keyword}
              onChange={(e) => { setKeyword(e.target.value); setPage(1); }}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
          
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="number"
                placeholder="Beds"
                value={beds}
                onChange={(e) => { setBeds(e.target.value); setPage(1); }}
                className="w-24 px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="relative">
              <select
                value={type}
                onChange={(e) => { setType(e.target.value); setPage(1); }}
                className="appearance-none w-40 px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer"
              >
                <option value="">Any Type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
              </select>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="py-20 flex justify-center items-center space-x-2">
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        ) : (
          <main>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((p) => (
                <Link href={`/listings/${p.id}`} key={p.id} className="group outline-none">
                  <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full focus:ring-4 focus:ring-indigo-500/20">
                    
                    {/* Fake Image Placeholder - using gradient */}
                    <div className="h-48 bg-gradient-to-br from-indigo-100 via-slate-100 to-cyan-50 relative overflow-hidden group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                       <span className="text-slate-300 font-medium uppercase tracking-widest text-sm">Property Image</span>
                       <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-700 shadow-sm capitalize">
                          {p.property_type}
                       </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-2">
                         <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
                            {p.title}
                         </h3>
                      </div>
                      
                      <p className="text-sm text-slate-500 mb-4 flex items-center gap-1">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                         {p.suburb}
                      </p>

                      <div className="mt-auto pt-4 border-t border-slate-100 space-y-4">
                        <div className="flex justify-between items-end">
                            <p className="text-2xl font-black text-slate-900 tracking-tight">
                              ${p.price.toLocaleString()}
                            </p>
                            <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                               <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">🛏️ {p.beds}</span>
                               <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">🛁 {p.baths}</span>
                            </div>
                        </div>

                        {p.internal_notes && (
                          <div className="p-3 bg-rose-50/80 rounded-lg text-xs text-rose-800 border-l-4 border-rose-500 shadow-inner">
                            <span className="font-bold flex items-center gap-1 mb-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg> STAFF NOTES:</span>
                            {p.internal_notes}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
              
            </div>
            
            {properties.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-dashed border-slate-300 mt-8">
                   <div className="text-6xl mb-4">🏠</div>
                   <h3 className="text-xl font-bold text-slate-900">No properties match your exact search</h3>
                   <p className="text-slate-500 mt-2">Try adjusting your filters or search keywords.</p>
                   <button onClick={() => {setKeyword(''); setBeds(''); setType(''); setPage(1)}} className="mt-4 text-indigo-600 font-medium hover:underline">Clear all filters</button>
                </div>
              )}

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:hover:bg-white transition-all shadow-sm"
                >
                  &larr; Prev
                </button>
                <div className="text-slate-500 font-medium">
                  <span className="text-slate-900 font-bold">{page}</span> / {totalPages}
                </div>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:hover:bg-white transition-all shadow-sm"
                >
                  Next &rarr;
                </button>
              </div>
            )}
          </main>
        )}
      </div>
    </div>
  );
}
