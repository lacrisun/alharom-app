import '../globals.css'
import Favicon from '../../public/favicon.ico'
import localFont from 'next/font/local'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

require('dotenv').config()
config.autoAddCss = false
 
const myFont = localFont({ src: '../../public/fonts/Bicyclette-Bold.ttf' })

export const metadata = {
  title: 'Profile User',
  description: 'Tuntut Impian, Abadikan Kenangan.',
  icons: [{ rel: 'icon', url: Favicon.src }] 
}

export default function PendaftaranLayout({ children }) {
  return (
    <html lang="en">
      <body className={myFont.className}>{children}</body>
    </html>
  )
}