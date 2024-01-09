import React from 'react';
import {Metadata} from "next";
import {getDictionary} from "@/dictionaries/dictionary";
import {cookies} from "next/headers";
import {LanguageType} from "@/types/language";
import {getLocalization} from "@/services-client/localization";


type ProfileProps = {
    params: {
        login: string
    }
}
export async function generateMetadata({params: {login}}: {params: { login: string }}): Promise<Metadata>{
    const dictionary = getDictionary(cookies().get('language')?.value as LanguageType || getLocalization());
    //TODO мультиязычность добавить
    return {
        title: `${dictionary.metadata.title} - ${login}`,
        description: 'Профиль пользователя '+ login,
        robots: 'all',
    }
}

const ProfilePage = async ({params: {login}}: ProfileProps) => {
    return (
        <div>
            {login}
        </div>
    );
};

export default ProfilePage;