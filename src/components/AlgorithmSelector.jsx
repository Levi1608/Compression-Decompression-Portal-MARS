import React from 'react';
import { Info } from 'lucide-react';

const algorithms = [
  {
    id: 'huffman',
    name: 'Huffman Coding',
    description: 'Variable-length prefix coding based on character frequency',
    bestFor: 'Text files, structured data'
  },
  {
    id: 'rle',
    name: 'Run-Length Encoding',
    description: 'Replaces consecutive identical characters with count + character',
    bestFor: 'Images with large uniform areas, simple graphics'
  },
  {
    id: 'lz77',
    name: 'LZ77',
    description: 'Dictionary-based compression using sliding window',
    bestFor: 'General purpose, mixed content types'
  }
];

const AlgorithmSelector = ({
  selectedAlgorithm,
  onAlgorithmChange,
  onShowDescription
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-12 px-4">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">Select a Compression Algorithm</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {algorithms.map((algorithm) => {
          const isSelected = selectedAlgorithm === algorithm.id;

          return (
            <div
              key={algorithm.id}
              onClick={() => onAlgorithmChange(algorithm.id)}
              className={`relative rounded-2xl p-6 cursor-pointer transition-all border shadow-lg backdrop-blur-md bg-white/80 hover:shadow-2xl hover:border-blue-400 group ${
                isSelected ? 'ring-2 ring-blue-600 border-blue-500' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  checked={isSelected}
                  onChange={() => onAlgorithmChange(algorithm.id)}
                  className="mt-1 accent-blue-600"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{algorithm.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{algorithm.description}</p>
                  <p className="text-xs text-blue-700 mt-2 font-medium">
                    Best for: {algorithm.bestFor}
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShowDescription(algorithm.id);
                }}
                className="absolute top-3 right-3 p-2 rounded-full hover:bg-blue-100 transition-colors"
                title="View details"
              >
                <Info className="h-4 w-4 text-blue-600" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlgorithmSelector;
