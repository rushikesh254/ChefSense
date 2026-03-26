import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  Loader2,
  PlusCircle,
  Refrigerator,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import pantryService from "@/services/pantry";
import { Button } from "@/components/ui/button";
import PantryCard from "@/components/PantryCard";
import { FILTERS } from "@/utils/constants";

// import AddToPantryModal from '@/components/AddToPantryModal'

function PantryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    async function loaditems() {
      try {
        const response = await pantryService.getitems();
        setItems(response.items || []);
      } catch (error) {
        toast.error("Failed to load pantry items");
      } finally {
        setLoading(false);
      }
    }
    loaditems();
  }, []);

  const filteredItems =
    statusFilter === "all"
      ? items
      : items.filter((item) => item.expiryStatus === statusFilter);

  function deleteItem(id) {
    setItems(items.filter((item) => item.id !== id));
    toast.success("Item deleted successfully");
  }

  function updateItem(id, name, quantity, category, expiryDate, expiryStatus) {
    const updateditem = {
      id,
      name,
      quantity,
      category,
      expiryDate,
      expiryStatus,
    };
    setItems(items.map((item) => (item.id === id ? updateditem : item)));
    toast.success("Item updated successfully");
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-500 mb-2">
              Kitchen
            </p>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-stone-900">
              My Pantry
            </h1>
            <p className="mt-2 text-stone-500 text-sm">
              {items.length} {items.length === 1 ? "item" : "items"} available
            </p>
          </div>

          <Button
            onClick={() => setShowModal(true)}
            variant="primary"
            size="lg"
            className="gap-2 cursor-pointer w-full sm:w-auto"
          >
            <PlusCircle className="w-5 h-5" />
            Add Ingredients
          </Button>
        </div>

        {items.length > 0 && (
          <div className="mb-8 bg-linear-to-r from-green-600 to-emerald-500 rounded-2xl overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5 p-6 sm:p-8">
              <div className="text-white">
                <h2 className="mb-2 flex items-center gap-2 text-2xl sm:text-3xl font-extrabold tracking-tight">
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                  Wondering what to make?
                </h2>
                <p className="text-green-50/80 text-sm sm:text-base">
                  Our AI chef can analyze your pantry and generate{" "}
                  {items.length > 5 ? "dozens of" : "a few"} recipes right now.
                </p>
              </div>
              <Link to="/pantry/recipes" className="w-full sm:w-auto shrink-0">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto h-11 px-6 bg-white/90 hover:bg-white text-stone-900 font-bold border-0 rounded-xl hover:scale-105"
                >
                  Get Recipe Suggestions
                </Button>
              </Link>
            </div>
          </div>
        )}
        {/* filters */}
        {items.length > 0 && (
          <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((filter) => {
                const Icon = filter.icon;
                const isActive = statusFilter === filter.key;
                return (
                  <button
                    key={filter.key}
                    onClick={() => setStatusFilter(filter.key)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                      isActive
                        ? "bg-stone-900 text-white border-stone-900"
                        : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* loading */}
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="border rounded-full inline-flex items-center bg-white px-6 py-4 text-lg font-bold text-stone-900">
              <Loader2 className="mr-3 h-6 w-6 animate-spin text-brand-600" />
              Loading your pantry...
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-16 text-center">
            <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <Refrigerator className="w-9 h-9 text-stone-300" />
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-2">
              Your pantry is empty
            </h3>
            <p className="text-stone-500 text-sm mb-8 max-w-xs mx-auto">
              Add ingredients to your digital pantry to keep track of what you
              have and get AI-powered recipe suggestions.
            </p>
            <Button onClick={() => setShowModal(true)} variant="primary">
              Add Your First Item
            </Button>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-16 text-center">
            <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <AlertCircle className="w-9 h-9 text-stone-300" />
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-2">
              No items found
            </h3>
            <p className="text-stone-500 text-sm mb-6">
              There are no items matching the current filter.
            </p>
            <Button variant="outline" onClick={() => setStatusFilter("all")}>
              Clear Filter
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => (
              <PantryCard
                key={item.id}
                item={item}
                deleteItem={deleteItem}
                updateItem={updateItem}
              />
            ))}
          </div>
        )}
        {/* modal */}
        {/* <AddToPantryModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
        /> */}
      </div>
    </div>
  );
}

export default PantryPage;
