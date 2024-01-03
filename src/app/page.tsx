import React from 'react';
import {permanentRedirect} from "next/navigation";

const Page = async () => {
    const locale = navigator.language;
    permanentRedirect(locale === 'ru-RU' ? '/ru' : '/en')
    return (
        <>

        </>
    );
};

export default Page;