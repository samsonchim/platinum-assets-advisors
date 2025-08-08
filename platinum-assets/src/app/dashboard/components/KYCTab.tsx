"use client";
import React, { useState } from "react";

const KYCTab: React.FC = () => {
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [kycStatus, setKycStatus] = useState<"pending" | "verified" | "none">("none");
  const [submitDate, setSubmitDate] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState("");

  // Document types
  const documentTypes = [
    { value: "national_id", label: "National ID", icon: "🆔" },
    { value: "int_passport", label: "International Passport", icon: "📘" },
    { value: "drivers_license", label: "Driver's License", icon: "🚗" },
    { value: "others", label: "Others", icon: "📄" },
  ];

  const handleKYCClick = () => {
    if (kycStatus === "pending") {
      return; // Don't open modal if already pending
    }
    setUploadError("");
    setSelectedDocType("");
    setUploadedFile(null);
    setShowKYCModal(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setUploadError("File size must be less than 5MB");
        return;
      }
      
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        setUploadError("Only JPEG, PNG, and PDF files are allowed");
        return;
      }
      
      setUploadedFile(file);
      setUploadError("");
    }
  };

  const handleKYCSubmit = () => {
    setUploadError("");
    
    if (!selectedDocType) {
      setUploadError("Please select a document type");
      return;
    }
    
    if (!uploadedFile) {
      setUploadError("Please upload a document");
      return;
    }

    // Mock submission - set status to pending
    setKycStatus("pending");
    setSubmitDate(new Date().toISOString());
    setShowKYCModal(false);
    
    // Show success message
    alert("KYC document submitted successfully! Your verification will be completed within 14 working days.");
  };

  const getWorkingDaysFromSubmit = () => {
    if (!submitDate) return 0;
    const submit = new Date(submitDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - submit.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.min(diffDays, 14);
  };

  return (
    <>
      <div className="w-full max-w-4xl bg-white rounded-xl p-4 md:p-6 border border-gray-200 shadow-lg flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">KYC Verification</h3>
          </div>
          {kycStatus !== "pending" && (
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold w-full sm:w-auto shadow-md transition-colors"
              onClick={handleKYCClick}
            >
              {kycStatus === "verified" ? "Update KYC" : "Start KYC"}
            </button>
          )}
        </div>

        {/* KYC Status */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Verification Status</h4>
          
          {kycStatus === "none" && (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <div className="text-gray-900 font-semibold">Not Verified</div>
                <div className="text-gray-600 text-sm">Complete your KYC verification to unlock all features</div>
                <div className="text-blue-600 text-sm mt-1">Click "Start KYC" to begin verification</div>
              </div>
            </div>
          )}

          {kycStatus === "pending" && (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8z"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <div>
                <div className="text-yellow-600 font-semibold">Verification Pending</div>
                <div className="text-gray-600 text-sm">Your KYC documents are under review</div>
                <div className="text-yellow-700 text-sm mt-1">
                  Submitted {getWorkingDaysFromSubmit()} working day(s) ago • 
                  Expected completion: {14 - getWorkingDaysFromSubmit()} working day(s) remaining
                </div>
              </div>
            </div>
          )}

          {kycStatus === "verified" && (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                </svg>
              </div>
              <div>
                <div className="text-green-600 font-semibold">Verified</div>
                <div className="text-gray-600 text-sm">Your account has been successfully verified</div>
                <div className="text-green-700 text-sm mt-1">All features are now available</div>
              </div>
            </div>
          )}
        </div>

        {/* KYC Benefits */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">KYC Benefits</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                </svg>
              </div>
              <span className="text-gray-900">Higher withdrawal limits</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                </svg>
              </div>
              <span className="text-gray-900">Faster transaction processing</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                </svg>
              </div>
              <span className="text-gray-900">Access to premium features</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                </svg>
              </div>
              <span className="text-gray-900">Enhanced security protection</span>
            </div>
          </div>
        </div>
      </div>

      {/* KYC Upload Modal */}
      {showKYCModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-md relative flex flex-col gap-4 md:gap-6 max-h-[90vh] overflow-y-auto border border-gray-200">
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setShowKYCModal(false)}
            >
              &times;
            </button>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2 pr-8">KYC Document Upload</h3>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-gray-700 font-semibold">Document Type</label>
                <select
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none mt-1"
                  value={selectedDocType}
                  onChange={e => setSelectedDocType(e.target.value)}
                >
                  <option value="">Select document type</option>
                  {documentTypes.map((docType) => (
                    <option key={docType.value} value={docType.value}>
                      {docType.icon} {docType.label}
                    </option>
                  ))}
                </select>
                <div className="text-xs text-gray-500 mt-1">Choose the type of document you want to upload</div>
              </div>

              <div>
                <label className="text-gray-700 font-semibold">Upload Document</label>
                <div className="mt-1">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="kyc-file-upload"
                  />
                  <label
                    htmlFor="kyc-file-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    {uploadedFile ? (
                      <div className="flex flex-col items-center">
                        <svg width="32" height="32" fill="#3b82f6" viewBox="0 0 24 24" className="mb-2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                          <path d="m14,2 0,6 6,0"/>
                        </svg>
                        <div className="text-gray-900 font-semibold text-sm">{uploadedFile.name}</div>
                        <div className="text-gray-600 text-xs">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <svg width="32" height="32" fill="#3b82f6" viewBox="0 0 24 24" className="mb-2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                          <path d="m14,2 0,6 6,0"/>
                        </svg>
                        <div className="text-gray-700 font-semibold">Click to upload</div>
                        <div className="text-gray-500 text-xs">JPEG, PNG, PDF (Max 5MB)</div>
                      </div>
                    )}
                  </label>
                </div>
                <div className="text-xs text-gray-500 mt-1">Supported formats: JPEG, PNG, PDF. Maximum file size: 5MB</div>
              </div>

              {uploadError && (
                <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
                  {uploadError}
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="text-blue-700 text-sm font-semibold mb-1">⚠️ Important Notice</div>
                <div className="text-blue-600 text-xs">
                  Your KYC verification will be completed within 14 working days. You will be notified once the verification is complete.
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg shadow-md hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50"
                  onClick={handleKYCSubmit}
                  disabled={!selectedDocType || !uploadedFile}
                >
                  Submit KYC
                </button>
                <button
                  className="flex-1 py-3 rounded-lg bg-gray-500 text-white font-bold text-lg shadow-md hover:bg-gray-600 transition-all duration-200"
                  onClick={() => setShowKYCModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default KYCTab;
