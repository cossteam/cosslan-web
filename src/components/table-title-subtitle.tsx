interface TableTitleSubtitleProps {
  title?: string;
  subtitle?: string;
}

export function TableTitleSubtitle({title, subtitle}: TableTitleSubtitleProps) {
  if (!title && subtitle) {
    title = subtitle
    subtitle = undefined
  }
  return (
    <div className="grid gap-1">
      {title && (
        <p className="text-sm font-medium leading-none">
          {title}
        </p>
      )}
      {subtitle && (
        <p className="text-sm text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  )
}
