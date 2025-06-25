#  Compressor - File Compression & Decompression Web App

**Compressor** is a browser-based tool that lets users upload, compress, and decompress files using algorithms like **Huffman Coding**, **Run-Length Encoding (RLE)**, and **LZ77**. It also shows how effective each algorithm is — visually and statistically.


##  Features (Explained)

###  File Upload
Upload any file (text, image, or binary) directly from your device. Supported formats include `.txt`, `.json`, `.png`, etc. (max 10MB).

###  Algorithm Selection
Choose between Huffman Coding, Run-Length Encoding (RLE), or LZ77 before starting the compression or decompression process.

###  Compression
Click **"Compress"** to apply the selected algorithm on the uploaded file and reduce its size in-browser — no backend required.

###  Decompression
Click **"Decompress"** to revert a previously compressed file back to its original form using the same algorithm.

### Compression Statistics
Get real-time data including:
- Original file size
- Compressed/decompressed size
- Compression ratio (e.g. 2.5x smaller)
- Time taken for the operation (in ms)

### Download Processed Files
After processing, download the resulting file (compressed or decompressed) instantly with a new meaningful filename.

###  Algorithm Descriptions
Click a button to learn how each compression algorithm works, with simple, easy-to-understand explanations.

### Error Handling
Smart error alerts if you:
- Upload unsupported file types
- Try to decompress invalid data
- Select an algorithm incorrectly

### Fully Client-Side
The entire app runs in your browser using **JavaScript + FileReader API** — no server needed for compression or decompression.

### Responsive Design
Built with Tailwind CSS for a clean, mobile-friendly interface that works on desktops, tablets, and smartphones.

---

##  Tech Stack

###  Frontend
- **React.js** – For dynamic UI and state management
- **Tailwind CSS** – For responsive and utility-first design
- **Lucide Icons** – For clean, modern iconography

### Compression Algorithms
- **Huffman Coding** – A tree-based entropy encoder
- **Run-Length Encoding (RLE)** – Great for repetitive data
- **LZ77** – A sliding window-based lossless algorithm

---

## Getting Started Locally

1. **Clone the repo**
```bash
git clone https://github.com/Levi1608/(https://github.com/Levi1608/Compression-Decompression-Portal-MARS)
cd Compression-Decompression-Portal-MARS
npm install
npm run dev

src/
├── components/              → UI components (Uploader, Downloader, Stats, etc.)
├── pages/                   → Main Index.jsx (homepage logic)
├── utils/                   → Algorithm implementations (huffman.js, rle.js, lz77.js)
├── App.jsx / main.jsx       → Entry files
