import React from 'react';
import { Download } from 'lucide-react';

const FileDownloader = ({ 
  data, 
  originalFileName, 
  algorithm, 
  isCompressed 
}) => {
  const handleDownload = () => {
    if (!data) return;

    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    const extension = isCompressed ? `.${algorithm}` : '';
    const prefix = isCompressed ? '' : 'decompressed_';
    const fileName = `${prefix}${originalFileName}${extension}`;

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!data) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 px-4">
      <div className="bg-gradient-to-tr from-blue-950/70 to-blue-800/70 backdrop-blur-md shadow-xl border border-white/10 rounded-2xl p-8 transition-all">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
              {isCompressed ? 'Compressed' : 'Decompressed'} File Ready
            </h3>
            <p className="text-gray-300 text-sm">
              Your file has been <span className="font-medium">{isCompressed ? 'compressed' : 'decompressed'}</span> using <span className="font-semibold text-blue-300">{algorithm.toUpperCase()}</span>
            </p>
          </div>

          <button
            onClick={handleDownload}
            className="relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/40"
          >
            <Download className="w-5 h-5" />
            <span>Download</span>
            <span className="absolute inset-0 rounded-xl border border-white/10 pointer-events-none"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileDownloader;
