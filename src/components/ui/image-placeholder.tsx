import Image from "next/image";

interface Props {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function ImagePlaceholder({
  src,
  alt = "Image placeholder",
  width = 300,
  height = 300,
  className = "",
  onMouseEnter,
  onMouseLeave,
}: Props) {
  const localSrc = src
    ? src.startsWith("https")
      ? src
      : `/products/${src}`
    : "/placeholder.jpg";

  return (
    <Image
      src={localSrc}
      alt={alt}
      width={width}
      height={height}
      className={`object-cover ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
}
