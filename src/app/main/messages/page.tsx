import React from 'react';
import {Metadata} from "next";
import {getDictionary} from "@/dictionaries/dictionary";
import {cookies} from "next/headers";
import {LanguageType} from "@/types/language";
import {getLocalization} from "@/services-client/localization";
import {getDialogs} from "@/server-actions/messages";
export async function generateMetadata(): Promise<Metadata> {
    const dictionary = getDictionary(cookies().get('language')?.value as LanguageType || getLocalization());
    return {
        title: `${dictionary.metadata.title} - Messenger`,
        robots: 'noindex, nofollow'
    };
}
const MessagesPage = async () => {
    const dialogs = await getDialogs();
    const dictionary = getDictionary(cookies().get('language')?.value as LanguageType || getLocalization());
    return (
        <div className={"w-full h-full"}>
            {dialogs && dialogs.length > 0 ?
                <div className={"flex flex-col items-start"}>
                    {dialogs.map((dialog, index) =>
                        <div key={index}>

                        </div>
                    )}
                </div>
                :
                <div>
                    <p>{dictionary.errors.notFoundDialogs}</p>
                </div>
            }
        </div>
    );
};

export default MessagesPage;