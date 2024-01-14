import { Hourglass } from "react-loader-spinner";

interface LoaderProps {
  color?: string;
  height?: number;
  width?: number;
  isFullPage?: boolean;
}

const Loader = ({ color, height, width, isFullPage }: LoaderProps) => {
  return (
    <div
      className={`flex justify-center items-center ${
        isFullPage && "h-screen"
      } `}
    >
      <Hourglass
        visible={true}
        height={height || 50}
        width={width || 50}
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={[color || "#306cce", color || "#72a1ed"]}
      />
    </div>
  );
};

export default Loader;
