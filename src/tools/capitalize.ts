export function capitalize(string) {
  if (string) {
    return string.replace(/\w\S*/g, w =>
      w.replace(/^\w/, c => c.toUpperCase())
    );
  }
}
