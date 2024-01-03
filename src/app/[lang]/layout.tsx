import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Providers from "@/components/Providers";
import {dictionary} from "@/dictionaries/dictionary";

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({params: {lang}}: {params: { lang: 'ru' | 'en' }}): Promise<Metadata> {
    return {
        title: dictionary[lang].metadata.title,
        description: dictionary[lang].metadata.mainDescription,
    };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark'>
        <body className={inter.className}>
            <Providers>
                {children}
            </Providers>
        </body>
    </html>
  )
}
