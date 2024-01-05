import React from 'react';
import MenuLayout from "@/components/MenuLayout";
const MainLayout = async ({children} : {children: React.ReactNode}) => {
    return (
        <>
            <div className="w-full max-w-[260px] border-r-small px-1 py-2 border-default-200 dark:border-default-100">
                <MenuLayout/>
            </div>
            {children}
        </>
    );
};

export default MainLayout;