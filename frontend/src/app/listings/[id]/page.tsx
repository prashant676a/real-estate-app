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

  if (loading) return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  if (!property) return <div className="min-h-screen flex justify-center items-center">Property not found.</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50 text-gray-900 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex items-center justify-between border-b pb-4">
          <Link href="/" className="text-blue-600 hover:underline">← Back to Search</Link>
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className={`px-4 py-2 rounded font-medium transition-colors ${isAdmin ? "bg-red-600 hover:bg-red-700 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            {isAdmin ? "Admin Mode Active" : "User Mode"}
          </button>
        </header>

        <main className="bg-white p-8 rounded-xl shadow-sm border space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{property.title}</h1>
            <p className="text-gray-500 text-lg">{property.address}, {property.suburb}</p>
          </div>
          
          <div className="text-4xl text-blue-600 font-bold">
            ${property.price.toLocaleString()}
          </div>

          <div className="flex gap-8 text-gray-700 font-medium py-4 border-y">
            <div><span className="text-2xl font-bold text-gray-900">{property.beds}</span> Beds</div>
            <div><span className="text-2xl font-bold text-gray-900">{property.baths}</span> Baths</div>
            <div className="capitalize"><span className="text-lg text-gray-900">{property.property_type}</span></div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{property.description}</p>
          </div>

          {property.internal_notes && (
            <div className="mt-8 p-6 bg-red-50 text-red-900 border border-red-200 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
                <span className="text-red-500">🔒</span> Internal Admin Notes
              </h3>
              <p>{property.internal_notes}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
