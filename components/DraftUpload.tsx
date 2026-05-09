'use client';

import { useState } from 'react';
import { Upload, FileText, Download } from 'lucide-react';

export default function DraftUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [documentPath, setDocumentPath] = useState<string>('');
  const [documentId, setDocumentId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type.includes('document')) {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile?.type.includes('document')) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsLoading(true);
    // Simulated upload - replace with actual API call
    setTimeout(() => {
      setExtractedText(
        'This is sample extracted text from your document. In production, this would contain the actual text extracted from your uploaded DOCX file.'
      );
      setDocumentPath(`drafts/user123/${Math.random().toString(36).substr(2, 9)}-${file.name}`);
      setDocumentId(Math.random().toString(36).substr(2, 9));
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        onDrop={handleFileDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-indigo-500 transition cursor-pointer bg-gray-50 hover:bg-indigo-50"
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-900 font-semibold mb-2">
          Drag and drop your DOCX file here
        </p>
        <p className="text-gray-500 text-sm mb-4">
          or click to browse from your computer
        </p>
        <input
          type="file"
          accept=".docx"
          onChange={handleFileSelect}
          className="hidden"
          id="draft-file-input"
        />
        <label
          htmlFor="draft-file-input"
          className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
        >
          Select File
        </label>
      </div>

      {/* Selected File */}
      {file && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-blue-600" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">{file.name}</p>
              <p className="text-sm text-gray-600">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Upload Button */}
      {file && !extractedText && (
        <button
          onClick={handleUpload}
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Uploading...' : 'Upload & Extract'}
        </button>
      )}

      {/* Extracted Content */}
      {extractedText && (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-green-800 mb-2">
              ✓ Document uploaded successfully
            </p>
            <p className="text-sm text-gray-600">
              Document ID: <code className="bg-white px-2 py-1 rounded">{documentId}</code>
            </p>
            <p className="text-sm text-gray-600">
              Path: <code className="bg-white px-2 py-1 rounded text-xs">{documentPath}</code>
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Extracted Text</h4>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto">
              <p className="text-gray-700 text-sm">{extractedText}</p>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition font-medium">
            <Download className="w-4 h-4" />
            Export as Text
          </button>

          <button
            onClick={() => {
              setFile(null);
              setExtractedText('');
              setDocumentPath('');
              setDocumentId('');
            }}
            className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            Upload Another File
          </button>
        </div>
      )}
    </div>
  );
}
