type EmTitleProps = {
  title: { before: string; em?: string; after?: string };
  /** Classes for the italic serif part. */
  emClassName?: string;
};

/** Renders a heading split into plain text with an optional italic serif `em` part. */
export function EmTitle({ title, emClassName = "font-serif font-normal tracking-[-0.01em]" }: EmTitleProps) {
  return (
    <>
      {title.before}
      {title.em ? <em className={emClassName}>{title.em}</em> : null}
      {title.after}
    </>
  );
}
