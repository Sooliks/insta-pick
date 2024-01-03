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
                    <main className="flex h-screen flex-col items-center justify-between p-24">
                        <Card className={"w-4/5 h-5/6"}>
                            {children}
                        </Card>
                    </main>
                </Providers>
            </ConfigContextProvider>
        </body>
    </html>
  )
}
