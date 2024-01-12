'use client'
import React, {Key} from 'react';
import {Listbox, ListboxItem} from "@nextui-org/react";
import {useConfigContext} from "@/contexts/ConfigContextProvider";
import {getDictionary} from "@/dictionaries/dictionary";
import {User} from "@nextui-org/user";
import {signOut, useSession} from "next-auth/react";
import {usePathname, useRouter} from "next/navigation";

const MenuLayout: React.FC = () => {
    const configContext = useConfigContext();
    const dictionary = getDictionary(configContext.config.currentLanguage);
    const {replace} = useRouter()
    const session = useSession();
    const pathname = usePathname()
    const handleAction = async (key: Key) => {
        switch (key) {
            case 'signOut':
                await signOut({callbackUrl: '/authorization'});
                break;
            default:
                if(pathname === key.toString())return
                replace(key.toString())
                break
        }
    }
    return (
        <Listbox
            aria-label="Actions"
            onAction={handleAction}
        >
            <ListboxItem key={`/main/profile/${session.data?.user.login}`}>
                <User
                    name={session.data?.user.login}
                    description={session.data?.user.description}
                    avatarProps={{
                        src: `/avatars/${session.data?.user.login}`
                    }}
                />
            </ListboxItem>
            <ListboxItem key="/main">{dictionary.components.mainMenu.news}</ListboxItem>
            <ListboxItem key="/main/messages">{dictionary.components.mainMenu.messenger}</ListboxItem>
            <ListboxItem key="signOut" className="text-danger" color="danger">
                {dictionary.components.mainMenu.exit}
            </ListboxItem>
        </Listbox>
    );
};

export default MenuLayout;