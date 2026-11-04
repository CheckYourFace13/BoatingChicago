/**
 * Deprecated no-op. The AdSense script loads from AdSenseBlock only when a
 * display unit mounts, so 404/error and form-only pages never request it.
 */
export function AdSenseLoader() {
  return null;
}
