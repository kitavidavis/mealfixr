"use client";
import {  useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { usePathname } from "next/navigation"
import Link from 'next/link';

const navigation = [
  { name: 'How MealFixr Works', href: '/', withLinks: false },
  { name: 'Personalized Meal Plans', href: '/meal-planner', withLinks: false },
]

export default function Header(){
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const router = usePathname()
    return (
        <header className={`inset-x-0 top-0 z-50 border-b border-gray-600 sticky bg-gray-950`}>
        <nav className="flex items-center justify-between p-2 lg:px-3" aria-label="Global">
          <div className="flex lg:flex-1 gap-x-2 items-center">
            <Link href={"/"}>
              <img
                className="h-20 w-auto"
                src="./logo.svg"
                alt="Logo"
              />
              </Link>
            
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-8 justify-center text-black">
            {navigation.map((item) => (
                <Link key={item.name} href={item.href} title={item.name} aria-label={item.name} className={`leading-6 ${router === item.href ? "text-orange-600" : "text-white"} font-semibold`}>
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-x-3">
  
              <a
                href="#"
                className="inline-flex justify-center items-center py-2.5 px-3 rounded-full text-base font-medium text-center text-white hover:bg-orange-900 focus:ring-4 focus:ring-gray-400 bg-orange-600"
              >
               Track Your Progress &rarr;
              </a>
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-950 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">MealFixr</span>
                <img
                className="h-20 w-auto"
                  src="./logo.svg"
                  alt="Logo"
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      title={item.name}
                      aria-label={item.name}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-orange-600"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
  
                  <a
                    href="#"
                    className="inline-flex justify-center items-center py-2.5 px-3 rounded-full text-base font-medium text-center text-white hover:bg-orange-900 focus:ring-4 focus:ring-gray-400 bg-orange-600"
                  >
                   Track Your Progress &rarr;
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    )
}