import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { NextPage } from 'next'
import { supabase } from '../api'
import Link from 'next/link'

const IndexPage: NextPage = () => {
  interface NewOrder {trackingId: string, order_id: number, work_order_id: number, work_order_name: string, created_at: string, initial_units_or_quantity: number, brand_entry: string}  
  const [newOrders, setNewOrders] = useState<Array<NewOrder> | undefined >([])
  const [workOrders, setWorkOrders] = useState<Array<NewOrder> | undefined >([])
  const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchNewOrders()
    }, [])
    
    const fetchNewOrders = async() => {
        const { data, error }: {data: Array<NewOrder>, error: any} = await supabase
        .from('order')
        .select(`*`)
            .is("accepted", null)
            setNewOrders(data)
            console.log(error)
            fetchWorkOrders()
    }
  
    const fetchWorkOrders = async() => {
        const { data, error }: {data: any, error:any} = await supabase
            .from('work_orders')
            .select(`*`)
            setWorkOrders(data)
        setLoading(false)
        console.log(data)
        console.log(error)
    }

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        // https://freshman.tech/snippets/typescript/fix-value-not-exist-eventtarget/
        const target = e.target as HTMLButtonElement;
        if (target) alert(target.value);
    }
  
    return (
        <Layout title="New Work Orders | Tu Pack">
       { console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)}
        <div className="overflow-x-auto">
            <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
                <div className="w-full lg:w-5/6">
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
                            {loading ? <p className="text-2xl">Loading ...</p> : null}
                            {newOrders ? newOrders.map(order => {
                                return <tr key={order.trackingId} className="border-b border-gray-200 hover:bg-gray-100">
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
                                        onClick={handleClick} 
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
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default IndexPage
