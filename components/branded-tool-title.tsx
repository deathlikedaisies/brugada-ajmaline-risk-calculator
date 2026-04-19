type BrandedToolTitleProps = {
  className?: string;
};

export function BrandedToolTitle({ className = "" }: BrandedToolTitleProps) {
  return (
    <span className={className}>
      Type 1{" "}
      <span className="inline-block whitespace-nowrap">
        <strong className="accent-letter">B</strong>rugada
      </span>{" "}
      <span className="inline-block whitespace-nowrap">
        <strong className="accent-letter">A</strong>jmaline
      </span>{" "}
      <span className="inline-block whitespace-nowrap">
        <strong className="accent-letter">R</strong>esponse
      </span>{" "}
      <span className="inline-block whitespace-nowrap">
        <strong className="accent-letter">C</strong>alculator
      </span>{" "}
      <span className="text-[#8f3f3f]">(BARC)</span>
    </span>
  );
}
