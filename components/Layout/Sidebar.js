
import { useRouter } from 'next/router';

export default function Sidebar({sidebarNavigation}) {

  const router = useRouter()
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div className='hidden md:flex md:z-10 md:w-28 md:flex-col md:fixed md:inset-y-0 bg-indigo-700'>
      <div className='w-full h-screen py-6 flex flex-col items-center'>
        <div className='flex-shrink-0 flex items-center'>
          <img
            className='h-8 w-auto'
            src='https://tailwindui.com/img/logos/workflow-mark.svg?color=white'
            alt='Workflow'
          />
        </div>
        <div className='flex-1 mt-6 w-full px-2 space-y-1'>
          {sidebarNavigation.map((item) => (
            <button
              key={item.name}
              onClick={()=>router.push(item.href)}
              className={classNames(
                router.asPath === item.href
                  ? 'bg-indigo-800 text-white'
                  : 'text-indigo-100 hover:bg-indigo-800 hover:text-white',
                'group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium'
              )}
              aria-current={item.current ? 'page' : undefined}
            >
              <item.icon
                className={classNames(
                  router.asPath === item.href
                    ? 'text-white'
                    : 'text-indigo-300 group-hover:text-white',
                  'h-6 w-6'
                )}
                aria-hidden='true'
              />
              <span className='mt-2'>{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
