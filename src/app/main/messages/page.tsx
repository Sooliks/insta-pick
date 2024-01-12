import React from 'react';
import {Metadata} from "next";
import {getDictionary} from "@/dictionaries/dictionary";
import {cookies} from "next/headers";
import {LanguageType} from "@/types/language";
import {getLocalization} from "@/services-client/localization";
import {getChats} from "@/server-actions/messages";
import {Card} from "@nextui-org/card";
import {User} from "@nextui-org/user";
import {Avatar, Divider, ScrollShadow} from "@nextui-org/react";
import Link from "next/link";
import {getServerSession} from "next-auth";
import {authConfig} from "@/configs/auth";
export async function generateMetadata(): Promise<Metadata> {
    const dictionary = getDictionary(cookies().get('language')?.value as LanguageType || getLocalization());
    return {
        title: `${dictionary.metadata.title} - Messenger`,
        robots: 'noindex, nofollow'
    };
}
const MessagesPage = async () => {
    const chats = await getChats();
    const dictionary = getDictionary(cookies().get('language')?.value as LanguageType || getLocalization());
    const session = await getServerSession(authConfig)
    return (
        <div className={"w-full h-full"}>
            {chats && chats.length > 0 ?
                <ScrollShadow className="h-[400px] flex flex-col items-start w-full">
                    {chats.map(chat =>
                        <Link key={chat.id} href={`/main/messages/${chat.id}`} className={'w-4/5 mb-2'}>
                            <Card className={'p-4 flex flex-row items-center w-full'}>
                                <User
                                    name={chat.users[0].login === session?.user.login ? chat.users[1].login : chat.users[0].login}
                                />
                                <Divider orientation={"vertical"} className={"mx-4"}/>
                                <div className={"flex flex-row items-center"}>
                                    {chat.messages[chat.messages.length-1]?.senderId === session?.user.id &&
                                        <p className={'text-warning'}>Вы:</p>
                                    }
                                    <p className={"text-small ml-2"}>{chat.messages[chat.messages.length-1]?.text || 'Напишите первое сообщение'}</p>
                                </div>
                            </Card>
                        </Link>
                    )}
                </ScrollShadow>
                :
                <div>
                    <p>{dictionary.errors.notFoundDialogs}</p>
                </div>
            }
        </div>
    );
};

export default MessagesPage;