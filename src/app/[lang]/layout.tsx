import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Providers from "@/components/Providers";
import {getDictionary} from "@/dictionaries/dictionary";
import ConfigContextProvider from "@/contexts/ConfigContextProvider";
import {LanguageType} from "@/types/language";
import {Select} from "@nextui-org/react";
import SelectLanguage from "@/components/SelectLanguage";

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({params: {lang}}: {params: { lang: LanguageType }}): Promise<Metadata> {
    const dictionary = getDictionary(lang);
    return {
        title: dictionary.metadata.title,
        description: dictionary.metadata.mainDescription,
    };
}

export default function RootLayout({
  children, params: {lang}
}: {
  children: React.ReactNode, params: { lang: LanguageType }
}) {
  return (
    <html lang="en" className='dark'>
        <body className={inter.className}>
            <ConfigContextProvider lang={lang}>
                <Providers>
                    <SelectLanguage/>
                    {children}
                </Providers>
            </ConfigContextProvider>
        </body>
    </html>
  )
}
