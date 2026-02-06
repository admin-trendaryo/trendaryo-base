import React, { useState } from 'react';
import MagneticButton from '../components/MagneticButton';

interface BulkUploadProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function BulkUpload({ onClose, onSuccess }: BulkUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
    } else {
      alert('Please select a CSV file');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/admin/products/bulk-upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: formData
      });

      const result = await response.json();
      setResults(result);
      
      if (result.success) {
        onSuccess();
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = () => {
    const csvContent = `name,price,category,tags,image,stock,status,description
iPhone 15 Pro,999,Smartphones,"trending,premium",https://example.com/iphone.jpg,50,active,Latest iPhone model
Fitness Tracker,199,Wellness,"health,fitness",https://example.com/tracker.jpg,100,active,Advanced fitness tracking`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product-template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Bulk Upload Products</h2>
        
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Instructions:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Upload a CSV file with product data</li>
              <li>• Required columns: name, price, category, image, stock</li>
              <li>• Optional columns: tags, status, description</li>
              <li>• Tags should be comma-separated within quotes</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <MagneticButton
              onClick={downloadTemplate}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Download Template
            </MagneticButton>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Select CSV File</label>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {file && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-800">Selected: {file.name}</p>
            </div>
          )}

          {results && (
            <div className={`border rounded-lg p-4 ${
              results.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}>
              <h3 className="font-semibold mb-2">Upload Results:</h3>
              <p>Processed: {results.processed || 0} products</p>
              <p>Success: {results.success_count || 0}</p>
              <p>Errors: {results.error_count || 0}</p>
              {results.errors && results.errors.length > 0 && (
                <div className="mt-2">
                  <p className="font-medium">Errors:</p>
                  <ul className="text-sm">
                    {results.errors.slice(0, 5).map((error: string, index: number) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <MagneticButton
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Close
            </MagneticButton>
            <MagneticButton
              onClick={handleUpload}
              disabled={!file || uploading}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload Products'}
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}