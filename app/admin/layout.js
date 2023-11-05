import '../globals.css'
import Favicon from '../../public/favicon.ico'
import localFont from 'next/font/local'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import NextAuthSessionProvider from '@/components/SessionProvider'

require('dotenv').config()
config.autoAddCss = false
 
const myFont = localFont({ src: '../../public/fonts/Bicyclette-Bold.ttf' })

export const metadata = {
  title: 'Admin Page',
  description: 'Tuntut Impian, Abadikan Kenangan.',
  icons: [{ rel: 'icon', url: Favicon.src }] 
}

export default async function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
      </body>
    </html>
  )
}