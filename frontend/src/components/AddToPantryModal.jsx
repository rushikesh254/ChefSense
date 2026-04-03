import ImageUploader from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EXPIRY_STATUSES, PANTRY_CATEGORIES } from "@/lib/constants";
import { Edit2, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AddToPantryModal({ isOpen, onClose, onAdd }) {
  // tabs for the ai and manual
  const [tab, setTab] = useState("ai");

  // form states
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [expiryStatus, setExpiryStatus] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  // AI states
  const [image, setImage] = useState(null);
  const [scannedItems, setScannedItems] = useState([]);

  if (!isOpen) return null;

  // function to handle manual add
  function handleManual(e) {
    e.preventDefault();
    if (!name) {
      toast.error("Please enter the item name");
      return;
    }
    onAdd([
      { id: Date.now(), name, quantity, category, expiryStatus, expiryDate },
    ]);
    console.log("item added");
    toast.success("Item added successfully");
    console.log(name, quantity, category, expiryStatus, expiryDate);
    setName("");
    setQuantity("");
    setCategory("");
    setExpiryStatus("");
    setExpiryDate("");
  }

  // function to handle image upload
  function handleImageUpload(imageData) {
    setImage(imageData);
    if (!imageData) {
      setScannedItems([]);
      return;
    }

    setScannedItems([
      { id: 1, name: "Fresh Tomatoes", quantity: "500g" },
      { id: 2, name: "Red Onions", quantity: "2 units" },
      { id: 3, name: "Bell Peppers", quantity: "3 units" },
    ]);
  }

  function handleAI() {
    if (scannedItems.length === 0) {
      toast.error("No items detected to add");
      return;
    }

    onAdd(
      scannedItems.map((item) => ({
        ...item,
        id: Date.now() + Math.random(),
        category: "Others",
        expiryStatus: "no expiry",
      })),
    );

    toast.success(`${scannedItems.length} items added successfully`);
    setImage(null);
    setScannedItems([]);
    onClose();
  }

  function removeScannedItem(id) {
    setScannedItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-h-[90vh] sm:max-h-[85vh] sm:max-w-md rounded-2xl overflow-hidden">
        <CardContent className="p-0 flex flex-col h-[70vh] sm:h-150 overflow-hidden">
          {/* header and tabse are fixed at top  */}
          <div className="p-6 pb-0 flex flex-col gap-4 flex-none">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg">Add Pantry Item</h2>
              <button onClick={onClose} className="text-2xl">
                x
              </button>
            </div>

            <div className="flex bg-stone-100 p-1 rounded-xl">
              {["ai", "manual"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-1.5 text-xs rounded-lg   ${
                    tab === t
                      ? "bg-white shadow-sm font-bold text-black"
                      : "text-stone-500 hover:text-stone-700"
                  }`}
                >
                  {t === "ai" ? "AI Add" : "Manual Add"}
                </button>
              ))}
            </div>
          </div>

          {/* main content area (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-6 pt-4 ">
            {tab === "ai" && (
              <div className="space-y-5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <p className="text-sm font-bold">AI Scanner</p>
                </div>

                <ImageUploader
                  value={image}
                  onImageUpload={handleImageUpload}
                />

                {/* Scanned Items List */}
                {scannedItems.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                      <p className="text-xs font-bold uppercase text-stone-400">
                        Detected Items ({scannedItems.length})
                      </p>
                      <button
                        onClick={() => setScannedItems([])}
                        className="text-[10px] font-bold uppercase text-red-500 hover:underline"
                      >
                        Clear All
                      </button>
                    </div>

                    <div className="space-y-2">
                      {scannedItems.map((item) => (
                        <div
                          key={item.id}
                          className="group flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-100 hover:border-brand-200 transition-colors"
                        >
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-stone-800">
                              {item.name}
                            </span>
                            <span className="text-[10px] font-medium text-stone-500 uppercase">
                              {item.quantity}
                            </span>
                          </div>
                          <button
                            onClick={() => removeScannedItem(item.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {tab === "manual" && (
              <form
                id="manual-form"
                onSubmit={handleManual}
                className="space-y-4"
              >
                <div className="flex items-center gap-2">
                  <Edit2 className="w-4 h-4 text-brand-500" />
                  <p className="text-sm font-bold">Manual Entry</p>
                </div>

                {/* Form fields */}

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-stone-400 ml-1">
                    Name
                  </label>
                  <Input
                    placeholder="e.g. Milk"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-xl border-stone-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-stone-400 ml-1">
                    Quantity
                  </label>
                  <Input
                    placeholder="e.g. 1 Gallon"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="rounded-xl border-stone-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-stone-400 ml-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full border border-stone-200 rounded-xl px-3 h-10 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-200"
                    >
                      <option value="">Select category</option>
                      {PANTRY_CATEGORIES.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-stone-400 ml-1">
                      Status
                    </label>
                    <select
                      value={expiryStatus}
                      onChange={(e) => setExpiryStatus(e.target.value)}
                      className="w-full border border-stone-200 rounded-xl px-3 h-10 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-200"
                    >
                      <option value="">Select status</option>
                      {EXPIRY_STATUSES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-stone-400 ml-1">
                    Expiry Date
                  </label>
                  <Input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="rounded-xl border-stone-200"
                  />
                </div>
              </form>
            )}
          </div>

          {/* FOOTER (Fixed) */}
          <div className="p-6 border-t border-stone-100 flex flex-col gap-2 justify-center items-center flex-none">
            {tab === "ai" ? (
              <Button
                onClick={handleAI}
                variant="primary"
                disabled={!image || scannedItems.length === 0}
                className="w-fit"
              >
                Add Items
              </Button>
            ) : (
              <div className="flex gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  form="manual-form"
                  className="flex-1"
                >
                  Save Item
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            )}
            {/* Safe area padding */}
            <div className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
