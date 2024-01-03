import React from "react";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Providers from "@/components/Providers";
import {getDictionary} from "@/dictionaries/dictionary";
import ConfigContextProvider from "@/contexts/ConfigContextProvider";
import {LanguageType} from "@/types/language";
import SelectLanguage from "@/components/SelectLanguage";
import {Card} from "@nextui-org/card";
import MenuLayout from "@/components/MenuLayout";
const inter = Inter({ subsets: ['latin'] })
export async function generateMetadata({params: {lang}}: {params: { lang: LanguageType }}): Promise<Metadata> {
    const dictionary = getDictionary(lang);
    return {
        title: dictionary.metadata.title,
        description: dictionary.metadata.mainDescription,
    };
}
export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'ru' }]
}
export default function RootLayout({
  children, params: {lang}
}: {
  children: React.ReactNode, params: { lang: LanguageType }
}) {
  return (
    <html lang={lang} className='dark'>
        <body className={inter.className}>
            <ConfigContextProvider lang={lang}>
                <Providers>
                    <SelectLanguage/>
                    <main className="flex flex-col h-screen p-24 items-center justify-center">
                        <Card className={"w-11/12 h-[90%]"}>
                            <div className={"flex w-full h-full"}>
                                <div className="w-full max-w-[260px] border-r-small px-1 py-2 border-default-200 dark:border-default-100">
                                    <MenuLayout/>
                                </div>
                                {children}
                            </div>
                        </Card>
                    </main>
                </Providers>
            </ConfigContextProvider>
        </body>
    </html>
  )
}
