import React from 'react';
import {getChatById} from "@/server-actions/messages";
import {Divider, Input, ScrollShadow, Textarea} from "@nextui-org/react";
import {User} from "@nextui-org/user";
import AddMessage from "@/app/main/messages/AddMessage";


const ChatPage = async ({params: {id}}: {params: { id: string }}) => {
    const messages = await getChatById(id);
    return (
        <div className={"w-full h-full flex flex-col justify-between"}>
            <ScrollShadow className="h-[90%] flex flex-col items-start w-full">
                {messages && messages.length > 0 ?
                    messages.map(message=>
                        <div key={message.id} className={"flex flex-row items-center my-4"}>
                            <User name={message.sender.login}/>
                            <Divider orientation={"vertical"} className={"mx-4"}/>
                            <p>{message.text}</p>
                        </div>
                    )
                    :
                    <p>Напишите первое сообщение</p>
                }
            </ScrollShadow>
            <AddMessage chatId={id}/>
        </div>
    );
};

export default ChatPage;