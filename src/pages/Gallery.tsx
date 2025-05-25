import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Import all images from the Gallery folder
import p1 from '../assets/Gallery/p1.png';
import p2 from '../assets/Gallery/p2.png';
import p3 from '../assets/Gallery/p3.png';
import p4 from '../assets/Gallery/p4.png';
import p5 from '../assets/Gallery/p5.png';
import L1 from '../assets/Gallery/L1.png';

// Define initial image orientation 
// We'll determine actual orientation on image load
const galleryImages = [
  { id: 1, src: p1, alt: 'NexHub Event 1', orientation: 'landscape' },
  { id: 2, src: p2, alt: 'NexHub Event 2', orientation: 'landscape' },
  { id: 3, src: p3, alt: 'NexHub Event 3', orientation: 'landscape' },
  { id: 4, src: p4, alt: 'NexHub Event 4', orientation: 'landscape' },
  { id: 5, src: p5, alt: 'NexHub Event 5', orientation: 'landscape' },
  { id: 6, src: L1, alt: 'NexHub Community Gathering', orientation: 'landscape' },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<null | string>(null);
  const [images, setImages] = useState(galleryImages);

  // Function to detect image orientation
  const getImageOrientation = (imgSrc: string, id: number) => {
    const img = new Image();
    img.onload = () => {
      // Check if image is portrait or landscape based on aspect ratio
      const isPortrait = img.height > img.width;
      
      setImages(currentImages => 
        currentImages.map(image => 
          image.id === id ? { 
            ...image, 
            orientation: isPortrait ? 'portrait' : 'landscape',
            aspectRatio: img.width / img.height
          } : image
        )
      );
    };
    img.src = imgSrc;
  };

  // Detect orientation for all images on component mount
  useEffect(() => {
    galleryImages.forEach(img => {
      getImageOrientation(img.src, img.id);
    });
  }, []);

  return (
    <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our <span className="text-primary dark:text-primary-light">Gallery</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Glimpses of our vibrant community events, workshops, and hackathons where developers connect, learn, and grow together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {images.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: image.id * 0.1 }}
              className={`
                overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300
                ${image.orientation === 'portrait' ? 'row-span-2' : ''}
              `}
              style={image.aspectRatio ? { aspectRatio: image.aspectRatio } : {}}
            >
              <div 
                className="relative w-full h-full cursor-pointer"
                onClick={() => setSelectedImage(image.src)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-6xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="max-h-[85vh] max-w-full object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Gallery; 