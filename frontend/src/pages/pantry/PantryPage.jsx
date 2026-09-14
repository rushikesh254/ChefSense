import AddToPantryModal from "@/components/AddToPantryModal";
import PantryCard from "@/components/PantryCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getItems,
  deleteItem as deleteItemApi,
  addItem as addItemApi,
  updateItem as updateItemApi,
} from "@/services/pantry";
import { AlertCircle, Loader2, PlusCircle, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function PantryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function loaditems() {
      try {
        const data = await getItems();
        setItems(data);
      } catch (error) {
        toast.error("Unable to load your pantry items. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    loaditems();
  }, []);

  async function updateItem(id, updatedItem) {
    try {
      const result = await updateItemApi(id, updatedItem);
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...result } : item)),
      );
      toast.success("Pantry item has been updated.");
    } catch {
      toast.error("Unable to update this item. Please try again.");
    }
  }

  async function deleteItem(id) {
    try {
      await deleteItemApi(id);
      setItems(items.filter((item) => item.id !== id));
      toast.success("Pantry item has been removed.");
    } catch {
      toast.error("Unable to remove this item. Please try again.");
    }
  }

  async function handleAdd(newItems) {
    try {
      const created = [];
      for (const item of newItems) {
        if (item._id) {
          created.push({ ...item, id: item._id });
        } else {
          const result = await addItemApi({
            name: item.name,
            quantity: item.quantity || "",
            category: item.category || "pantry",
          });
          created.push(result);
        }
      }
      setItems((prev) => [...prev, ...created]);
      toast.success("Items have been added to your pantry.");
    } catch {
      toast.error("Unable to add items. Please try again.");
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 mb-6 justify-between md:flex-row md:items-end">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-500">
              Kitchen
            </p>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-black">
              My Pantry
            </h1>
            <p className="text-stone-500 sm:text-lg text-sm">
              Your digital ingredient tracker. Manage your staples and explore
              AI recipe suggestions.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-start md:items-end">
              <span className="text-3xl sm:text-4xl font-black text-stone-900 ">
                {items.length}
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase text-stone-400 mt-1">
                Items found
              </span>
            </div>

            <Button
              onClick={() => setShowModal(true)}
              variant="secondary"
              size="lg"
              className="w-1/2 sm:w-auto font-bold rounded-2xl shadow-lg border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Add Pantry Items
            </Button>
          </div>
        </div>

        {items.length > 0 && (
          <div className="rounded-2xl p-6 bg-blue-400 text-white mb-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-center lg:text-left space-y-3">
                <Badge className="bg-white/20 text-white text-xs font-bold uppercase mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  AI Suggested
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  Wondering what to make?
                </h2>
                <p className="text-brand-50 text-base sm:text-lg max-w-xl">
                  Our AI chef can analyze your pantry and generate
                  <span className="font-bold text-white underline decoration-brand-300 underline-offset-4">
                    {" "}
                    dozens of custom recipes
                  </span>{" "}
                  instantly.
                </p>
              </div>
              <Link to="/pantry-recipes" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto h-14 px-10 text-brand-600 rounded-2xl text-lg font-bold"
                >
                  Explore Recipes
                </Button>
              </Link>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center">
            <div className="border border-stone-200 rounded-full flex justify-center items-center bg-stone-50 sm:px-8 px-4 sm:py-4 py-3 text-lg font-bold shadow-xl">
              <Loader2 className="animate-spin text-brand-600 mr-3 h-6 w-6" />
              Loading your pantry...
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 bg-white p-10 sm:p-20 text-center">
            <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <AlertCircle className="w-9 h-9 text-brand-600" />
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-2">
              No items found
            </h3>
            <p className="text-stone-500 text-sm mb-6 max-w-xs mx-auto">
              Start by adding your first ingredient
            </p>
            <Button
              onClick={() => setShowModal(true)}
              variant="primary"
              className="rounded-full font-bold gap-2 border-brand-600 text-white bg-brand-600 hover:bg-brand-700 px-6 py-3 w-full sm:w-auto"
            >
              <PlusCircle className="w-4 h-4" />
              Add Ingredient
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <PantryCard
                key={item.id}
                item={item}
                updateItem={updateItem}
                deleteItem={deleteItem}
              />
            ))}
          </div>
        )}

        <AddToPantryModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
        />
      </div>
    </div>
  );
}

export default PantryPage;
