'use client';

import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider open={true}>
            {children}
        </SidebarProvider>
    )
}

export default DashboardProvider;
