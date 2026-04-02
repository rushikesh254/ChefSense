import { Card, CardContent } from "@/components/ui/card";
import { EXPIRY_STATUSES, PANTRY_CATEGORIES } from "@/lib/constants";
import { STATUS_CONFIG } from "@/lib/utils";
import { Calendar, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function PantryCard({ item, updateItem, deleteItem }) {
  // toggle state for edit mode
  const [isEditing, setIsEditing] = useState(false);

  // form states
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity);
  const [category, setCategory] = useState(item.category);
  const [expiryDate, setExpiryDate] = useState(item.expiryDate);
  const [expiryStatus, setExpiryStatus] = useState(item.expiryStatus);

  // handle form submit
  function handleFormSubmit(e) {
    e.preventDefault();

    // send the current states to pantrypage
    updateItem(item.id, {
      name,
      quantity,
      category,
      expiryDate,
      expiryStatus,
    });
    setIsEditing(false);
  }

  // reset the form to the original values when camcel button clicked
  function handleCancel() {
    setIsEditing(false);
    setName(item.name);
    setQuantity(item.quantity);
    setCategory(item.category);
    setExpiryDate(item.expiryDate);
    setExpiryStatus(item.expiryStatus);
  }

  const status = STATUS_CONFIG[item.expiryStatus] || STATUS_CONFIG["no expiry"];

  return (
    <Card className="rounded-2xl h-full flex flex-col">
      {!isEditing ? (
        // not editing state
        <CardContent className="p-4 flex flex-col justify-between h-full">
          {/* Top Section */}
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0 pr-2">
                <h3 className="text-lg font-bold text-black " title={item.name}>
                  {item.name}
                </h3>
                <div className="flex items-center gap-1.5 text-stone-500 mt-1">
                  <span className="text-xs px-2 py-0.5 bg-stone-50 rounded-md border border-stone-100">
                    {item.quantity || "Qty not set"}
                  </span>
                </div>
              </div>

              <Badge
                variant="outline"
                className="text-xs py-1 px-2 font-bold uppercase border rounded-full"
              >
                {item.category}
              </Badge>
            </div>

            <div className="flex items-center justify-between gap-2 pt-1">
              <Badge
                className={`text-xs px-2 py-1 rounded-full font-black uppercase border ${status.color}`}
              >
                {status.label}
              </Badge>

              {item.expiryDate && (
                <div className="flex items-center gap-1.5 text-xs text-stone-400 font-bold uppercase ">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.expiryDate}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-3 border-t border-stone-50">
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="flex-1 h-9 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 "
            >
              <Edit2 className="h-3.5 w-3.5" />
              Edit
            </Button>

            <Button
              variant="outline"
              onClick={() => deleteItem(item.id)}
              className="px-3 h-9 rounded-full text-red-500 "
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      ) : (
        // editing state
        <CardContent className="p-5 h-full">
          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col h-full gap-4"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
                <Edit2 className="w-4 h-4 text-brand-500" />
              </div>
              <h3 className="font-black text-sm ">Edit Ingredient</h3>
            </div>

            <div className="grid gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-stone-400">
                  Name
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-stone-200   text-sm  rounded-xl"
                  placeholder="Ingredient name"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-stone-400 ml-1">
                  Quantity
                </label>
                <Input
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="border-stone-200   text-sm  rounded-xl"
                  placeholder="e.g. 500g, 2 units"
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
                    className="w-full rounded-xl border border-stone-200 bg-white px-3 text-sm h-10 focus:outline-none focus:ring-2 focus:ring-brand-200"
                  >
                    <option value="" disabled>
                      Category
                    </option>
                    {PANTRY_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
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
                    className="w-full rounded-xl border border-stone-200 bg-white px-3 text-sm h-10 focus:outline-none focus:ring-2 focus:ring-brand-200"
                  >
                    <option value="" disabled>
                      Status
                    </option>
                    {EXPIRY_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
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
                  className="border-stone-200   text-sm  rounded-xl"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 mt-auto">
              <Button
                type="submit"
                variant="primary"
                className="flex-1 text-xs font-bold rounded-full"
              >
                Save
              </Button>

              <Button
                onClick={handleCancel}
                variant="secondary"
                className="flex-1 text-xs font-bold rounded-full border-stone-200 text-stone-600"
                type="button"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      )}
    </Card>
  );
}

export default PantryCard;
