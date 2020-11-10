import React from 'react';
import data from './data';

function App() {
  return (
        <div classNameName="grid-container">
            <header className="row">
                <div>
                    <a className="nav-title" href="/">MERN Commerce</a>
                </div>
                <div>
                    <a href="/cart">Cart</a>
                    <a href="/signin">Sign In</a>
                </div>
            </header>
            <main>
                <div className="row center">
                {
                  data.products.map(product => {
                    return <div key={product._id} className="card">
                        <a href={`/product/${product._id}`}>
                            <img className="medium" src={product.image} alt="product" />
                        </a>
                        <a href={`/product/${product._id}`}><h2>{product.name}</h2></a>
                        <div className="rating">
                            <span><i className="fa fa-star"></i></span>
                            <span><i className="fa fa-star"></i></span>
                            <span><i className="fa fa-star"></i></span>
                            <span><i className="fa fa-star"></i></span>
                            <span><i className="fa fa-star"></i></span>
                        </div>
                        <div className="price">
                            ${product.price}
                        </div> 
                    </div>
                    })
                }
                </div>
            </main>
            <footer className="row center">All Rights Reserved</footer>
        </div>
  );
}

export default App;
