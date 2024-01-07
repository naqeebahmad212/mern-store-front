import React, { Fragment, useEffect, useState } from 'react'
import './Home.css'
import { MdFrontHand, MdMouse } from 'react-icons/md'
import ProductCard from '../../components/cards/productCard'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {server} from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { addAdminProducts, addProduct } from '../../redux/productSlice/productSlice'
import { toast } from 'react-toastify'
import { Pagination } from '@mui/material'
import Appstore from '../../images/Appstore.png'
import Shoe from '../../images/imani-bahati-LxVxPA1LOVM-unsplash.jpg'
import garment from '../../images/lumin-1mp7rF7_j2I-unsplash.jpg'
import drip from '../../images/kadarius-seegars-Mxy5gokl8mE-unsplash.jpg'
import salePic from '../../images/Gradient Seasonal Sale Banner (2).png'
import Watch from '../../images/shreesha-bhat-lz6z9GZu8hk-unsplash.jpg'



const Home = () => {



    const navigate=useNavigate()

    const dispatch=useDispatch()
    const [productPerPage, setProductPerPage]=useState()
    const [totalProducts, setTotalProducts]=useState()
    const [page,setPage]=useState(1)
    const requiredPage=Math.ceil(totalProducts / productPerPage)
    useEffect(()=>{
        axios.get(`${server}/products?page=${page}`)
        .then((res)=>{
            dispatch(addProduct(res.data.products))
            setProductPerPage(res.data.perPage)
            setTotalProducts(res.data.totalCount)
        })
        .catch((err)=>{
            toast.error(err.message)
        })
    },[dispatch,page])
    
    const {products}=useSelector(state=> state.product)


    const pageHandler=(e,p)=>{
        setPage(p)
    }

    const searchCaetogry=(shoe)=>{
    
      navigate('/category/'+shoe) 
    }

  return (
    <Fragment>
        <div className="container-fuild">
            <div className="front-container ">
                <div className='front-content'>
                <h3 className='w-100'>Find Out Amzing Products</h3>
                <button> <a href="#product-container">Scroll</a> <MdMouse /></button>
                </div>
            </div>

                <h2 className='w-100 text-center'>Categories</h2>
            <div className="category-display w-100 d-flex ">
                <div onClick={()=> searchCaetogry('Bottom')}>
                <div className='category-shap'> <img src={Shoe} alt="" /></div>
                </div>


                <div onClick={()=> searchCaetogry('Laptop')}> 
                <div className='category-shap'><img src={drip} alt="" /></div>
                </div>


                <div onClick={()=> searchCaetogry('Tops')}> 
                <div className='category-shap'> <img src={garment} alt="" /> </div>
                </div>


                <div onClick={()=> searchCaetogry('Camera')}> 
                <div className='category-shap'><img src={Watch} alt="" /></div>
                </div>

            </div>

            <div className="container">
                <div className="product-title"><h3 className='text-center mt-4'>Featured Products</h3> <hr className='w-50' /></div>
                <div id='product-container' className="product-container d-flex flex-wrap mt-5 justify-content-center">
                    {products && products.map(product => ( 
                        
                        <Link key={product._id} to={`product/${product._id}`} className='text-dark'><ProductCard product={product}/></Link>
                    ))}

                    <div className='w-100 d-flex justify-content-center mt-3'>
                    {page <= requiredPage && <Pagination 
                    count={requiredPage}
                    onChange={pageHandler}
                    page={page}
                    
                    />
                }
                        </div> 
                </div>
            </div>

            <div className='w-100 vh-100'></div>
        </div>
    </Fragment>
  )
}

export default Home