import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import AlertMessage from '../components/AlertMessage';
import {orderDetails} from '../actions/orderActions';
import Loading from '../components/Loading';
import Axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2';

export default function OrderPlacedScreen (props){
    const orderID = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const placedOrderDetails = useSelector((state) => state.placedOrderDetails);
    const {order, loading, error} = placedOrderDetails;
    console.log("OrderPlacedScreen: ", placedOrderDetails);
    // const userSignIn = useSelector((state) => state.userSignin);
    // const { userInfo } = userSignIn;
    const dispatch = useDispatch();
    useEffect(() => {
        const addPayPalScript = async () => {
            const {data} = await Axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script);
        }
        if (!order._id) {
            dispatch(orderDetails(orderID));   
        } else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, order, orderID, sdkReady])

    const successPaymentHandler = () => {

    }
console.log("orderPlaced orderID: ", placedOrderDetails);
    return loading ? (<Loading></Loading>) :
    error ? (<AlertMessage variant="danger">{error}</AlertMessage>) : (
<div>
    <h1>Order {order._id}</h1>
    <div className="current-order">
        <div className="card card-body order-card">
            <h2>Shipping</h2>
            <p><strong>Name: </strong>{order.shippingAddress.fullName}</p>
            <p><strong>Address: </strong>{order.shippingAddress.address}, 
            {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
            {order.isDelivered ? (
             <AlertMessage variant="success">
                 Delivered at {order.deliveredAt}
            </AlertMessage>
        ) : (
            <AlertMessage variant="danger">Not Delivered</AlertMessage>
        ) }
        </div>
        <div className="card card-body order-summary">
                <ul>
                    <li><h2>Order Screen</h2></li>
                    <li>
                        <div className="row">
                            <div><span>Items</span></div>
                            <div><span>${parseFloat(order.itemsPrice).toFixed(2)}</span></div>
                        </div>
                    </li>
                    <li>
                        <div className="row">
                            <div><span>Shipping</span></div>
                            <div><span>${parseFloat(order.shippingPrice).toFixed(2)}</span></div>
                        </div>
                    </li>
                    <li>
                        <div className="row">
                            <div><span>Tax</span></div>
                            <div><span>${parseFloat(order.taxPrice).toFixed(2)}</span></div>
                        </div>
                    </li>
                    <li>
                        <div className="row">
                            <div><span>Order Total</span></div>
                            <div><span>${parseFloat(order.totalPrice).toFixed(2)}</span></div>
                        </div>
                    </li>
                    {!order.isPaid && (
                        <li>
                            {!sdkReady ? (
                                <Loading></Loading>
                            ) : (
                                <PayPalButton
                                    amount={order.totalPrice}
                                    onSuccess={successPaymentHandler}
                                ></PayPalButton>
                            )}
                        </li>
                    )}
                </ul>
        </div>
        <div className="card card-body order-card">
            <h2>Payment</h2>
            <p><strong>Method: </strong>{order.paymentMethod}</p>
            {order.isPaid ? (
             <AlertMessage variant="success">
                 Paid at {order.paidAt}
            </AlertMessage>
        ) : (
            <AlertMessage variant="danger">Not Paid</AlertMessage>
        ) }
        </div>
        <div className="card card-body order-card">
            <h2>Order Items</h2>
            <ul>
                {
                    order.orderItems.map((item) => (
                        <li key={item.product}>
                            <div className="row">
                                <div>
                                    <img 
                                        src={item.image}
                                        alt={item.name}
                                        className="small"></img>
                                </div>
                                <div className="min-30">
                                    <Link to={`/product/${item.product}`}></Link>
                                </div>
                            </div>
                            <div>{item.qty} x ${item.price} = ${item.qty * item.price}</div>
                        </li>
                    ))
                }
            </ul>
        </div>
    </div>
</div>
    )
}