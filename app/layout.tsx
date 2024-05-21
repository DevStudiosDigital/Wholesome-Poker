import type { Metadata } from 'next';
import { Bricolage_Grotesque } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/header';
import SideBar from '@/components/layout/side-bar';
import RainbowKitWagmiConfig from '@/providers/rainbowkit-provider';
import { ToastContainer } from 'react-toastify';

const font = Bricolage_Grotesque({ subsets: ['latin'] });
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Wholesome Poker',
  description: 'Wholesome Poker',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${font.className} text-white bg-[#0F100F] relative overflow-auto leading-snug`}
      >
        <ToastContainer
          position='bottom-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='dark'
        />
        <RainbowKitWagmiConfig>
          <div className='flex'>
            <div className='hidden md:block h-screen w-auto relative'>
              <div className='absolute mx-10 top-1/2 -translate-y-1/2'>
                <SideBar />
              </div>
            </div>
            <div className='grow md:ml-[180px]'>
              <div className='grow h-full w-full absolute top-0 left-0 overflow-hidden -z-10'>
                <div className='relative h-full'>
                  <div className='w-[100vw] h-[100vw] rounded-full bg-primary opacity-40 blur-[120px] absolute top-[400px] -left-[60vw] -z-10'></div>
                  <div className='w-[100vw] h-[100vw] rounded-full bg-secondary opacity-40 blur-[120px] absolute -bottom-[200px] -right-[70vw] -z-10'></div>
                </div>
              </div>
              <Header />
              <div className='flex gap-8 2xl:gap-10 pl-4 md:pl-0 pr-4 lg:pr-6 2xl:pr-10 py-20 items-start relative'>
                <main className='w-0 grow'>{children}</main>
              </div>
            </div>
          </div>
        </RainbowKitWagmiConfig>
      </body>
    </html>
  );
}
