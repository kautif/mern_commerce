import React, { useEffect } from 'react';
import Product from '../components/Product';
import Loading from '../components/Loading';
import AlertMessage from '../components/AlertMessage';

import {useDispatch, useSelector} from 'react-redux';
import {listProducts} from '../actions/productActions';

export default function HomeScreen () {
    // const [products, setProducts] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(false);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setLoading(true);
    //             const {data} = await axios.get('/api/products');
    //             setLoading(false);
    //             setProducts(data);
    //         } catch (err) {
    //             setError(err.message);
    //             setLoading(false);
    //         }
    //     }
    //     fetchData();
    // }, []); 

const dispatch = useDispatch();
const productList = useSelector((state) => state.productList);
let {loading, error, products} = productList;

if (loading === false) {
    console.log(productList);
    products = productList.product;
}

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch]); 

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