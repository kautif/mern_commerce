import React from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

export default function OrderScreen (props){
    const cart = useSelector((state) => state.cart);
    if (!cart.paymentMethod) {
        props.history.push('/payment');
    }

    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    )
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice * cart.shippingPrice + cart.taxPrice;
    const orderHandler = () => {

    };

    return (
<div>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
    <div className="current-order">
        <div className="card card-body order-card">
            <h2>Shipping</h2>
            <p><strong>Name: </strong>{cart.shippingAddress.fullName}</p>
            <p><strong>Address: </strong>{cart.shippingAddress.address}, 
            {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}</p>
        </div>
        <div className="card card-body order-summary">
                <ul>
                    <li><h2>Order Screen</h2></li>
                    <li>
                        <div className="row">
                            <div><span>Items</span></div>
                            <div><span>${cart.itemsPrice.toFixed(2)}</span></div>
                        </div>
                    </li>
                    <li>
                        <div className="row">
                            <div><span>Shipping</span></div>
                            <div><span>${cart.shippingPrice.toFixed(2)}</span></div>
                        </div>
                    </li>
                    <li>
                        <div className="row">
                            <div><span>Tax</span></div>
                            <div><span>${cart.taxPrice.toFixed(2)}</span></div>
                        </div>
                    </li>
                    <li>
                        <div className="row">
                            <div><span>Order Total</span></div>
                            <div><span>${cart.totalPrice.toFixed(2)}</span></div>
                        </div>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={orderHandler}
                            className="primary block"
                            disabled={cart.cartItems.length === 0}>
                                Submit Order
                        </button>
                    </li>
                </ul>
        </div>
        <div className="card card-body order-card">
            <h2>Payment</h2>
            <p><strong>Method: </strong>{cart.paymentMethod}</p>
        </div>
        <div className="card card-body order-card">
            <h2>Order Items</h2>
            <ul>
                {
                    cart.cartItems.map((item) => (
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