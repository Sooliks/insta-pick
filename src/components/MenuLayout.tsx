'use client'
import React, {useState} from 'react';
import {Listbox, ListboxItem, Selection} from "@nextui-org/react";
import {useConfigContext} from "@/contexts/ConfigContextProvider";
import {getDictionary} from "@/dictionaries/dictionary";
import {User} from "@nextui-org/user";

const MenuLayout: React.FC = () => {
    const configContext = useConfigContext();
    const dictionary = getDictionary(configContext.config.currentLanguage);

    return (
        <Listbox
            aria-label="Actions"
            onAction={(key) => alert(key)}
        >
            <ListboxItem key="user">
                <User
                    name="Jane Doe"
                    description="Product Designer"
                    avatarProps={{
                        src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                    }}
                />
            </ListboxItem>
            <ListboxItem key="copy">Copy link</ListboxItem>
            <ListboxItem key="edit">Gfgfggf</ListboxItem>
            <ListboxItem key="delete" className="text-danger" color="danger">
                {dictionary.components.mainMenu.exit}
            </ListboxItem>
        </Listbox>
    );
};

export default MenuLayout;