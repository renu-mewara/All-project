import React from 'react'

export default function Testimonialadd() {
  return (
    <>
       <section className="w-full">
            
            <div className="w-full min-h-[610px]">
                <div className="max-w-[1220px] mx-auto py-5">
                    <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
                       
                    </h3>
                    <form  className="border border-t-0 p-3 rounded-b-md border-slate-400">
                        <div className="flex gap-5">
                            <div className="w-1/3">
                                <label

                                    className="block  text-md font-medium text-gray-900 ml-5"
                                >
                                    Choose Image
                                </label>
                                <input
                                    type="file"
                                    id="Image"
                                    className="dropify"
                                    data-height="250"
                                />
                            </div>
                            <div className="w-2/3">
                                <div className="mb-5">
                                    <label
                                        htmlFor="Title"
                                        className="block mb-1 text-md font-medium text-gray-900"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="Name"
                                        className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                                        placeholder="Name"
                                    />
                                </div>
                                <div className="mb-5">
                                    <label
                                        htmlFor="Designation"
                                        className="block mb-1 text-md font-medium text-gray-900"
                                    >
                                        Designation
                                    </label>
                                    <input
                                        type="number"
                                        id="Designation"
                                        className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                                        placeholder="Designation"
                                    />
                                </div>

                                <div className="mb-5">
                                    <label
                                        htmlFor="Rating"
                                        className="block mb-1 text-md font-medium text-gray-900"
                                    >
                                        Rating
                                    </label>
                                    <input
                                        type="number"
                                        id="Rating"
                                        className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                                        placeholder="Rating"
                                    />
                                   
                                </div>

                                <div className="mb-5">
                                    <label
                                        htmlFor="Order"
                                        className="block mb-1 text-md font-medium text-gray-900"
                                    >
                                        Order
                                    </label>
                                    <input
                                        type="number"
                                        id="Order"
                                        className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                                        placeholder="Order"
                                    />
                                    
                                </div>

                                <div className="mb-5">
                                    <label
                                        htmlFor="Message"
                                        className="block mb-1 text-md font-medium text-gray-900"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="Message"
                                        className="text-[19px] resize-none h-[100px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                                        placeholder="Message"
                                    > </textarea>
                                    
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="focus:outline-none my-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-5"
                        >
                            Add Testimonial
                        </button>
                    </form>
                </div>
            </div>
        </section>
    </>
  )
}
