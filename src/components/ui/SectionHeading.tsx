interface SectionHeadingProps {
  whiteHeading?: string;
  colorHeading?: string;
  bgHeading: string;
}

const SectionHeading = ({
  whiteHeading,
  colorHeading,
  bgHeading,
}: SectionHeadingProps) => {
  return (
    <div className="relative text-center md:text-left">
      <h2
        className={`text-2xl lg:text-5xl font-bold leading-tight mb-6 text-center z-20 w-full h-full flex items-center gap-3 drop-shadow-2xl`}
      >
        {whiteHeading}{" "}
        <span className="text-indigo-300">{colorHeading}</span>
      </h2>
      <h2
        className={`text-indigo-200/10 text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 absolute top-0 left-0 h-full flex items-center justify-center `}
      >
        {bgHeading}
      </h2>
    </div>
  );
};

export default SectionHeading;
