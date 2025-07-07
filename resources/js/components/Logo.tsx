import React from 'react';

interface LogoProps {
    className?: string;
    logoUrl?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '', logoUrl }) => {
    return (
        <div className={`flex items-center gap-2 text-xl font-bold text-[#635F5C] md:text-2xl ${className}`}>
            <img
                src={
                    logoUrl ||
                    'https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/ec2d3fb7bc2bddc14fc001b963b948d766c2f6b1?placeholderIfAbsent=true'
                }
                alt="Mobile Fund Services Logo"
                className="h-auto w-7 object-contain md:w-9"
            />

            {/* Show text label only on medium and up */}
            <div className="hidden leading-tight font-bold text-[#635F5C] xl:block">
                <span style={{ color: 'rgba(91,61,92,1)' }}>Mobile Fund</span>
                <br />
                <span style={{ lineHeight: '28px' }}>Services</span>
            </div>
        </div>
    );
};
