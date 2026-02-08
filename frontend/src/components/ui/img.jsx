import { cn } from "@/lib/utils";

export function Img({
  src,
  alt,
  className,
  fill = false,
  width,
  height,
  priority = false,
  ...props
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      loading={priority ? "eager" : "lazy"}
      className={cn(
        fill && "absolute inset-0 w-full h-full",
        className
      )}
      {...props}
    />
  );
}
