import React, { useCallback, useState } from 'react';
import { Upload, File, X } from 'lucide-react';

const FileUploader = ({ onFileUpload, uploadedFile, onClearFile }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileUpload(files[0]);
    }
  }, [onFileUpload]);

  const handleFileSelect = useCallback((e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  }, [onFileUpload]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 px-4">
      {!uploadedFile ? (
        <div
          className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 cursor-pointer 
            ${
              isDragOver
                ? 'border-blue-500 bg-blue-900/20 shadow-xl scale-105'
                : 'border-gray-500 hover:border-blue-400 hover:bg-blue-800/10'
            } backdrop-blur-md`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <div className="transition-transform duration-300 group-hover:-translate-y-2">
            <Upload className="mx-auto h-14 w-14 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Upload File</h3>
            <p className="text-gray-300 mb-2">
              Drag & drop a file here or click to browse.
            </p>
            <p className="text-sm text-gray-400">
              Supports all file types • Max 10MB
            </p>
          </div>
          <input
            id="file-input"
            type="file"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>
      ) : (
        <div className="bg-gradient-to-br from-blue-800/30 to-blue-900/40 backdrop-blur-lg border border-white/10 shadow-lg rounded-2xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <File className="h-10 w-10 text-blue-300" />
              <div>
                <h4 className="text-lg font-semibold">{uploadedFile.name}</h4>
                <p className="text-sm text-gray-300">
                  {formatFileSize(uploadedFile.size)} • {uploadedFile.type || 'Unknown'}
                </p>
              </div>
            </div>
            <button
              onClick={onClearFile}
              className="text-red-400 hover:text-red-600 p-2 rounded-full transition-colors hover:bg-red-500/10"
              title="Remove file"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
