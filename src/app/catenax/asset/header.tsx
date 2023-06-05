'use client';

import { Popover } from '@headlessui/react';
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline';
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';

const products = [
  {
    name: '항해 선박 (seagoing vessel)',
    description: 'Get a better understanding of your traffic',
    href: 'catenax/vessel/seagoingVessel',
    icon: ChartPieIcon,
  },
  {
    name: '코스터 (coaster)',
    description: 'Speak directly to your customers',
    href: 'catenax/vessel/coaster',
    icon: CursorArrowRaysIcon,
  },
  {
    name: '리버 보트 (river boat)',
    description: 'Your customers’ data will be safe and secure',
    href: 'catenax/vessel/riverBoat',
    icon: FingerPrintIcon,
  },
  {
    name: '보트 (boat)',
    description: 'Connect with third-party tools',
    href: 'catenax/vessel/boat',
    icon: SquaresPlusIcon,
  },
  {
    name: '군용 선박 (military watercraft)',
    description: 'Build strategic funnels that will convert',
    href: 'catenax/vessel/militaryWatercraft',
    icon: ArrowPathIcon,
  },
  {
    name: '특수목적선 (special purpose ship)',
    description: 'Build strategic funnels that will convert',
    href: 'catenax/vessel/specialPurposeShip',
    icon: ArrowPathIcon,
  },
  {
    name: '플로트 (float)',
    description: 'Build strategic funnels that will convert',
    href: 'catenax/vessel/float',
    icon: ArrowPathIcon,
  },
  {
    name: '선박(기타) (vessel(other))',
    description: 'Build strategic funnels that will convert',
    href: 'catenax/vessel/other',
    icon: ArrowPathIcon,
  },
];
// 기기장비재
const equipments = [
  {
    name: '보일러(boiler)',
    description: 'Get a better understanding of your traffic',
    href: 'aas',
    icon: ChartPieIcon,
  },
  {
    name: '압축기(compressor)',
    description: 'Speak directly to your customers',
    href: '#',
    icon: CursorArrowRaysIcon,
  },
  {
    name: '발전기(generator)',
    description: 'Your customers’ data will be safe and secure',
    href: '#',
    icon: FingerPrintIcon,
  },
  {
    name: '펌프(pump)',
    description: 'Connect with third-party tools',
    href: '#',
    icon: SquaresPlusIcon,
  },
];

const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
];

export default function Example() {
  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Home</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </Link>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              선박
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 z-50">
              <div className="p-4">
                {products.map(item => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon
                        className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-auto">
                      <Link
                        href={item.href}
                        className="block font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </Link>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                {callsToAction.map(item => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
                    <item.icon
                      className="h-5 w-5 flex-none text-gray-400"
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </div>
            </Popover.Panel>
          </Popover>

          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              기기장비재
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 z-50">
              <div className="p-4">
                {equipments.map(item => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon
                        className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-auto">
                      <a
                        href={item.href}
                        className="block font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                {callsToAction.map(item => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
                    <item.icon
                      className="h-5 w-5 flex-none text-gray-400"
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </div>
            </Popover.Panel>
          </Popover>

          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            배관재
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            밸브재
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            보온재
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            전장재
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            철의장재
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            철의장재
          </a>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href='catenax/asset'>
            <button type="button" className="text-base text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
              <svg className='w-5 h-5 mr-2 -ml-1' xmlns="http://www.w3.org/2000/svg" fill="#ffffff" version="1.1" viewBox="0 0 490 490" enable-background="new 0 0 490 490">
                <g>
                  <g>
                    <path d="M404.5,269.5V103.7h-19.8v165.8h-69.8V167.3H295v102.2h-36.9l-65.2-147h-32.4L151.2,61H82.4L73,122.5H41.7v147H0L36.5,429    h334.6L490,269.5H404.5z M100.1,80.8h33.4l6.3,41.7H93.9L100.1,80.8z M62.6,143.4h116.7l20.9,46.9H62.6V143.4z M209.1,210.1    l26.5,59.4h-173v-59.4H209.1z M361.8,408.1H53.2L25,289.3h425.3L361.8,408.1z"/>
                    <rect width="22.9" x="77.2" y="318.5" height="19.8"/>
                    <rect width="22.9" x="131.4" y="318.5" height="19.8"/>
                    <rect width="22.9" x="185.6" y="318.5" height="19.8"/>
                    <rect width="22.9" x="239.8" y="318.5" height="19.8"/>
                    <rect width="22.9" x="294" y="318.5" height="19.8"/>
                    <rect width="22.9" x="348.2" y="318.5" height="19.8"/>
                  </g>
                </g>
              </svg>
              my asset
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
