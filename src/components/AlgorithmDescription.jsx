import React from 'react';
import { X } from 'lucide-react';

const algorithmDetails = {
  huffman: {
    title: 'Huffman Coding',
    overview: 'Huffman coding is a lossless data compression algorithm that uses variable-length prefix codes based on the frequency of characters in the input.',
    howItWorks: [
      'Count the frequency of each character in the input',
      'Build a binary tree with characters as leaves, ordered by frequency',
      'Assign shorter codes to more frequent characters',
      'Replace each character with its corresponding code'
    ],
    advantages: [
      'Optimal for known character frequencies',
      'No information loss (lossless)',
      'Works well with text and structured data'
    ],
    disadvantages: [
      'Requires two passes through the data',
      'Overhead of storing the frequency table',
      'Not effective for random or already compressed data'
    ],
    complexity: 'Time: O(n log n), Space: O(n)'
  },
  rle: {
    title: 'Run-Length Encoding (RLE)',
    overview: 'RLE is a simple form of lossless data compression that replaces sequences of identical characters with a count followed by the character.',
    howItWorks: [
      'Scan the input data sequentially',
      'Count consecutive identical characters',
      'Replace runs with count + character pairs',
      'Single characters are represented as count of 1'
    ],
    advantages: [
      'Very simple to implement',
      'Fast compression and decompression',
      'Excellent for data with many repeated values',
      'Works well with simple graphics and images'
    ],
    disadvantages: [
      'Can increase size if data has few repetitions',
      'Not suitable for random data',
      'Limited compression ratio for complex data'
    ],
    complexity: 'Time: O(n), Space: O(1)'
  },
  lz77: {
    title: 'LZ77 (Lempel-Ziv 1977)',
    overview: 'LZ77 is a dictionary-based compression algorithm that uses a sliding window to find repeated sequences and replace them with references.',
    howItWorks: [
      'Maintain a sliding window of recent data',
      'Search for the longest match in the window',
      'Replace matches with (distance, length, next character) tuples',
      'Move the window forward and repeat'
    ],
    advantages: [
      'Good general-purpose compression',
      'Adapts to data patterns automatically',
      'Forms basis for many modern algorithms (deflate, gzip)',
      'Works well with various data types'
    ],
    disadvantages: [
      'More complex than simpler algorithms',
      'Compression ratio depends on window size',
      'Slower than RLE for simple patterns'
    ],
    complexity: 'Time: O(n²) naive, O(n log n) optimized, Space: O(window size)'
  }
};

const AlgorithmDescription = ({ algorithm, onClose }) => {
  if (!algorithm) return null;

  const details = algorithmDetails[algorithm];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto animate-scaleFade border border-white/10">
        <div className="flex items-center justify-between p-5 border-b border-white/20 bg-white/10 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">{details.title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-red-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-800" />
          </button>
        </div>

        <div className="p-6 space-y-8 text-gray-800">
          {/* Overview */}
          <section>
            <h3 className="text-lg font-semibold mb-2 text-blue-700">Overview</h3>
            <p className="text-gray-700">{details.overview}</p>
          </section>

          {/* How it works */}
          <section>
            <h3 className="text-lg font-semibold mb-4 text-indigo-700">How It Works</h3>
            <ol className="space-y-3">
              {details.howItWorks.map((step, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Advantages and Disadvantages */}
          <div className="grid md:grid-cols-2 gap-6">
            <section>
              <h3 className="text-lg font-semibold mb-3 text-green-600">Advantages</h3>
              <ul className="space-y-2">
                {details.advantages.map((item, index) => (
                  <li key={index} className="flex space-x-2">
                    <span className="text-green-600">✔</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3 text-red-500">Disadvantages</h3>
              <ul className="space-y-2">
                {details.disadvantages.map((item, index) => (
                  <li key={index} className="flex space-x-2">
                    <span className="text-red-500">✖</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Complexity */}
          <section className="bg-gray-100 rounded-lg p-4 shadow-inner border border-gray-200">
            <h3 className="text-lg font-semibold mb-2 text-purple-600">Complexity</h3>
            <p className="font-mono text-gray-800">{details.complexity}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmDescription;
