import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/AuthContext";
import { getInitials } from "@/lib/helpers";
import { getUserUsage, updatePassword, updateProfile } from "@/services/auth";
import {
  Activity,
  ChefHat,
  Eye,
  EyeOff,
  Heart,
  Lightbulb,
  Lock,
  LogOut,
  Scan,
  UserCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function ProfilePage() {
  const { user, logout } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [activeTab, setActiveTab] = useState("personal");
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [usage, setUsage] = useState(null);

  useEffect(() => {
    if (activeTab === "activity") {
      getUserUsage()
        .then((data) => setUsage(data.usage))
        .catch(() => {});
    }
  }, [activeTab]);

  if (!user) return null;

  const stats = [
    {
      label: "Recipes Generated",
      value: usage?.recipeGenerationCount || 0,
      description:
        "You're actively generating recipes — try exploring new cuisines.",
      icon: ChefHat,
      color: "bg-brand-100 text-brand-600",
    },
    {
      label: "Saved Recipes",
      value: usage?.savedRecipesCount || 0,
      description:
        "Your saved recipes are growing — organize them into favorites.",
      icon: Heart,
      color: "bg-pink-100 text-pink-600",
    },
    {
      label: "Pantry Items",
      value: usage?.pantryItemCount || 0,
      description: "Keep your pantry updated for better recipe suggestions.",
      icon: Activity,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Scans Performed",
      value: usage?.scanCount || 0,
      description: "Every scan helps you keep your pantry in check.",
      icon: Scan,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      label: "Suggestions Made",
      value: usage?.suggestionCount || 0,
      description: "AI-powered suggestions tailored to your pantry.",
      icon: Lightbulb,
      color: "bg-amber-100 text-amber-600",
    },
  ];

  const navItems = [
    { id: "personal", label: "Personal Information", icon: UserCircle },
    { id: "security", label: "Security & Password", icon: Lock },
    { id: "activity", label: "My Activity", icon: Activity },
  ];

  async function handlePasswordChange(e) {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      toast.error("New passwords don't match. Please try again.");
      return;
    }
    if (passwords.new.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    try {
      await updatePassword({
        currentPassword: passwords.current,
        newPassword: passwords.new,
      });
      toast.success("Your password has been updated.");
      setPasswords({ current: "", new: "", confirm: "" });
      setActiveTab("personal");
    } catch {
      toast.error(
        "Unable to update your passwod. Please ensure your current password is correct and try again.",
      );
    }
  }

  function handleLogout() {
    logout();
    toast.success("You've been signed out.");
  }

  async function handlePersonalChange(e) {
    e.preventDefault();
    try {
      await updateProfile({ firstName, lastName });
      toast.success("Your profile has been updated.");
    } catch {
      toast.error("Unable to update your profile. Please try again.");
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 pt-20 sm:py-16 sm:pt-28 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900">
          My Profile
        </h1>
        <p className="text-stone-500 mt-2">
          Manage your account, security, and activity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <Card className="rounded-2xl overflow-hidden">
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.image} />
                <AvatarFallback className="text-2xl font-bold bg-brand-600 text-white">
                  {getInitials(user)}
                </AvatarFallback>
              </Avatar>

              <CardTitle className="mt-4">
                {user.firstName} {user.lastName}
              </CardTitle>

              <Badge className="mt-2">User</Badge>
            </CardHeader>

            <CardContent className="p-0">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-3 p-4 w-full text-left border-l-4 transition ${
                      activeTab === item.id
                        ? "bg-brand-50 text-brand-700 border-brand-600"
                        : "text-stone-600 hover:bg-stone-50 border-transparent"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                );
              })}

              <button
                className="flex items-center gap-3 p-4 text-red-600 w-full hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3 space-y-6">
          {activeTab === "personal" && (
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCircle className="w-5 h-5 text-brand-600" />
                  Personal Information
                </CardTitle>
                <p className="text-sm text-stone-500">
                  Update your profile details.
                </p>
              </CardHeader>

              <CardContent>
                <form
                  onSubmit={handlePersonalChange}
                  className="space-y-5 max-w-xl"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="text-sm font-semibold"
                      >
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="text-sm font-semibold"
                      >
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="text-sm font-semibold">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      value={user.email}
                      readOnly
                      className="mt-1 bg-stone-100 cursor-not-allowed"
                    />
                    <p className="text-xs text-stone-400 mt-1">
                      Email cannot be changed.
                    </p>
                  </div>

                  <Button type="submit" variant="primary" className="w-fit">
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {activeTab === "security" && (
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-brand-600" />
                  Change Password
                </CardTitle>
              </CardHeader>

              <CardContent>
                <form
                  onSubmit={handlePasswordChange}
                  className="space-y-4 max-w-md"
                >
                  <div className="relative">
                    <Input
                      type={showCurrent ? "text" : "password"}
                      placeholder="Current Password"
                      value={passwords.current}
                      onChange={(e) =>
                        setPasswords({ ...passwords, current: e.target.value })
                      }
                      className="h-12 pl-4 pr-10 rounded-xl border-stone-200 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent(!showCurrent)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      {showCurrent ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="relative">
                    <Input
                      type={showNew ? "text" : "password"}
                      placeholder="New Password"
                      value={passwords.new}
                      onChange={(e) =>
                        setPasswords({ ...passwords, new: e.target.value })
                      }
                      className="h-12 pl-4 pr-10 rounded-xl border-stone-200 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      {showNew ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="relative">
                    <Input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={passwords.confirm}
                      onChange={(e) =>
                        setPasswords({ ...passwords, confirm: e.target.value })
                      }
                      className="h-12 pl-4 pr-10 rounded-xl border-stone-200 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      {showConfirm ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <Button
                    type="submit"
                    variant="secondary"
                    className="w-fit bg-stone-700 hover:bg-stone-600 text-white hover:text-white"
                  >
                    Update Password
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {activeTab === "activity" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-extrabold ">
                  Your Cooking Dashboard
                </h2>
                <p className="text-sm  mt-1">
                  Track your cooking journey and activity.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.map((stat) => (
                  <Card key={stat.label}>
                    <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                      <div
                        className={`w-14 h-14 rounded-full  flex items-center justify-center ${stat.color}`}
                      >
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <p className="text-3xl font-extrabold ">{stat.value}</p>
                      <p className="text-xs font-semibold  uppercase tracking-wide">
                        {stat.label}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-stone-800">
                    Cooking Insights
                  </CardTitle>
                  <p className="text-sm text-stone-500">
                    Smart tips based on your activity
                  </p>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-stone-600">
                  {stats.map((stat) => (
                    <div key={stat.label} className="flex items-start gap-3">
                      <stat.icon
                        className={`w-4 h-4 mt-1  rounded-full ${stat.color}`}
                      />
                      <p>{stat.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
