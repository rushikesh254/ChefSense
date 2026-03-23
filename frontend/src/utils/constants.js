import {
  Clock3,
  Leaf,
  Package,
  Refrigerator,
  Sparkles,
  TriangleAlert,
  Utensils
} from "lucide-react";

export const DIFFICULTY_STYLES = {
  easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  hard: "bg-red-50 text-red-700 border-red-200",
};



export const PANTRY_CATEGORIES = [
  { value: "dairy", label: "Dairy & Alternatives" },
  { value: "meat", label: "Meat & Poultry" },
  { value: "seafood", label: "Seafood" },
  { value: "produce", label: "Produce" },
  { value: "pantry", label: "Pantry Staples" },
  { value: "frozen", label: "Frozen Foods" },
  { value: "beverages", label: "Beverages" },
  { value: "condiments", label: "Condiments & Sauces" },
  { value: "bakery", label: "Bakery" },
  { value: "snacks", label: "Snacks" },
];



export const EXPIRY_STATUS = [
  { value: "fresh", label: "Fresh" },
  { value: "expiring_soon", label: "Expiring Soon" },
  { value: "expired", label: "Expired" },
  { value: "no_expiry", label: "Pantry Staple" },
];


export const FILTERS = [
  { key: "all", label: "All Items", icon: Package },
  { key: "fresh", label: "Fresh", icon: Leaf },
  { key: "expiring_soon", label: "Expiring Soon", icon: Clock3 },
  { key: "expired", label: "Expired", icon: TriangleAlert },
  { key: "no_expiry", label: "Pantry Staples", icon: Refrigerator },
];


