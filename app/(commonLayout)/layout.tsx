import Header from '@/components/shared/header';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">{children}</main>
            </div>
        
    );
};

export default layout;