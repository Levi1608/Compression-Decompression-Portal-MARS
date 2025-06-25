import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';
import AlgorithmSelector from '../components/AlgorithmSelector';
import StatsDisplay from '../components/StatsDisplay';
import FileDownloader from '../components/FileDownloader';
import AlgorithmDescription from '../components/AlgorithmDescription';
import * as huffman from '../utils/huffman';
import * as rle from '../utils/rle';
import * as lz77 from '../utils/lz77';
import { Zap, FileText } from 'lucide-react';

const algorithms = { huffman, rle, lz77 };

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('huffman');
  const [stats, setStats] = useState(null);
  const [processedData, setProcessedData] = useState(null);
  const [isCompressed, setIsCompressed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDescription, setShowDescription] = useState(null);

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    setStats(null);
    setProcessedData(null);
  };

  const handleClearFile = () => {
    setUploadedFile(null);
    setStats(null);
    setProcessedData(null);
  };

  const processFile = async (compress) => {
    if (!uploadedFile) {
      alert('Please upload a file first.');
      return;
    }

    setIsProcessing(true);
    const startTime = Date.now();

    try {
      const arrayBuffer = await uploadedFile.arrayBuffer();
      const inputData = new Uint8Array(arrayBuffer);

      let result;
      if (compress) {
        result = algorithms[selectedAlgorithm].compress(inputData);
      } else {
        result = algorithms[selectedAlgorithm].decompress(inputData);
      }

      const timeTaken = Date.now() - startTime;
      const inputSize = inputData.length;
      const outputSize = result.length;

      setStats({
        inputSize,
        outputSize,
        compressionRatio: parseFloat(
          compress
            ? (inputSize / outputSize).toFixed(2)
            : (outputSize / inputSize).toFixed(2)
        ),
        timeTaken,
        algorithm: selectedAlgorithm.toUpperCase(),
        mode: compress ? 'compress' : 'decompress',
      });

      setProcessedData(result);
      setIsCompressed(compress);
      alert(`${compress ? 'Compression' : 'Decompression'} complete in ${timeTaken}ms!`);
    } catch (error) {
      console.error(error);
      alert('Processing failed. ' + (error.message || 'Unknown error.'));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-tr from-sky-50 to-indigo-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm hidden md:flex flex-col p-6">
        <div className="flex items-center space-x-2 mb-10">
          <Zap className="text-indigo-600 h-6 w-6" />
          <span className="text-xl font-bold text-indigo-700">Compressor</span>
        </div>
        <p className="text-sm text-gray-600">
          Upload your file, choose an algorithm, and compress or decompress it in one click.
        </p>
        <div className="mt-6 text-xs text-gray-400">
          Supported: .txt, .json, .png<br />
          Max size: 10MB
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 space-y-10">
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">📁 Upload & Process</h1>
          <p className="text-sm text-gray-500 mb-6">
            This tool supports Huffman, RLE, and LZ77 algorithms.
          </p>
          <FileUploader
            onFileUpload={handleFileUpload}
            uploadedFile={uploadedFile}
            onClearFile={handleClearFile}
          />

          {uploadedFile && (
            <>
              <div className="mt-8">
                <AlgorithmSelector
                  selectedAlgorithm={selectedAlgorithm}
                  onAlgorithmChange={setSelectedAlgorithm}
                  onShowDescription={setShowDescription}
                />
              </div>

              <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
                <button
                  onClick={() => processFile(true)}
                  disabled={isProcessing}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 flex items-center justify-center"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  {isProcessing ? 'Processing...' : 'Compress'}
                </button>

                <button
                  onClick={() => processFile(false)}
                  disabled={isProcessing}
                  className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition disabled:opacity-50 flex items-center justify-center"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  {isProcessing ? 'Processing...' : 'Decompress'}
                </button>
              </div>
            </>
          )}
        </div>

        {stats && <StatsDisplay stats={stats} />}

        {processedData && uploadedFile && (
          <FileDownloader
            data={processedData}
            originalFileName={uploadedFile.name}
            algorithm={selectedAlgorithm}
            isCompressed={isCompressed}
          />
        )}

        <AlgorithmDescription
          algorithm={showDescription}
          onClose={() => setShowDescription(null)}
        />
      </main>
    </div>
  );
};

export default Index;
