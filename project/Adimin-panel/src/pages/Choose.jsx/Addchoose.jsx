import React from 'react'

export default function Addchoose() {
  return (
    <>
       <section className="w-full">
      <nav className="flex border-b-2" aria-label="Breadcrumb">
            <ol className="p-3 px-6 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center ">
                <a className="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600">
                  Home
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  /
                  <a className="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">Why Choose Us</a>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                </div>
              </li>
            </ol>
          </nav>
      {/* <Breadcrumb path={"Why Choose Us"} path2={updateIdState ? "Update" : "Add"} link={"/why-choose-us/view"} slash={"/"} /> */}

      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            
          </h3>
          <form  className="border border-t-0 p-3 rounded-b-md border-slate-400">
            <div className="flex gap-5">
              <div className="w-1/3">
                <label

                  className="block mb-0 text-md font-medium text-gray-900 ml-5"
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
                    className="block  text-md font-medium text-gray-900"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="Title"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Title"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="order"
                    className="block mb-0 text-md font-medium text-gray-900"
                  >
                    Order
                  </label>
                  <input
                    type="number"
                    id="order"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Order"
                  />
                </div>


                <div className="mb-5">
                  <label
                    htmlFor="Description"
                    className="block mb-0 text-md font-medium text-gray-900"
                  >
                    Description
                  </label>
                  <textarea
                    id="Description"
                    className="text-[19px] resize-none h-[100px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Description"
                  > </textarea>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="focus:outline-none my-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-5"
            >submit
            </button>
          </form>
        </div>
      </div>
    </section>
    </>
  )
}
