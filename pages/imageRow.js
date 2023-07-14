import Image from 'next/image';

const ImageRow = ({ imageUrls }) => {
    return (
        <div className="flex gap-4 justify-between flex-wrap">
        <div className="">
            <Image src={imageUrls[0]} width={400} height={300} alt="Image 1" />
        </div>
        <div className="">
            <Image src={imageUrls[1]} width={400} height={300} alt="Image 2" />
        </div>
        <div className="">
            <Image src={imageUrls[2]} width={400} height={300} alt="Image 3" />
        </div>
        </div>
    );
};

export default ImageRow;