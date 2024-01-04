import React from "react";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from "@/components/Providers";
import {getDictionary} from "@/dictionaries/dictionary";
import ConfigContextProvider from "@/contexts/ConfigContextProvider";
import SelectLanguage from "@/components/SelectLanguage";
import {Card} from "@nextui-org/card";
import {getLocalization} from "@/services-client/localization";
import {cookies} from "next/headers";
import {LanguageType} from "@/types/language";
const inter = Inter({ subsets: ['latin'] })
export async function generateMetadata(): Promise<Metadata> {
    const dictionary = getDictionary(cookies().get('language')?.value as LanguageType || getLocalization());
    return {
        title: dictionary.metadata.title,
        description: dictionary.metadata.mainDescription,
    };
}
export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang={getLocalization()} className='dark'>
        <body className={inter.className}>
            <Providers>
                <ConfigContextProvider>
                    <SelectLanguage/>
                    <main className="flex flex-col h-screen p-24 items-center justify-center">
                        <Card className={"w-11/12 h-[90%]"}>
                            <div className={"flex w-full h-full"}>
                                {children}
                            </div>
                        </Card>
                    </main>
                </ConfigContextProvider>
            </Providers>
        </body>
    </html>
  )
}
