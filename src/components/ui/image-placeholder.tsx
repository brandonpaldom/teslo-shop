import Image from 'next/image';

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
  alt = 'Image placeholder',
  width = 300,
  height = 300,
  className = '',
  onMouseEnter,
  onMouseLeave,
}: Props) {
  let localSrc = '/placeholder.jpg';
  if (src) {
    if (src.startsWith('https')) {
      localSrc = src;
    } else {
      localSrc = `/products/${src}`;
    }
  }

  return (
    <Image
      alt={alt}
      className={`object-cover ${className}`}
      height={height}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      src={localSrc}
      width={width}
    />
  );
}
