import React from 'react';
import {Button} from "@nextui-org/react";
import {getDictionary} from "@/dictionaries/dictionary";
import {getLocalization} from "@/services-client/localization";
import {cookies} from "next/headers";
import {LanguageType} from "@/types/language";
import Link from "next/link";
const Page = async () => {
    const dictionary = getDictionary(cookies().get('language')?.value as LanguageType || getLocalization())
    return (
        <div className={"flex w-full justify-center items-center"}>
            <Link href={'/authorization'}>
                <Button>{dictionary.components.buttons.start}</Button>
            </Link>
        </div>
    );
};

export default Page;