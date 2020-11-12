import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import axios from 'axios';
import Loading from '../components/Loading';
import AlertMessage from '../components/AlertMessage';

export default function HomeScreen () {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const {data} = await axios.get('/api/products');
                setLoading(false);
                setProducts(data);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }
        fetchData();
    }, []); 

    return (
        <div>
            {loading ? (
                <Loading></Loading>
            ) : error ? (
                <AlertMessage variant="danger">{error}</AlertMessage>
            ) : (
                <div className="row center">
                {
                    products.map(product => {
                    return <Product key={product._id} product={product}></Product>
                    })
                }
                </div>
            )}
        </div>
    )
}