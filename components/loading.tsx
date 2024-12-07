import { Loader } from "lucide-react";

const Loading = ({
  className,
  size = 24,
}: {
  className?: string;
  size?: number;
}) => {
  return (
    <div
      className={`${className} w-full h-full flex justify-center items-center`}
    >
      <Loader size={size} />
    </div>
  );
};

export default Loading;
