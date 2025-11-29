import React from 'react'

export default function Order() {
  return (
    <>
       <section className="w-full">
      
         
          <div className="w-full min-h-[610px]">
            <div className="max-w-[1220px] mx-auto py-5">
              <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
                Order's List
              </h3>
              <div className="border border-t-0 rounded-b-md border-slate-400">
                <div className="relative overflow-x-auto">
                  <table className="w-full  text-left rtl:text-right text-gray-500 ">
                    <thead className="text-sm text-gray-700 uppercase bg-gray-50 ">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          <button
                            type="button"
                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                          >
                            Delete
                          </button>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          S. No.
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Order ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Quantity
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Price
                        </th>

                        <th scope="col" className="px-6 py-3">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                          View
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b">
                        <th
                          scope="row"
                          className="px-6 py-4 text-[18px] font-semibold text-gray-900 whitespace-nowrap "
                        >
                          <input
                            id="purple-checkbox"
                            name="deleteCheck"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 "
                          />
                        </th>
                        <td className="px-6 py-4 font-bold">1</td>
                        <td className="px-6 py-4">Frank01</td>
                        <td className="px-6 py-4 font-semibold">
                          Roshan Chaurasia
                        </td>
                        <td className="px-6 py-4 text-center">2</td>
                        <td className="px-6 py-4">₹ 3500</td>
                        <td className="px-6 py-4">10/06/2024</td>
                        <td className="px-6 py-4">Processing...</td>
                        <td className="px-6 py-4">
                          <button
                            
                            data-modal-target="order-modal"
                            data-modal-toggle="order-modal"
                            type="button"
                            className=" mt-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
    </section>
    </>
  )
}
