import type { SiteImage } from "@/content/site";

type PhotoProps = {
  image: SiteImage;
  /** Rendered size in CSS px at desktop; used to request right-sized files (1x + 2x). */
  width: number;
  height?: number;
  className?: string;
  priority?: boolean;
  /** Purely decorative images get an empty alt. */
  decorative?: boolean;
  /** Overrides the image's own crop hint (e.g. "faces" for avatars). */
  crop?: string;
};

const isUnsplash = (src: string) => src.startsWith("https://images.unsplash.com/");
const isImageKit = (src: string) => src.startsWith("https://ik.imagekit.io/");

/** ImageKit: exact-size crop focused on a face (avatars) or on the main subject (everything else). */
function sizedImageKit(image: SiteImage, width: number, height: number | undefined, scale: number, crop?: string) {
  const t = [`w-${Math.round(width * scale)}`, `q-${scale > 1 ? 70 : 80}`];
  if (height) t.push(`h-${Math.round(height * scale)}`, crop === "faces" ? "fo-face" : "fo-auto");
  return `${image.src}${image.src.includes("?") ? "&" : "?"}tr=${t.join(",")}`;
}

const keywords: Record<string, number> = { left: 0, top: 0, center: 0.5, right: 1, bottom: 1 };

/** "center 38%" → [0.5, 0.38]: lets the server-side crop honour the same focus as object-position. */
function focalPoint(position: string): [number, number] {
  const [x = "center", y = "center"] = position.trim().split(/\s+/);
  const parse = (v: string) => (v.endsWith("%") ? parseFloat(v) / 100 : (keywords[v] ?? 0.5));
  return [parse(x), parse(y)];
}

function sized(image: SiteImage, width: number, height: number | undefined, scale: number, crop?: string) {
  if (isImageKit(image.src)) return sizedImageKit(image, width, height, scale, crop);
  if (!isUnsplash(image.src)) return image.src;
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    q: scale > 1 ? "70" : "80",
    w: String(Math.round(width * scale)),
  });
  if (height) params.set("h", String(Math.round(height * scale)));
  if (crop) {
    params.set("crop", crop);
  } else if (height && image.position) {
    const [x, y] = focalPoint(image.position);
    params.set("crop", "focalpoint");
    params.set("fp-x", String(x));
    params.set("fp-y", String(y));
  }
  return `${image.src}?${params}`;
}

export function Photo({
  image,
  width,
  height,
  className = "",
  priority = false,
  decorative = false,
  crop = image.crop,
}: PhotoProps) {
  const src = sized(image, width, height, 1, crop);
  const resizable = isUnsplash(image.src) || isImageKit(image.src);
  const srcSet = resizable ? `${src} 1x, ${sized(image, width, height, 2, crop)} 2x` : undefined;

  return (
    <img
      src={src}
      srcSet={srcSet}
      alt={decorative ? "" : image.alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      draggable={false}
      className={`h-full w-full object-cover ${className}`}
      style={image.position ? { objectPosition: image.position } : undefined}
    />
  );
}
