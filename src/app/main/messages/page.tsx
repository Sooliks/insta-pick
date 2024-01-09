import React from 'react';
import {Metadata} from "next";
import {getDictionary} from "@/dictionaries/dictionary";
import {cookies} from "next/headers";
import {LanguageType} from "@/types/language";
import {getLocalization} from "@/services-client/localization";


export async function generateMetadata(): Promise<Metadata> {
    const dictionary = getDictionary(cookies().get('language')?.value as LanguageType || getLocalization());
    return {
        title: `${dictionary.metadata.title} - Messenger`,
        robots: 'noindex, nofollow'
    };
}

const MessagesPage = async () => {
    return (
        <div>

        </div>
    );
};

export default MessagesPage;