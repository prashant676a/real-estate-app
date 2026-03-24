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
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [fetchProperties]);

  return (
    <div className="min-h-screen p-8 bg-gray-50 text-gray-900 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex items-center justify-between border-b pb-4">
          <h1 className="text-3xl font-bold">Real Estate Listings</h1>
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className={`px-4 py-2 rounded font-medium transition-colors ${isAdmin ? "bg-red-600 hover:bg-red-700 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            {isAdmin ? "Admin Mode Active" : "User Mode"}
          </button>
        </header>

        <section className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
          <h2 className="text-xl font-semibold">Search Filters</h2>
          <div className="flex gap-4 flex-wrap">
            <input
              type="text"
              placeholder="Search keyword..."
              value={keyword}
              onChange={(e) => { setKeyword(e.target.value); setPage(1); }}
              className="border border-gray-300 rounded px-4 py-2 flex-1"
            />
            <input
              type="number"
              placeholder="Beds"
              value={beds}
              onChange={(e) => { setBeds(e.target.value); setPage(1); }}
              className="border border-gray-300 rounded px-4 py-2 w-24"
            />
            <select
              value={type}
              onChange={(e) => { setType(e.target.value); setPage(1); }}
              className="border border-gray-300 rounded px-4 py-2"
            >
              <option value="">Any Type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
            </select>
          </div>
        </section>

        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <main className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((p) => (
                <Link href={`/listings/${p.id}`} key={p.id}>
                  <article className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition cursor-pointer flex flex-col h-full">
                    <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                    <p className="text-2xl text-blue-600 font-semibold mb-2">${p.price.toLocaleString()}</p>
                    <div className="text-gray-600 space-y-1 mt-auto">
                      <p>{p.beds} Beds • {p.baths} Baths</p>
                      <p className="capitalize">{p.property_type} in {p.suburb}</p>
                    </div>
                    {p.internal_notes && (
                      <div className="mt-4 p-3 bg-red-50 text-red-800 rounded text-sm border-l-4 border-red-500">
                        <span className="font-bold">Confidential: </span>
                        {p.internal_notes}
                      </div>
                    )}
                  </article>
                </Link>
              ))}
              {properties.length === 0 && (
                <div className="col-span-full text-center py-10 text-gray-500">No properties found.</div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-4 py-4">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="py-2">Page {page} of {totalPages}</span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </main>
        )}
      </div>
    </div>
  );
}
