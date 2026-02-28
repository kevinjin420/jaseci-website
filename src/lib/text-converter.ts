export function slugify(content: string | null | undefined): string {
  if (!content) return "";
  return content
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function humanize(content: string | null | undefined): string {
  if (!content) return "";
  return content
    .replace(/^[\s_]+|[\s_]+$/g, "")
    .replace(/[_\s]+/g, " ")
    .replace(/^[a-z]/, (m) => m.toUpperCase());
}

export function plainify(content: string | null | undefined): string {
  if (!content) return "";
  const stripped = String(content)
    .replace(/<\/?[^>]+(>|$)/gm, "")
    .replace(/[\r\n]\s*[\r\n]/gm, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  return stripped;
}
