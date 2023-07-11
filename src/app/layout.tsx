// 'use client'
import ClientOnly from './components/ClientOnly'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import ToasterProvider from './providers/ToasterProvider'
import RegisterModel from './components/modals/RegisterModel'
import LoginModel from './components/modals/LoginModel'
import RentModel from './components/modals/RentModel'
import getCurrentUser from './actions/getCurrentUser'
import SearchModel from './components/modals/SearchModel'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Airbnb',
  description: 'Hotel listing site',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
        <ToasterProvider/>
        <SearchModel/>
        <RentModel/>
        <LoginModel/>
        <RegisterModel/>
        <Navbar currentUser = {currentUser}/>
        </ClientOnly>
        
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}
