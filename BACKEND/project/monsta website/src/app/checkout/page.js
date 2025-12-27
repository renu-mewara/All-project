'use client'
import React, { use, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import "../globals.css";
import Link from 'next/link';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRazorpay} from "react-razorpay";


export default function page() {
    const [buttonloading, setbuttonloading] = useState(false);
      const { error, isLoading, Razorpay } = useRazorpay();


    const paymenthandler = (event) => {
        event.preventDefault()
        setbuttonloading(true)
        var ordersave = {
            name: event.target.name.value,
            mobile_number: event.target.mobile_number.value,
            billing_address: {
                name: event.target.billing_name.value,
                email: event.target.billing_email.value,
                mobile_number: event.target.billing_mobile.value,
                address: event.target.billing_address.value,
                country: event.target.country_name.value,
                state: event.target.billing_state.value,
                city: event.target.billing_city.value,
            },
            shipping_address: {
               name: event.target.billing_name.value,
                email: event.target.billing_email.value,
                mobile_number: event.target.billing_mobile.value,
                address: event.target.billing_address.value,
                country: event.target.country_name.value,
                state: event.target.billing_state.value,
                city: event.target.billing_city.value,
            },
            order_note: event.target.order_note.value,
            product_info: [{
                id: 1,
                name: 'user',
                description: 'usering',
                image: '1.jpg',
                price: 300,
                quantity: 2
            },
            {
                id: 2,
                name: 'user',
                description: 'usering',
                image: '1.jpg',
                price: 300,
                quantity: 2
            }],
            total_amount: 1000,
            discount_amount: 200,
            final_amount: 800,
            payment_type: "online",
        }
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/order/place-order`, ordersave,{
            headers: {
                authorization: `Bearer ${Cookies.get('user_login')}`
            }
            
        })
            .then((response) => {
                console.log(response.data);
                setbuttonloading(false)
                PaymentComponent(response.data._data);
                
            })
            .catch((error) => {
                toast.error('There was an error!', error);
                setbuttonloading(false)
            });

    }
    const PaymentComponent = (orderInfo) => {

    const options = {
      key: `${process.env.NEXT_PUBLIC_API_URL_YOUR_RAZORPAY_KEY}`, // Enter the Key ID generated from the Dashboard
      amount: orderInfo.final_amount*100, // Amount in paise
      currency: "INR",
      name: "Test Company",
      description: "Test Transaction",
      order_id: orderInfo.order_id, // Generate order_id on server
      handler: (response) => {
        console.log(response);
        toast("Payment Successful!");
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  };


    return (
        <>
            <Container fluid className='breadcrumbs_area'>
                <Container className='breadcrumb_content'>
                    <Row>
                        <Col lg={12}>
                            <h3>Checkout</h3>
                            <ul className='p-0'>
                                <li><Link href="/">home</Link></li>
                                <li>&gt;</li>
                                <li>Checkout</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </Container>


            <section className='border-bottom border-1 pb-5'>
                <Container className='checkout_form'>
                    <Row>
                        <Form id='checkout_address' onSubmit={paymenthandler} autoComplete='off' noValidate='novalidate' className="bv-form">
                            <Button type='submit' style={{ display: "none", width: "0", height: "0" }}></Button>
                            <Row>
                                <Col lg={6} md={6}>
                                    <h3>Billing Details</h3>
                                    <Row>
                                        <Col lg={6} className='mb-20'>
                                            <div className="form-group has-feedback">
                                                <label htmlFor="name">Name*</label>
                                                <input type="text" className="form-control" id="name" name="name" defaultValue="" data-bv-field="name" /></div>
                                        </Col>

                                        <Col lg={6} className='mb-20'>
                                            <div className="form-group has-feedback">
                                                <label htmlFor="name">Mobile Number*</label>
                                                <input type="text" className="form-control numeric" id="mobile_number" maxLength="15" name="mobile_number" defaultValue="" data-bv-field="mobile_number" />
                                            </div>
                                        </Col>

                                        <Col lg={6} className='mb-20'>
                                            <div className="form-group has-feedback">
                                                <label htmlFor="name">Billing Name*</label>
                                                <input type="text" className="form-control" id="billing_name" name="billing_name" defaultValue="" data-bv-field="billing_name" />
                                            </div>
                                        </Col>



                                        <Col lg={6} className='mb-20'>
                                            <div className="form-group has-feedback">
                                                <label htmlFor="name">Billing Email*</label>
                                                <input type="text" className="form-control" id="billing_email" name="billing_email" defaultValue="" data-bv-field="billing_email" />
                                            </div>
                                        </Col>

                                        <Col xs={12} className='mb-20'>
                                            <div className="form-group has-feedback">
                                                <label htmlFor="name">Billing Mobile Number*</label>
                                                <input type="text" className="form-control numeric" id="billing_mobile" maxLength="15" name="billing_mobile" defaultValue="" data-bv-field="billing_mobile" />
                                            </div>
                                        </Col>

                                        <Col xs={12} className='mb-20'>
                                            <div className="form-group has-feedback">
                                                <label htmlFor="name">Billing Address*</label>
                                                <input type="text" className="form-control" name="billing_address" id="billing_address" defaultValue="" data-bv-field="billing_address" />
                                            </div>
                                        </Col>

                                        <Col xs={12} className='mb-20'>
                                            <div className="form-group has-feedback">
                                                <label htmlFor="name">Country*</label>

                                                <select name='country_name'
                                                    className='nice-select niceselect_option'>
                                                    <option>Select Country</option>
                                                    <option>India</option>
                                                    <option>Pakistan</option>
                                                    <option>China</option>
                                                </select>
                                            </div>
                                        </Col>

                                        <Col lg={6} className='mb-20'>
                                            <div className="form-group has-feedback">
                                                <label htmlFor="billing_state">State*</label>
                                                <input type="text" className="form-control" name="billing_state" id="billing_state" defaultValue="" data-bv-field="billing_state" />
                                            </div>
                                        </Col>

                                        <Col lg={6} className='mb-20'>
                                            <div className="form-group has-feedback">
                                                <label htmlFor="billing_city">City*</label>
                                                <input type="text" className="form-control" name="billing_city" id="billing_city" defaultValue="" data-bv-field="billing_city" />
                                            </div>
                                        </Col>

                                        <Col className='mb-20'>
                                            <input id="address" type="checkbox" data-bs-target="createp_account" />
                                            <label className="righ_0" htmlFor="address" data-bs-toggle="collapse" data-bs-target="#collapsetwo" aria-controls="collapseOne">Ship to a different address?</label>
                                        </Col>

                                        <Col xs={12} className='mb-20'>
                                            <div className="order-notes">
                                                <label htmlFor="order_note">Order Notes</label>
                                                <textarea id="order_note" name='order_note' rows="5" placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>


                                <Col lg={6} md={6}>
                                    <h3>Your order</h3>
                                    <div className="order_table table-responsive">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr>
                                                    <td> Caroline Study Tables <strong> × 1</strong></td>
                                                    <td> Rs. 2,500</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th>Cart Subtotal</th>
                                                    <td>Rs. 2,500</td>
                                                </tr>
                                                <tr>
                                                    <th>Discount (-)</th>
                                                    <td><strong>Rs. 0</strong></td>
                                                </tr>
                                                <tr className="order_total">
                                                    <th>Order Total</th>
                                                    <td><strong>Rs. 2,500</strong></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>

                                    <div className="order_button">
                                        <button type="submit" id="placeOrder"
                                            disabled={
                                                buttonloading
                                                    ?
                                                    'disabled'
                                                    :
                                                    ''
                                            }
                                        >{
                                                buttonloading
                                                    ?
                                                    'Loading...'
                                                    :
                                                    'Placed Order'
                                            }
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>

                    </Row>
                </Container>
            </section>
        </>
    )
}


