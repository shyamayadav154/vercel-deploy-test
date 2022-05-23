import {useState} from 'react'
import { SearchIcon } from '@heroicons/react/solid';

import LayoutEmp from './../../components/Layout/LayoutEmp';

export default function Search(){

    const [query,setQuery] = useState('')
    return (
      <div className=" flex justify-center mt-5">
                    <div className="max-w-xs w-full">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                          <SearchIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          name="search"
                          id="search"
                          className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          placeholder="Search"
                          type="search"
                        />
                      </div>
                    </div>
                  </div>
    );
}

Search.Layout = LayoutEmp