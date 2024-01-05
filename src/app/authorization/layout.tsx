import React from 'react';
import {Card} from "@nextui-org/card";
import {Button} from "@nextui-org/react";
import Link from "next/link";

const AuthorizationLayout = async ({children} : {children: React.ReactNode}) => {
    return (
        <div className={"w-full flex items-center justify-center flex-col"}>
            <Card className={"flex flex-row p-2 w-2/5 justify-center"}>
                <Link href={'/authorization'}>
                    <Button className={"mx-4"}>Вход</Button>
                </Link>
                <Link href={'/authorization/registration'}>
                    <Button className={"mx-4"}>Регистрация</Button>
                </Link>
            </Card>
            <Card className={"w-2/5 h-5/6 mt-2 flex flex-row justify-center items-start"}>
                {children}
            </Card>
        </div>
    );
};

export default AuthorizationLayout;