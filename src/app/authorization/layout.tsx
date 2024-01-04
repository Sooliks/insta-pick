import React from 'react';

const AuthorizationLayout = async ({children} : {children: React.ReactNode}) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default AuthorizationLayout;