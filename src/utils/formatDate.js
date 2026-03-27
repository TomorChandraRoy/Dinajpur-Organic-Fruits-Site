export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);

  // তারিখটি সঠিক কি না চেক করা (Safety check)
  if (isNaN(date.getTime())) return "Invalid Date";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};