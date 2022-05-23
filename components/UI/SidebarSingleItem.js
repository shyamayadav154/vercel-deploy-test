import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react'

export default function SidebarSingleItem({item,name,open}) {
    const router = useRouter()
  return (
    <li
      key={item.name}
      onClick={() => router.push(item.href)}
      className={classNames(
        router.asPath === item.href
          ? 'bg-purple-50 border-purple-600 text-purple-600 hover:cursor-pointer'
          : 'border-transparent text-gray-600 hover:bg-gray-50 hover:cursor-pointer hover:text-gray-900',
        'group border-l-4 py-2 px-3 flex items-center text-base font-medium'
      )}
    >
      <item.icon
        className={classNames(
          router.asPath === item.href
            ? 'text-purple-500'
            : 'text-gray-400 group-hover:text-gray-500',
          'mr-4 flex-shrink-0 h-6 w-6'
        )}
        aria-hidden='true'
      />

      <span className={`${open && 'hidden'} origin-left duration-200`}> {item.name}</span>
     
    </li>
  );
}
