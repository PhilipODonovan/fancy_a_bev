// src/Navbar.jsx
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Admin', href: '#', current: false },
  { name: 'Electric Vehicles', href: '/dashboard', current: false },
  { name: 'Checkout', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="relative bg-gray-800 text-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        {/* top row */}
        <div className="relative flex h-16 items-center justify-between">
          {/* mobile menu button (left) */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-white/10 hover:text-white focus:outline-none">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>

          {/* logo + desktop nav */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <a href="#" className="flex shrink-0 items-center gap-2">
              <img
                alt="Company"
                src="\fancyabev.png"
                className="h-8 w-auto"
              />
              <span className="hidden text-sm font-semibold sm:inline">FancyABev</span>
            </a>

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* right side: bell + profile menu */}
          <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="rounded-full p-1 text-gray-300 hover:text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              title="Notifications"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" />
            </button>

            <Menu as="div" className="relative">
              <MenuButton className="flex overflow-hidden rounded-full ring-1 ring-white/20 hover:ring-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                <Image
                  alt="User avatar"
                  src="/boo.png"
                  className="h-8 w-8 rounded-full"
                  width='32'
                  height='32'   
                />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 text-gray-900 shadow-lg ring-1 ring-black/5 transition data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:text-gray-200"
              >
                <MenuItem as="a" href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/10">
                  Your profile
                </MenuItem>
                <MenuItem as="a" href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg白/10">
                  Settings
                </MenuItem>
                <MenuItem as="a" href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/10">
                  Sign out
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
        {/* /top row */}
      </div>

      {/* mobile menu (shown when open on sm-) */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}