export function parseBrDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const [datePart, timePart] = dateStr.split(' ');
  const [day, month, year] = datePart.split('/').map(Number);
  if (!day || !month || !year) return null;
  if (timePart) {
    const [hour, minute, second] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hour, minute, second);
  }
  return new Date(year, month - 1, day);
}
