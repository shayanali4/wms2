import * as React from 'react'
import Layout from '../components/Layout'
import { NextPage } from 'next'
import newOrders from '../data/newOrders'

const IndexPage: NextPage = () => {
  return (
<>
    <div class="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow">
        <div class="w-fixed w-full flex-shrink flex-grow-0 px-4">
            <div class="sticky top-0 p-4 w-full h-full">
            <ul className="Links space-y-2 tracking-wide mt-8">
                <li>
                    <a href="#" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path className="fill-current text-gray-300 group-hover:text-cyan-300" fill-rule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clip-rule="evenodd" />
                            <path className="fill-current text-gray-600 group-hover:text-cyan-600" d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
                        </svg>
                        <span className="group-hover:text-gray-700">Queue</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path className="fill-current text-gray-600 group-hover:text-cyan-600" fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clip-rule="evenodd" />
                            <path className="fill-current text-gray-300 group-hover:text-cyan-300" d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                        </svg>
                        <span className="group-hover:text-gray-700">Unassigned</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path className="fill-current text-gray-600 group-hover:text-cyan-600" d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                            <path className="fill-current text-gray-300 group-hover:text-cyan-300" d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                        </svg>
                        <span className="group-hover:text-gray-700">In Progress</span>
                    </a>
                </li>
                <li>
                    <button className="mt-6 px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="group-hover:text-gray-700">Logout</span>
                    </button>
                </li>
            </ul>

            </div>
        </div>
        <main role="main" class="w-full lg:w-5/6 flex-grow pt-1 px-3">
            {/* main content */}
                    <div className="bg-white shadow-md rounded my-6">
                        <table className="min-w-max w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">Work Order</th>
                                    <th className="py-3 px-6 text-left">Submission Date</th>
                                    <th className="py-3 px-6 text-center">Units / Quantity</th>
                                    <th className="py-3 px-6 text-center">Brand</th>
                                    <th className="py-3 px-6 text-center">Approve or Deny</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                            {/* {loading ? <p className="text-2xl">Loading ...</p> : null} */}
                            {newOrders ? newOrders.map(order => {
                                return <tr key={order.tracking_id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">{
                                        order.work_order_name
                                        }
                                        </span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>{order.created_at.slice(0,19).replace(/T/g,' ')}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex items-center justify-center">
                                        <span>
                                            {order.initial_units_or_quantity}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <span className="font-medium">{order.brand_entry}</span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center">
                                        <button className="px-3 py-1 bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform"
                                        value={order.order_id}
                                        // onClick={handleClick} 
                                        >Full Details
                                        </button>
                                        {/* <Link
                                            href={{
                                            pathname: '/approve/[slug]',
                                            query: { slug: order.order_id },
                                            }}
                                        >
                                            <a>Check Order{order.order_id}</a>
                                        </Link> */}
                                    </div>
                                </td>
                                </tr>
                            }): null}
                            </tbody>
                        </table>
                    </div>
        </main>
        <div class="w-fixed w-full flex-shrink flex-grow-0 px-2">
            <div class="flex sm:flex-col px-2">
                {/* sidebar */}
                <ul>
                    <li>
                        <button className="mt-6 px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className="group-hover:text-gray-700">Logout</span>
                        </button>
                    </li>
                    <li>
                        <button className="mt-6 px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className="group-hover:text-gray-700">Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <footer class="bg-black mt-auto">
        <h1>hi </h1>
    </footer>
</>
  )
}

export default IndexPage