"use client";

import Image from "next/image";
import * as React from "react";
import { cn } from "@/lib/utils";
import { ImageOffIcon } from "@/components/ui/icons";

type Ratio = "video" | "standard" | "ten" | "portrait" | "wide" | "tall";

const ratioClass: Record<Ratio, string> = {
  video: "aspect-video", // 16:9
  standard: "aspect-[4/3]", // 4:3
  ten: "aspect-[16/10]", // 16:10
  portrait: "aspect-square", // 1:1
  wide: "aspect-[21/9]", // cinematic
  tall: "aspect-[3/4]", // portrait photography
};

const fitClass = {
  cover: "object-cover",
  contain: "object-contain",
} as const;

export interface ImageFrameProps {
  src: string;
  alt: string;
  /** Standardized aspect ratio. Ignored when `fill` is set. */
  ratio?: Ratio;
  fit?: keyof typeof fitClass;
  /** Focal point for object-cover imagery. */
  position?: React.CSSProperties["objectPosition"] | string;
  /** Subtle gradient overlay (Tailwind gradient classes). */
  overlay?: string;
  /** Children rendered as an absolute overlay (badges, labels). */
  children?: React.ReactNode;
  /** Zoom the image on hover (requires a `group` ancestor). */
  zoomOnHover?: boolean;
  /** Use absolute fill mode (parent controls dimensions). */
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imgClassName?: string;
}

export function ImageFrame({
  src,
  alt,
  ratio = "video",
  fit = "cover",
  position = "center",
  overlay,
  children,
  zoomOnHover = false,
  fill = false,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw",
  className,
  imgClassName,
}: ImageFrameProps) {
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  return (
    <div
      className={cn(
        "group/iframe relative overflow-hidden bg-subtle",
        !fill && ratioClass[ratio],
        fill && "absolute inset-0 h-full w-full",
        className
      )}
    >
      {!loaded && !error && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-subtle to-track"
        />
      )}

      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-subtle text-muted">
          <ImageOffIcon className="h-7 w-7 opacity-70" />
          <span className="text-xs font-medium">Image unavailable</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{ objectPosition: position }}
          className={cn(
            "h-full w-full transition-[transform,opacity] duration-500 ease-out",
            fitClass[fit],
            zoomOnHover &&
              "transition-transform duration-500 ease-out group-hover:scale-[1.04]",
            loaded ? "opacity-100" : "opacity-0",
            imgClassName
          )}
        />
      )}

      {overlay && (
        <div aria-hidden="true" className={cn("absolute inset-0", overlay)} />
      )}

      {children && (
        <div className="pointer-events-none absolute inset-0">{children}</div>
      )}
    </div>
  );
}
