// Keep the full route in the source data; shorten only repeated return stops in UI.
export function formatRouteLabel(name: string): string {
  const stops = name.split("–");
  return stops.length > 2 && stops[0].trim() === stops[stops.length - 1].trim()
    ? stops.slice(0, -1).join("–")
    : name;
}
