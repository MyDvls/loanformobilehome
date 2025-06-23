import React from 'react';

interface TranslatedInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    placeholder: string;
    required?: boolean;
    type?: 'text' | 'textarea' | 'select';
    rows?: number;
    options?: { value: string; label: string }[];
}

export default function TranslatedInput({
    label,
    value,
    onChange,
    error,
    placeholder,
    required,
    type = 'text',
    rows = 3,
    options = [],
}: TranslatedInputProps) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-neutral-200">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {type === 'text' ? (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="block w-full rounded-md border-gray-300 bg-white p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                    placeholder={placeholder}
                    required={required}
                />
            ) : type === 'textarea' ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    rows={rows}
                    className="block w-full rounded-md border-gray-300 bg-white p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                    placeholder={placeholder}
                    required={required}
                />
            ) : (
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="block w-full rounded-md border-gray-300 bg-white p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                    required={required}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
}