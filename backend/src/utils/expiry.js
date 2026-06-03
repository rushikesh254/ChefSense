const calculateExpiryStatus = (expiryDate) => {
  if (!expiryDate) {
    return "No Expiry";
  }

  const expiry = new Date(expiryDate); // Convert to Date object

  if (isNaN(expiry.getTime())) {
    return "No Expiry"; // If the date is invalid, treat it as no expiry
  }

  const today = new Date();

  today.setHours(0, 0, 0, 0); // Set time to the start of the day for accurate comparison
  expiry.setHours(0, 0, 0, 0); // Set time to the start of the day for accurate comparison

  const diff = expiry - today;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Calculate the number of days until expiry

  // console.log("days left", days)
  if (days < 0) return "expired";
  if (days <= 3) return "expiring soon";
  return "fresh";
};

export default calculateExpiryStatus;
