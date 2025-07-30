// src/components/user/ProfileImageCropperModal.jsx
'use client';

import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '@/lib/utils/cropImage'; 

// Helper untuk mengubah Slider React Native menjadi input type range HTML
const SliderComponent = ({ value, min, max, step, onValueChange }) => (
  <input
    type="range"
    min={min}
    max={max}
    step={step}
    value={value}
    onChange={(e) => onValueChange(parseFloat(e.target.value))}
    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
  />
);


export default function ProfileImageCropperModal({ imageSrc, onCropComplete, onClose }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);

  const onCropChange = useCallback((crop) => {
    setCrop(crop);
  }, []);

  const onZoomChange = useCallback((zoom) => {
    setZoom(zoom);
  }, []);

  const onRotationChange = useCallback((rotation) => {
    setRotation(rotation);
  }, []);

  const onCropCompleteCallback = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    setLoading(true);
    try {
      const croppedImageBlob = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      onCropComplete(croppedImageBlob); 
    } catch (e) {
      console.error(e);
      alert('Failed to crop image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Crop Profile Image</h2>

        <div className="relative w-full h-80 bg-gray-200 dark:bg-gray-700 mb-4">
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={1} 
              onCropChange={onCropChange}
              onZoomChange={onZoomChange}
              onRotationChange={onRotationChange}
              onCropComplete={onCropCompleteCallback}
              showGrid={true}
              cropShape="round" 
            />
          )}
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">Zoom:</label>
            <SliderComponent
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onValueChange={onZoomChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">Rotation:</label>
            <SliderComponent
              value={rotation}
              min={0}
              max={360}
              step={1}
              onValueChange={onRotationChange}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCrop}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Cropping...' : 'Crop & Upload'}
          </button>
        </div>
      </div>
    </div>
  );
}