import { X } from 'lucide-react';
import React, { useRef } from 'react';

interface FileUploadProps {
    label: string;
    onChange: (file: File | null) => void;
    error?: string | null;
    currentImageUrl?: string;
    previewImage?: File | null;
    onRemove?: () => void;
}

export default function FileUpload({ label, onChange, error, currentImageUrl, previewImage, onRemove }: FileUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onChange(file);
    };

    const handleRemove = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        if (onRemove) {
            onRemove();
        }
    };

    const previewUrl = previewImage ? URL.createObjectURL(previewImage) : currentImageUrl;
    console.log('Preview URL:', previewUrl);
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-neutral-200">{label}</label>
            <div className="flex items-center gap-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100 dark:text-neutral-400 dark:file:bg-neutral-700 dark:file:text-neutral-200 dark:hover:file:bg-neutral-600"
                />
                {(previewUrl || currentImageUrl) && (
                    <div className="relative">
                        <img src={previewUrl} alt="Preview" className="h-16 w-16 rounded-md object-cover" />
                        {onRemove && (
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="absolute -top-2 -right-2 rounded-full bg-red-600 p-1 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-neutral-800"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                )}
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
}
