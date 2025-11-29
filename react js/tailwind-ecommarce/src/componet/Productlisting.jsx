'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import Productcard from './Productcard'
import axios from 'axios'
import { toast } from 'react-toastify';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';

const sortOptions = [
  { name: 'Name(A to Z)', value: '1', current: true },
  { name: 'NAME(Z to A)', value: '2', current: false },
  { name: ' price:LOW TO HIGH ', value: '3', current: false },
  { name: 'price: HIGH TO LOW', value: '4', current: false },
  { name: ' DISCOUNTED Price: High to Low', value: '5', current: false },
  { name: ' DISCOUNTED Price: LOW to HIGH', value: '6', current: false },

]

const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'New Arrivals', checked: false },
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: true },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function Productlisting() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [categories, setcategories] = useState([]);
  const [brands, setbrands] = useState([]);
  const [products, setproducts] = useState([]);
 



  useEffect(() => {
    axios.get('https://wscubetech.co/ecommerce-api/categories.php')
      .then((result) => {
        setcategories(result.data.data)

      })
      .catch(() => {
        toast.error('somthing went wrong')
      })
  }, []);

  useEffect(() => {
    axios.get('https://wscubetech.co/ecommerce-api/brands.php')
      .then((result) => {
        setbrands(result.data.data)

      })
      .catch(() => {
        toast.error('somthing went wrong')
      })
  }, []);


     const [currentpage, setcurrentpage] = useState(1);
      const [totalpage, setTotalpage] = useState(0);
      const [sorting, setsorting] = useState(1);
      const [filterCategories, setFilterCategories] = useState([]);
      const [filterbrnds, setfilterbrands] = useState([]);
      const [priceFrom, setPriceFrom] = useState('');
     const [priceTo, setPriceTo] = useState('');
     const[Rating , setRating]= useState('');
       const[searchname , setsearchname]= useState('');
  useEffect(() => {
    
    axios.get('https://wscubetech.co/ecommerce-api/products.php', {
      params: {
        page: currentpage,
        limit: 21,
        sorting: sorting,
        price_from: priceFrom,
        price_to: priceTo,
        discount_to: '',
        rating: Rating,
        brands: filterbrnds.toString(),
        categories: filterCategories.toString(),
        name: searchname,
      }
    })
      .then((result) => {
        setproducts(result.data.data)
        setTotalpage(result.data.total_pages)
        

      })
      .catch(() => {
        toast.error('somthing went wrong')
      })
  }, [currentpage , sorting ,filterbrnds, filterCategories, Rating, priceFrom, searchname ]);

  const filtersorting = (value) =>{
      setsorting(value)
      setcurrentpage(1)
  }

   const filterCategry = (slug) => {  
        if (filterCategories.includes(slug)) {
            var data = filterCategories.filter((v) => {
                if (v != slug) {
                    return v;
                }
            })
            setFilterCategories([...data]);
        } else {
            var data = [...filterCategories, slug];
            setFilterCategories(data);
        }
        setcurrentpage(1)
    }

     const filterbrand = (slug) => {
        if (filterbrnds.includes(slug)) {

            var data = filterbrnds.filter((v) => {
                if (v != slug) {
                    return v;
                }
            })

            filterbrand([...data]);

        } else {
            var data = [...filterbrnds, slug];
            setfilterbrands(data);
        }
        setcurrentpage(1)
    }
    const filterRating = (rate)=>{
      setRating(rate)
    }

    const priceFilter = (from, to) => {
        // setIsLoading(true)
        setPriceFrom(from)
        setPriceTo(to)
    }
    const getinputvalue=(event)=>{
      setsearchname(event.target.value)
      setcurrentpage(1)

    }

  

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                          <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  defaultValue={option.value}
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                  <input onKeyUp={getinputvalue}/>
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name} onClick = {()=> filtersorting(option.value)}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                            'block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden',
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                {/* categories filter */}
                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between         bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">categories</span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                        <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-4">
                      {categories.map((option, optionId) => (
                        <div key={optionId} className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input 
                                id={option.slug}
                                name="1"
                                type="checkbox"
                                onClick={() => filterCategry(option.slug)}
                                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                fill="none"
                                viewBox="0 0 14 14"
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                              >
                                <path
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="opacity-0 group-has-checked:opacity-100"
                                />
                                <path
                                  d="M3 7H11"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="opacity-0 group-has-indeterminate:opacity-100"
                                />
                              </svg>
                            </div>
                          </div>
                          <label htmlFor={option.slug} className="text-sm text-gray-600">
                            {option.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
                {/* brands filter */}
                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between         bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">brands</span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                        <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-4">
                      {brands.map((option, optionId) => (
                        option.name ?
                          <div key={optionId} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  onClick={() => filterbrand(option.slug)}
                                  id={option.slug}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label htmlFor={option.slug} className="text-sm text-gray-600">
                              {option.name}
                            </label>
                          </div>
                          : ''
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
                {/* prices filter */}
                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between         bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">price</span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                        <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div class="mb-3 filter-options" id="services-options">

                      <div class="custom-control custom-checkbox mb-3">
                        <input onClick={() => priceFilter(0, 250)} type="radio" name='price' class="custom-control-input me-2" id="0-250" />
                        <label class="custom-control-label" for="0-250">Rs.0 to Rs.250</label>
                      </div>
                      <div class="custom-control custom-checkbox mb-3">
                        <input onClick={() => priceFilter(251, 500)} type="radio" name='price' class="custom-control-input me-2" id="251-500" />
                        <label class="custom-control-label" for="251-500">Rs.251 to Rs.500</label>
                      </div>
                      <div class="custom-control custom-checkbox mb-3">
                        <input onClick={() => priceFilter(501, 750)} type="radio" name='price' class="custom-control-input me-2" id="501-750" />
                        <label class="custom-control-label" for="501-750">Rs.501 to Rs.750</label>
                      </div>
                      <div class="custom-control custom-checkbox mb-3">
                        <input onClick={() => priceFilter(751, 1000)} type="radio" name='price' class="custom-control-input me-2" id="751-1000" />
                        <label class="custom-control-label" for="751-1000">Rs.751 to Rs.1000</label>
                      </div>
                      <div class="custom-control custom-checkbox mb-3">
                        <input onClick={() => priceFilter(1001, '')} type="radio" name='price' class="custom-control-input me-2" id="1001" />
                        <label class="custom-control-label" for="1001">Rs.1001 and above</label>
                      </div>

                    </div>
                  </DisclosurePanel>
                </Disclosure>
                {/* discounted price filter */}
                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between         bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900"> Discounted price</span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                        <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div class="mb-3 filter-options" id="services-options">

                      <div class="custom-control custom-checkbox mb-3">
                        <input onClick={() => priceFilter(0, 20)} type="radio" name='price' class="custom-control-input me-2" id="0-20" />
                        <label class="custom-control-label" for="0-20">0-20%</label>
                      </div>
                      <div class="custom-control custom-checkbox mb-3">
                        <input onClick={() => priceFilter(21, 40)} type="radio" name='price' class="custom-control-input me-2" id="21-40" />
                        <label class="custom-control-label" for="21-40">21%-40%</label>
                      </div>
                      <div class="custom-control custom-checkbox mb-3">
                        <input onClick={() => priceFilter(41, 60)} type="radio" name='price' class="custom-control-input me-2" id="41-60" />
                        <label class="custom-control-label" for="41-60">41%-60%</label>
                      </div>
                      <div class="custom-control custom-checkbox mb-3">
                        <input onClick={() => priceFilter(61, 80)} type="radio" name='price' class="custom-control-input me-2" id="61-80" />
                        <label class="custom-control-label" for="61-80">61%-80%</label>
                      </div>
                      <div class="custom-control custom-checkbox mb-3">
                        <input onClick={() => priceFilter(81, 100)} type="radio" name='price' class="custom-control-input me-2" id="81-100" />
                        <label class="custom-control-label" for="81-100">81%-100%</label>
                      </div>

                    </div>
                  </DisclosurePanel>
                </Disclosure>
                {/* rating filter */}
                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between         bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">Rating</span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                        <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div class="mb-3 filter-options" id="services-options">

                      <div class="custom-control custom-checkbox mb-3">
                        <input onClick={() => filterRating(1)} type="radio" name='price' class="custom-control-input me-2" id="1" />
                        <label class="custom-control-label" for="1">1 and more</label>
                      </div>
                      <div class="custom-control custom-checkbox mb-3">
                        <input onClick={() => filterRating(2)} type="radio" name='price' class="custom-control-input me-2" id="2" />
                        <label class="custom-control-label" for="2">2 and more</label>
                      </div>
                      <div class="custom-control custom-checkbox mb-3">
                        <input onClick={() => filterRating(3)} type="radio" name='price' class="custom-control-input me-2" id="3" />
                        <label class="custom-control-label" for="3">3 and more</label>
                      </div>
                      <div class="custom-control custom-checkbox mb-3">
                        <input onClick={() => filterRating(4)} type="radio" name='price' class="custom-control-input me-2" id="4" />
                        <label class="custom-control-label" for="4">4 and more</label>
                      </div>
                      <div class="custom-control custom-checkbox mb-3">
                        <input onClick={() => filterRating(5)} type="radio" name='price' class="custom-control-input me-2" id="5" />
                        <label class="custom-control-label" for="81-100">5 and more</label>
                      </div>

                    </div>
                  </DisclosurePanel>
                </Disclosure>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                  {
                    products.map((v, i) => {
                      return (
                        <Productcard key={i} data={v} />
                      )
                    })
                  }


                </section>
                 <ResponsivePagination
              current={currentpage}
              total={totalpage}
              onPageChange={setcurrentpage}
            />

              </div>
            </div>
           
          </section>

        </main>
      </div>
    </div>
  )
}
