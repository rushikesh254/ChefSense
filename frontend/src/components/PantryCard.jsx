import React, { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PANTRY_CATEGORIES, EXPIRY_STATUS } from "@/utils/constants";

function getStatus(status) {
  if (status === "fresh")
    return { accentBar: "bg-green-500", labelClass: "text-green-600" };
  if (status === "expiring_soon")
    return { accentBar: "bg-amber-400", labelClass: "text-amber-600" };
  if (status === "expired")
    return { accentBar: "bg-red-500", labelClass: "text-red-600" };
  return { accentBar: "bg-stone-300", labelClass: "text-stone-500" };
}

function getStatusLabel(status) {
  const found = EXPIRY_STATUS.find((s) => s.value === status);
  return found ? found.label : "No Expiry";
}

function getCategoryLabel(value) {
  if (!value) return "Other";
  const found = PANTRY_CATEGORIES.find((c) => c.value === value.toLowerCase());
  return found ? found.label : value;
}

function PantryCard({ item, deleteItem, updateItem }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity);
  const [category, setCategory] = useState(item.category);
  const [expiryDate, setExpiryDate] = useState(item.expiryDate);
  const [expiryStatus, setExpiryStatus] = useState(item.expiryStatus);

  const itemId = item.id || item._id;
  const colors = getStatus(item.expiryStatus);
  const displayCategory = getCategoryLabel(item.category);

  function handleSubmit(e) {
    e.preventDefault();
    updateItem(itemId, name, quantity, category, expiryDate, expiryStatus);
    setIsEditing(false);
  }

  function handleCancel() {
    setName(item.name);
    setQuantity(item.quantity);
    setCategory(item.category);
    setExpiryDate(item.expiryDate);
    setExpiryStatus(item.expiryStatus);
    setIsEditing(false);
  }

  return (
    <Card
      className={`overflow-hidden p-0 flex flex-col ${
        isEditing
          ? "ring-2 ring-brand-300 shadow-md"
          : "hover:-translate-y-0.5 hover:shadow-md transition-all"
      }`}
    >
      {isEditing ? (
        <form onSubmit={handleSubmit} className="p-5 space-y-3">
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Name
            </label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Quantity
            </label>
            <Input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g. 2 lbs, 1 jar"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-stone-400">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-9 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              >
                {PANTRY_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-stone-400">
                Status
              </label>
              <select
                value={expiryStatus}
                onChange={(e) => setExpiryStatus(e.target.value)}
                className="h-9 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              >
                {EXPIRY_STATUS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Expiry Date
            </label>
            <Input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>

          <div className="flex gap-2 pt-1">
            <Button type="submit" variant="primary" className="flex-1">
              Save
            </Button>
            <Button
              type="button"
              onClick={handleCancel}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <>
          <div className={`h-1.5 ${colors.accentBar}`} />

          <CardContent className="p-5 flex flex-1 flex-col">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex-1 min-w-0 pr-2">
                <h3 className="mb-0.5 truncate text-[15px] font-semibold text-stone-900">
                  {item.name}
                </h3>
                <p className="truncate text-sm text-stone-400">
                  {item.quantity || "--"}
                </p>
              </div>

              <Badge
                variant="outline"
                className="shrink-0 rounded-full border-stone-200 bg-stone-50 text-[10px] text-stone-500"
              >
                {displayCategory}
              </Badge>
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-stone-100 pt-4">
              <div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${colors.labelClass}`}
                >
                  {getStatusLabel(item.expiryStatus)}
                </span>
                {item.expiryDate && (
                  <p className="text-xs text-stone-400 mt-0.5">
                    Exp: {item.expiryDate}
                  </p>
                )}
              </div>

              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  className="h-8 w-8 text-stone-400 hover:bg-stone-100 hover:text-stone-900"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteItem(itemId)}
                  className="h-8 w-8 text-stone-400 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
}

export default PantryCard;
