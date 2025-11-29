import React, { useEffect, useState } from 'react'
// import Breadcrumb from '../../common/Breadcrumb'
import { Link } from 'react-router-dom';
import { MdFilterAltOff, MdModeEdit, MdModeEditOutline } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { FaFilter } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';


export default function viewchoose() {

  let [activeFilter, setactiveFilter] = useState(true);
  const [choose, setchoose] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalpage, settotalpage] = useState(1);
  const [searchname, setsearchname] = useState('');
  const [checkboxvalue, setcheckboxvalue] = useState([]);
  const [buttonisable, setbuttondisable] = useState(true)
  const [apistatus, setapistatus] = useState(true)
    const [imageurl, setimageurl] = useState('')


  useEffect(() => {
    axios.post(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_CHOOSE_URL}/view`,{
      limit: 1,
      page: currentPage,
      name: searchname,
    })
      .then((result) => {
        if (result.data._status == true) {
          setchoose(result.data._data),
            settotalpage(result.data._paginate.total_pages);
          setimageurl(result.data._image_url);  



        } else {
          setchoose([]);
          settotalpage(1)
        }
      })
      .catch(() => {
        toast.error('Something went wrong !!');
      })
  }, [currentPage, searchname,  apistatus]);

  const searchhandler = (event) => {
    event.preventdefault();
    setCurrentPage(1)
    setsearchname(event.target.name.value)


  }
  const filterbyname = (event) => {
    setCurrentPage(1)
    setsearchname(event.target.value)
  }
  const filterbycode = (event) => {
    setCurrentPage(1)
  }
    useEffect(() => {
    if (checkboxvalue.length > 0) {
      setbuttondisable(false);
    } else {
      setbuttondisable(true);
    }
  }, [checkboxvalue]);

  const singlecheckbox = (id) => {
    if (checkboxvalue.includes(id)) {
      setcheckboxvalue(checkboxvalue.filter((item) => item !== id));
    } else {
      setcheckboxvalue([...checkboxvalue, id]);
    }
  };
  const allcheckbox = () => {
    if (checkboxvalue.length == choose.length) {
      setcheckboxvalue([])
    } else {
      setcheckboxvalue([])
      const ids = [];
      choose.forEach((v) => {
        ids.push(v._id);
      })

      setcheckboxvalue([...ids])

    }
  }

  const changestatus = ()=>{
    axios.post(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_CHOOSE_URL}/change-status`,{
      ids : checkboxvalue})
      .then((result) => {
        if (result.data._status == true) {
         toast.success(result.data._message)
         setapistatus(!apistatus)
         setcheckboxvalue([])
         setbuttondisable(true)

        } else {
          toast.error(result.data._message)
        }
      })
      .catch(() => {
        toast.error('Something went wrong !!');
      })
  
}
   const deleterecord = ()=>{
     axios.put(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_CHOOSE_URL}/delete`,{
      ids : checkboxvalue
    })
      .then((result) => {
        if (result.data._status == true) {
         toast.success(result.data._message)
         
         setapistatus(!apistatus)
         setcheckboxvalue([])
         setbuttondisable(true)

        } else {
          toast.error(result.data._message)
        }
      })
      .catch(() => {
        toast.error('Something went wrong !!');
      })
}
  return (
    <section className="w-full px-10">


      <div className={`bg-gray-50 px-2 py-8 max-w-[1220px] duration-[1s] mx-auto mt-10 ${activeFilter ? "hidden" : "block"}`}>

        <form className="flex " autoComplete='off' onSubmit={searchhandler}>
          <div className="relative me-2">
            <input
              type="text"
              id="name-search"
              name='name'
              onKeyUp={filterbyname}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search  name..." />
          </div>
          
          <button
            type="submit"
            className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentchoose"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>


      </div>
      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <div className='flex item-center justify-between bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400'>
            <h3 className="text-[26px] font-semibold" >
              View choose us
            </h3>
            <div className='flex justify-between '>
              <div onClick={() => setactiveFilter(!activeFilter)} className="cursor-pointer text-white mx-3 rounded-[50%] w-[40px] h-[40px] flex items-center justify-center bg-blue-700  border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {activeFilter ? <FaFilter className='text-[18px]' /> : <MdFilterAltOff className='text-[18px]' />}
              </div>

              <button type="button"
                onClick={changestatus}
                disabled={buttonisable}
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> Change Status</button>
              <button type="button"
              onClick={deleterecord}
               className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete </button>
            </div>
          </div>
          <div className="border border-t-0 rounded-b-md border-slate-400">

            {/* border-2 border-[red] */}
            <div className="relative overflow-x-auto">


              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="p-4">
                        <div class="flex items-center">
                          <input id="checkbox-all-search"
                            onClick={allcheckbox}
                            checked={checkboxvalue.length == choose.length ? 'checked' : ''}
                            type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                          <label for="checkbox-all-search" class="sr-only">checkbox</label>
                        </div>
                      </th>
                      <th scope="col" class="px-6 py-3">
                        title
                      </th>
                       <th scope="col" class="px-6 py-3">
                        Description
                      </th>
                      <th scope="col" class=" w-[8%] ">
                        image
                      </th>
                      <th scope="col" class=" w-[8%] ">
                        Order
                      </th>
                      <th scope="col" class="w-[11%]">
                        Status
                      </th>
                      <th scope="col" class="w-[6%]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      choose.length > 0
                        ?
                        choose.map((v, i) => {
                          return (
                            <tr class="bg-white  dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                              <td class="w-4 p-4">
                                <div class="flex items-center">
                                  <input id="checkbox-table-search-1"
                                    checked={checkboxvalue.includes(v._id)}
                                    onClick={() => singlecheckbox(v._id)}
                                    type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                  <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                </div>
                              </td>
                              <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <div class="py-4">
                                  <div class="text-base font-semibold">{v.name}</div>
                                </div>
                              </th>
                              <td class=" py-4">
                                {v.description}
                              </td>
                                <td class=" py-4">
                                {
                                  v.image
                                  ?
                                  <img class="w-10 h-10 rounded-full" src={`${imageurl}${v.image}`} />
                                  :
                                  'N/A'
                                }
                                
                              </td>
                              <td class=" py-4">
                                {v.order}
                              </td>
                              <td class=" py-4">
                                {
                                  v.status == 1
                                    ?
                                    <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mb-2">Active</button>
                                    :
                                    <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mb-2">Deactive</button>
                                }



                              </td>
                              <td class=" py-4">

                                <Link to={`/category/update/${v._id}`} >
                                  <div className="rounded-[50%] w-[40px] h-[40px] flex items-center justify-center text-white bg-blue-700  border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <MdModeEdit className='text-[18px]' />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                          )
                        })
                        :
                        <tr class="bg-white dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td colSpan={6} class="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white text-center">
                            <div class="text-base font-semibold">No Record Found !!</div>
                          </td>
                        </tr>
                    }
                  </tbody>
                </table>
                <div className=' w-100px auto m-3'>
                  <ResponsivePagination
                    current={currentPage}
                    total={totalpage}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </div>


            </div>

          </div>
        </div>
      </div>



    </section>
  )
}
