export function formatLastActivity(updatedAt: string) {
  const now = new Date();
  const updated = new Date(updatedAt);
  const diffMs = now.getTime() - updated.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days >= 7) {
    const yyyy = updated.getFullYear();
    const mm = String(updated.getMonth() + 1).padStart(2, "0");
    const dd = String(updated.getDate()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd}`;
  }

  if (hours < 1) return "less than an hour ago";
  if (hours === 1) return "1 hour ago";
  if (hours < 24) return `${hours} hours ago`;
  return `${days} days ago`;
}
