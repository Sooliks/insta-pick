'use client'
import React, {useState} from 'react';
import {Button, Textarea} from "@nextui-org/react";
import {sendMessage} from "@/server-actions/messages";

type AddMessageProps = {
    chatId: string
}


const AddMessage: React.FC<AddMessageProps> = ({chatId}) => {
    const [message,setMessage] = useState<string>("");
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const handleSubmit = () => {
        setMessage("")
        if(message){
            setIsLoading(true)
            sendMessage(message,chatId).then(data=>{

            }).finally(()=>setIsLoading(false))
        }
    }
    return (
        <Textarea
            endContent={<Button isLoading={isLoading} disabled={isLoading} onClick={handleSubmit}>Отправить</Button>}
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            disableAutosize
        />
    );
};

export default AddMessage;