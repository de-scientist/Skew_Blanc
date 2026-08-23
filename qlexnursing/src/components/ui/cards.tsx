import * as React from "react";
import Link from "next/link";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { StarIcon, ArrowRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { accentStyles, type Accent } from "@/lib/accents";

/* ----------------------------------------------------------------
   GlassCard — translucent, blurred surface for overlays & floating
   panels. Keeps content readable above imagery.
----------------------------------------------------------------- */
export function GlassCard({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card
      className={cn(
        "glass border-transparent shadow-card-hover",
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
}

/* ----------------------------------------------------------------
   FeatureCard — icon + title + description. The workhorse for
   "why us", process steps and capability grids.
----------------------------------------------------------------- */
export function FeatureCard({
  icon,
  title,
  description,
  accent,
  className,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  accent?: Accent;
  className?: string;
}) {
  const iconWrap = accent
    ? cn(accentStyles[accent].soft, accentStyles[accent].text)
    : "bg-gradient-to-br from-brand-600 to-brand-800 text-white";
  return (
    <Card className={cn("h-full", className)}>
      <CardContent>
        {icon && (
          <span
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl",
              iconWrap
            )}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-muted">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

/* ----------------------------------------------------------------
   ImageCard — image media (top, flush) + title + description + CTA.
   Used for services, exams, resources and blog where appropriate.
----------------------------------------------------------------- */
export function ImageCard({
  href,
  image,
  alt,
  ratio = "video",
  fit = "cover",
  position,
  overlay,
  badge,
  eyebrow,
  title,
  description,
  footer,
  priority,
  sizes,
  className,
  zoom = true,
}: {
  href?: string;
  image: string;
  alt: string;
  ratio?: "video" | "standard" | "ten" | "portrait" | "wide" | "tall";
  fit?: "cover" | "contain";
  position?: string;
  overlay?: string;
  badge?: React.ReactNode;
  eyebrow?: string;
  title: string;
  description?: string;
  footer?: React.ReactNode;
  priority?: boolean;
  sizes?: string;
  className?: string;
  zoom?: boolean;
}) {
  const Inner = (
    <Card className={cn("group h-full overflow-hidden", className)}>
      <ImageFrame
        src={image}
        alt={alt}
        ratio={ratio}
        fit={fit}
        position={position}
        overlay={overlay}
        zoomOnHover={zoom}
        priority={priority}
        sizes={sizes}
      >
        {badge && (
          <div className="pointer-events-auto absolute left-3 top-3">
            {badge}
          </div>
        )}
      </ImageFrame>
      <CardContent>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-wide text-accent-700 dark:text-accent-300">
            {eyebrow}
          </p>
        )}
        <CardTitle className="mt-1 text-lg">{title}</CardTitle>
        {description && (
          <CardDescription className="mt-1.5">{description}</CardDescription>
        )}
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="block focus-visible:outline-none">
        {Inner}
      </Link>
    );
  }
  return Inner;
}

/* ----------------------------------------------------------------
   BlogCard — consistent 16:9 imagery + category + meta + CTA.
----------------------------------------------------------------- */
export function BlogCard({
  href,
  image,
  alt,
  category,
  title,
  excerpt,
  author,
  date,
  readingMinutes,
  priority,
  className,
}: {
  href: string;
  image: string;
  alt: string;
  category: string;
  title: string;
  excerpt?: string;
  author?: string;
  date?: string;
  readingMinutes?: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("group block h-full", className)}>
      <Card className="h-full overflow-hidden">
        <ImageFrame
          src={image}
          alt={alt}
          ratio="video"
          zoomOnHover
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <CardContent className="flex flex-1 flex-col">
          <div className="flex items-center gap-2">
            <Badge tone="brand">{category}</Badge>
            {readingMinutes != null && (
              <span className="text-xs text-muted">{readingMinutes} min read</span>
            )}
          </div>
          <h3 className="mt-3 text-base font-semibold text-ink group-hover:text-brand-700 dark:group-hover:text-brand-300">
            {title}
          </h3>
          {excerpt && (
            <p className="mt-1.5 line-clamp-2 text-sm text-muted">{excerpt}</p>
          )}
          <div className="mt-4 flex items-center gap-2 text-xs text-muted">
            {author && <span className="font-medium text-ink/80">{author}</span>}
            {date && <span>· {date}</span>}
            <span className="ml-auto inline-flex items-center gap-1 font-semibold text-brand-700 dark:text-brand-300">
              Read
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

/* ----------------------------------------------------------------
   ResourceCard — type badge + count + description, text-forward.
----------------------------------------------------------------- */
export function ResourceCard({
  href,
  type,
  title,
  description,
  count,
  icon,
  className,
}: {
  href: string;
  type: string;
  title: string;
  description?: string;
  count?: number | string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("group block h-full", className)}>
      <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-card-hover">
        <CardContent className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-3">
            <Badge tone="brand">{type}</Badge>
            {icon && (
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
                {icon}
              </span>
            )}
          </div>
          <h3 className="mt-3 text-base font-semibold text-ink group-hover:text-brand-700 dark:group-hover:text-brand-300">
            {title}
          </h3>
          {description && (
            <p className="mt-1 text-sm text-muted">{description}</p>
          )}
          <div className="mt-4 flex items-center justify-between pt-1">
            {count != null && (
              <span className="text-xs font-medium text-muted">
                {count} {typeof count === "number" ? "items" : ""}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 dark:text-brand-300">
              Open
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

/* ----------------------------------------------------------------
   Rating — accessible star rating for testimonials.
----------------------------------------------------------------- */
export function Rating({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div
      className="flex items-center gap-0.5 text-warning-500"
      role="img"
      aria-label={`Rated ${value} out of ${max}`}
    >
      {Array.from({ length: max }).map((_, i) => (
        <StarIcon
          key={i}
          className={cn("h-4 w-4", i < value ? "fill-warning-500" : "text-line")}
        />
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------
   TestimonialCard — quote, avatar, author, rating. Glass or solid.
----------------------------------------------------------------- */
export function TestimonialCard({
  quote,
  name,
  role,
  program,
  rating,
  initials,
  verified,
  glass = false,
  className,
}: {
  quote: string;
  name: string;
  role?: string;
  program?: string;
  rating?: number;
  initials: string;
  verified?: boolean;
  glass?: boolean;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "h-full p-8",
        glass && "glass border-transparent shadow-card-hover",
        className
      )}
    >
      {rating != null && <Rating value={rating} />}
      <p className="mt-4 text-balance text-lg leading-relaxed text-ink">
        “{quote}”
      </p>
      <div className="mt-6 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
          {initials}
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">{name}</p>
          {(role || program) && (
            <p className="text-xs text-muted">
              {[role, program].filter(Boolean).join(" · ")}
              {verified && <span className="ml-1 text-success-600">· Verified</span>}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}

/* ----------------------------------------------------------------
   PortfolioCard — strong visual showcase for deployed websites.
----------------------------------------------------------------- */
export function PortfolioCard({
  href,
  image,
  alt,
  name,
  description,
  tech,
  status,
  className,
}: {
  href: string;
  image: string;
  alt: string;
  name: string;
  description?: string;
  tech?: string[];
  status?: string;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("group block h-full", className)}>
      <Card className="h-full overflow-hidden">
        <ImageFrame
          src={image}
          alt={alt}
          ratio="video"
          zoomOnHover
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <CardContent>
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-ink group-hover:text-brand-700 dark:group-hover:text-brand-300">
              {name}
            </h3>
            {status && <Badge tone="success">{status}</Badge>}
          </div>
          {description && (
            <p className="mt-1.5 text-sm text-muted">{description}</p>
          )}
          {tech && tech.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {tech.map((t) => (
                <Badge key={t} tone="neutral">
                  {t}
                </Badge>
              ))}
            </div>
          )}
          <div className="mt-4">
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 dark:text-brand-300">
              View project
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
