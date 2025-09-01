import React, { useState } from 'react';
import { ArrowLeft, Upload, Check, FileText, Home } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { toast } from 'sonner@2.0.3';

interface DocumentUploadScreenProps {
  onNext: () => void;
  onBack: () => void;
}

interface DocumentStatus {
  uploaded: boolean;
  verified: boolean;
  name?: string;
}

export function DocumentUploadScreen({ onNext, onBack }: DocumentUploadScreenProps) {
  const [documents, setDocuments] = useState({
    id: { uploaded: false, verified: false } as DocumentStatus,
    address: { uploaded: false, verified: false } as DocumentStatus
  });
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (type: 'id' | 'address') => {
    // Simulate file selection and upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'id' ? 'image/*,.pdf' : 'image/*,.pdf';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        toast.info(`Uploading ${file.name}...`);
        
        // Simulate upload process
        setTimeout(() => {
          setDocuments(prev => ({
            ...prev,
            [type]: {
              uploaded: true,
              verified: false,
              name: file.name
            }
          }));
          
          toast.success(`${file.name} uploaded successfully`);
          
          // Simulate verification process
          setTimeout(() => {
            setDocuments(prev => ({
              ...prev,
              [type]: {
                ...prev[type],
                verified: true
              }
            }));
            toast.success(`${type === 'id' ? 'ID Document' : 'Address Proof'} verified`);
          }, 2000);
        }, 1500);
      }
    };
    
    input.click();
  };

  const canProceed = documents.id.uploaded && documents.address.uploaded;

  const handleContinue = () => {
    if (!canProceed) {
      toast.error('Please upload both required documents');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      toast.success('Documents verified successfully');
      onNext();
      setLoading(false);
    }, 1500);
  };

  const DocumentCard = ({ 
    type, 
    title, 
    description, 
    icon: Icon, 
    status 
  }: {
    type: 'id' | 'address';
    title: string;
    description: string;
    icon: any;
    status: DocumentStatus;
  }) => (
    <Card className="p-4">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F3F9FD' }}>
          <Icon className="w-6 h-6" style={{ color: '#314BB1' }} />
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          
          {status.uploaded ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">{status.name}</span>
              </div>
              
              {status.verified ? (
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">Verified</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                  <span className="text-sm text-gray-600">Verifying...</span>
                </div>
              )}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFileUpload(type)}
                className="mt-2"
              >
                Replace File
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFileUpload(type)}
              className="flex items-center gap-2"
            >
              <Upload className="w-3 h-3" />
              Upload File
            </Button>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-4 py-4" style={{ backgroundColor: '#314BB1' }}>
        <div className="flex items-center gap-3 text-white">
          <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={onBack} />
          <h1 className="font-medium">Document Upload</h1>
        </div>
      </div>

      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2" style={{ color: '#314BB1' }}>
            Upload Required Documents
          </h2>
          <p className="text-sm text-gray-600">
            Please upload clear, readable copies of the following documents for identity verification.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <DocumentCard
            type="id"
            title="National ID / Passport"
            description="Upload a clear photo of your National ID or Passport"
            icon={FileText}
            status={documents.id}
          />
          
          <DocumentCard
            type="address"
            title="Proof of Address"
            description="Upload a utility bill, bank statement, or lease agreement (not older than 3 months)"
            icon={Home}
            status={documents.address}
          />
        </div>

        {/* Upload Guidelines */}
        <Card className="p-4 mb-6" style={{ backgroundColor: '#F3F9FD' }}>
          <h3 className="font-medium mb-2" style={{ color: '#314BB1' }}>Upload Guidelines</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• File formats: JPG, PNG, PDF</li>
            <li>• Maximum file size: 5MB</li>
            <li>• Ensure all text is clearly visible</li>
            <li>• Documents must be in English or Swahili</li>
          </ul>
        </Card>

        <Button 
          className="w-full h-12 text-black font-medium"
          style={{ backgroundColor: canProceed ? '#FAD879' : '#E5E7EB' }}
          onClick={handleContinue}
          disabled={!canProceed || loading}
        >
          {loading ? 'Verifying Documents...' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}