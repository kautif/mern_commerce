import React from 'react';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import { useDispatch, useSelector } from 'react-redux';
import SignInScreen from './screens/SignInScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import OrderScreen from './screens/OrderScreen';
import OrderPlacedScreen from './screens/OrderPlacedScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';

function App() {
    const cart = useSelector((state) => state.cart);
    const {cartItems} = cart;
    const userSignIn = useSelector((state) => state.userSignIn);
    const {userInfo} = userSignIn;
    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout());
    }

  return (
      <BrowserRouter>
        <div className="grid-container">
            <header className="row">
                <div>
                    <Link className="nav-title" to="/">MERN Commerce</Link>
                </div>
                <div>
                    <Link to="/cart">Cart
                    {cartItems.length > 0 && (
                        <span className="badge">{cartItems.length}</span>
                    )}
                    </Link>

                    {
                        userInfo ? (
                            <div className="dropdown">
                                <Link to="#">{userInfo.name}<i className="fa fa-caret-down"></i>{' '}
                                </Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/order_history">Order History</Link>
                                    </li>
                                    <li>
                                    <Link to="#signout" onClick={signoutHandler}>
                                        Sign Out
                                    </Link>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link to="/signin">Sign In</Link>       
                        )
                    }
                </div>
            </header>
            <main>
                <Route path="/cart/:id?" component={CartScreen}></Route>
                <Route path="/product/:id" component={ProductScreen}></Route>
                <Route path="/register" component={RegisterScreen}></Route>
                <Route path="/signin" component={SignInScreen}></Route>
                <Route path="/shipping" component={ShippingScreen}></Route>
                <Route path="/payment" component={PaymentScreen}></Route>
                <Route path="/order" component={OrderScreen}></Route>
                <Route path="/order_history" component={OrderHistoryScreen}></Route>
                <Route path="/order_placed/:id" component={OrderPlacedScreen}></Route>
                <Route path="/" component={HomeScreen} exact></Route>
            </main>
            <footer className="row center">All Rights Reserved</footer>
        </div>
        </BrowserRouter>
  );
}

export default App;
