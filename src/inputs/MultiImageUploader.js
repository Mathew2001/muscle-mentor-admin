import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  dataURLtoFile,
  MAX_UPLOAD_IMG_SIZE,
  resizeFile,
  UPLOAD_IMG_HEIGHT,
} from "../const";

const MultiImageUploader = ({ setImages, images }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;
  const upload_Preset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

  const checkImageSize = (file) => {
    if (file.width !== UPLOAD_IMG_HEIGHT || file.height !== UPLOAD_IMG_HEIGHT) {
      return {
        code: "Image size is not correct",
        message: `גודל התמונה חייב להיות ${UPLOAD_IMG_HEIGHT} x ${UPLOAD_IMG_HEIGHT}`,
      };
    }
    return null;
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    multiple: true,
    maxSize: MAX_UPLOAD_IMG_SIZE,
    getFilesFromEvent: async (event) => {
      const files = event.target.files || event.dataTransfer.files;
      const promises = [];
      for (const file of files) {
        const image = await resizeFile(file);
        promises.push(
          new Promise((resolve) => {
            resolve(Object.assign(file, {
              width: UPLOAD_IMG_HEIGHT,
              height: UPLOAD_IMG_HEIGHT,
              data: image
            }));
          })
        );
      }
      return Promise.all(promises);
    },
    onDrop: (acceptedFiles, fileRejections) => {
      fileRejections.forEach(({ errors }) => {
        if (errors.length > 0) {
          console.log(errors[0].message);
        }
      });
      
      setFiles(prevFiles => [...prevFiles, ...acceptedFiles.map(file => 
        Object.assign(file, {
          preview: file.data
        })
      )]);
    },
    validator: checkImageSize,
  });

  useEffect(() => {
    if (!files.length) return;

    setLoading(true);
    const uploadImages = async () => {
      const dataImageUrls = [];
      
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", dataURLtoFile(file.data, file.name));
        formData.append("upload_preset", upload_Preset);
        
        try {
          const res = await axios.post(uploadUrl, formData);
          dataImageUrls.push(res.data.secure_url);
        } catch (err) {
          console.error("Upload error:", err);
        }
      }

      setImages(prevImages => [...prevImages, ...dataImageUrls]);
      setFiles([]);
      setLoading(false);
    };

    uploadImages();
  }, [files, uploadUrl, upload_Preset, setImages]);

  const removeImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className="w-100 text-end">
      <label className="d-block fs-6 fw-medium text-secondary mb-2">
        תמונות מוצר
      </label>

      <div className="position-relative">
        <div
          {...getRootProps()}
          className={`position-relative border border-2 border-dashed rounded-3 p-4 ${
            isDragActive ? 'bg-light' : 'bg-white'
          } cursor-pointer`}
          style={{
            borderColor: isDragActive ? '#8CAD23' : '#AED135',
            transition: 'all 300ms'
          }}
        >
          <input {...getInputProps()} />

          <div className="text-center">
            <PhotoIcon
              className={`mx-auto h-5 w-5 ${
                isDragActive ? 'text-success' : 'text-primary'
              }`}
              style={{
                height: '3rem',
                width: '3rem',
                transition: 'colors 300ms'
              }}
              aria-hidden="true"
            />

            <div className="mt-3">
              {isDragActive ? (
                <p className="fs-5 fw-medium text-success">
                  שחרר את התמונות כאן
                </p>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-primary d-inline-flex align-items-center"
                    style={{backgroundColor: '#AED135', border: 'none'}}
                  >
                    בחר תמונות
                  </button>
                  <p className="mt-2 text-muted fs-6">
                    או גרור ושחרר תמונות לכאן
                  </p>
                </>
              )}
            </div>

            <p className="mt-1 text-muted small">PNG, JPG, GIF עד 10MB</p>
          </div>
        </div>

        {loading && (
          <div className="mt-3 text-center">
            <div className="progress" style={{height: '0.625rem'}}>
              <div 
                className="progress-bar progress-bar-striped progress-bar-animated" 
                role="progressbar" 
                style={{width: '50%', backgroundColor: '#AED135'}}
              />
            </div>
            <p className="mt-2 text-muted fs-6">מעלה תמונות...</p>
          </div>
        )}

        {images.length > 0 && (
          <div className="mt-4 row row-cols-3 g-3">
            {images.map((image, index) => (
              <div key={index} className="col position-relative">
                <img
                  src={image}
                  alt={`תמונה ${index + 1}`}
                  className="img-fluid rounded shadow-sm"
                  style={{height: '10rem', objectFit: 'cover'}}
                />
                <button
                  onClick={() => removeImage(index)}
                  className="btn btn-danger btn-sm position-absolute rounded-circle opacity-0 hover-opacity-100"
                  style={{
                    top: '0.5rem',
                    left: '0.5rem',
                    transition: 'opacity 200ms'
                  }}
                >
                  <XMarkIcon style={{height: '1rem', width: '1rem'}} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiImageUploader;
