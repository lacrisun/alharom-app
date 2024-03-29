import '../globals.css'
import Favicon from '../../public/favicon.ico'
import localFont from 'next/font/local'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

require('dotenv').config()
config.autoAddCss = false
 
const myFont = localFont({ src: '../../public/fonts/Bicyclette-Bold.ttf' })


export const metadata = {
  title: 'AL-HAROM - Agensi Haji & Umrah #1 di Riau',
  description: 'Tuntut Impian, Abadikan Kenangan.',
  icons: [{ rel: 'icon', url: Favicon.src }] 
}

export default function AboutLayout({ children }) {
  return (
    <html lang="en">
      <body className={myFont.className}>{children}</body>
    </html>
  )
}