import React, {Suspense} from 'react';
import {Card} from "@nextui-org/card";
import {Button} from "@nextui-org/react";
import Link from "next/link";
import SpinLoading from "@/components/SpinLoading";
import {getDictionary} from "@/dictionaries/dictionary";
import {cookies} from "next/headers";
import {getLocalization} from "@/services-client/localization";
import {LanguageType} from "@/types/language";
const AuthorizationLayout = async ({children} : {children: React.ReactNode}) => {
    const dictionary = getDictionary(cookies().get('language')?.value as LanguageType || getLocalization());
    return (
        <div className={"w-full flex items-center justify-center flex-col"}>
            <Card className={"flex flex-row p-2 w-2/5 justify-center"}>
                <Link href={'/authorization'}>
                    <Button className={"mx-4"}>{dictionary.components.buttons.signInMenu}</Button>
                </Link>
                <Link href={'/authorization/registration'}>
                    <Button className={"mx-4"}>{dictionary.components.buttons.regMenu}</Button>
                </Link>
            </Card>
            <Card className={"w-2/5 h-5/6 mt-2 flex flex-row justify-center items-start"}>
                <Suspense fallback={<SpinLoading/>}>
                    {children}
                </Suspense>
            </Card>
        </div>
    );
};

export default AuthorizationLayout;