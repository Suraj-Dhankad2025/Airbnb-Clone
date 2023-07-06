// import ClientOnly from './components/ClientOnly'
// import Modal from './components/modals/Modal'
// import Modal from './components/modals/Modal'
import RegisterModel from './components/modals/RegisterModel'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import ToasterProvider from './providers/ToasterProvider'
import LoginModel from './components/modals/LoginModel'
import getCurrentUser from './actions/getCurrentUser'
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
        {/* <ClientOnly>
        <Modal/>
        <Navbar/>
        </ClientOnly> */}
        <ToasterProvider/>
        <LoginModel/>
        <RegisterModel/>
        <Navbar currentUser =  {currentUser}/>
        {children}
      </body>
    </html>
  )
}
