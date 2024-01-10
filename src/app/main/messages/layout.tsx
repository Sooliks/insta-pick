import React from 'react';
import AddDialog from "@/app/main/messages/AddDialog";

const MessagesLayout = async ({children} : {children: React.ReactNode}) => {
    return (
        <div className={"p-4 flex flex-row justify-between w-full"}>
            {children}
            <div>
                <AddDialog/>
            </div>
        </div>
    );
};

export default MessagesLayout;