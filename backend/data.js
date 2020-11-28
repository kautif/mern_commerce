import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Autif',
            email: 'admin@example.com',
            password: bcrypt.hashSync('testtest', 8),
            isAdmin: true
        },
        {
            name: 'Customer',
            email: 'customer@example.com',
            password: bcrypt.hashSync('testtest', 8),
            isAdmin: false
        }
    ],
    products: [
        {
            name: 'Nike Dress Shirt',
            category: 'shirts',
            image: 'images/p1.jpg',
            price: 120,
            stock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product'    
        }, 
        {
            name: 'Adidas Dress Shirt',
            category: 'shirts',
            image: 'images/p2.jpg',
            price: 150,
            stock: 0,
            brand: 'Adidas',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product'    
        },
        {
            name: 'Lacoste Dress Shirt',
            category: 'shirts',
            image: 'images/p3.jpg',
            price: 179,
            stock: 3,
            brand: 'Lacoste',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product'    
        },
        {
            name: 'Nike Dress Pants',
            category: 'pants',
            image: 'images/p4.jpg',
            price: 135,
            stock: 14,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product'    
        },
        {
            name: 'Adidas Dress Pants',
            category: 'pants',
            image: 'images/p5.jpg',
            price: 120,
            stock: 9,
            brand: 'Adidas',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product'    
        },
        {
            name: 'Lacoste Dress Pants',
            category: 'pants',
            image: 'images/p6.jpg',
            price: 149,
            stock: 7,
            brand: 'Lacoste',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product'    
        }
    ]
}

export default data;