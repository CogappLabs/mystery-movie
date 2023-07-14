import Image from 'next/image';

const ImageRow = ({ imageUrls }) => {
    if (!imageUrls) {
        console.log('Problem with images');
        
        return (
            <div className="flex gap-4 justify-between flex-wrap">
            <div className="">
                <Image src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" width={400} height={300} alt="Image 1" />
            </div>
            <div className="">
                <Image src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" width={400} height={300} alt="Image 2" />
            </div>
            <div className="">
                <Image src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" width={400} height={300} alt="Image 3" />
            </div>
            </div>
        );
    }

    return (
        <div className="flex gap-4 justify-between flex-wrap">
        <div className="">
            {imageUrls[0] && <Image src={imageUrls[0]} width={400} height={300} alt="Image 1" />}
        </div>
        <div className="">
            {imageUrls[1] && <Image src={imageUrls[1]} width={400} height={300} alt="Image 2" />}
        </div>
        <div className="">
            {imageUrls[2] && <Image src={imageUrls[2]} width={400} height={300} alt="Image 3" />}
        </div>
        </div>
    );
};

export default ImageRow;