import Image from 'next/image';

const MiniLoader = () => {
  return (
    <div className="flex-center">
      <Image
        src="/icons/loading-circle.svg"
        alt="Loading..."
        width={50}
        height={50}
      />
    </div>
  );
};

export default MiniLoader;
