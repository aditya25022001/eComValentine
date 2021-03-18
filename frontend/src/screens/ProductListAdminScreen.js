import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProductsByAdmin } from '../actions/userActions'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import { ListGroup, Image, Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export const ProductListAdminScreen = ({history}) => {

    const productListByAdmin = useSelector(state => state.productListByAdmin)
    const { loading, error, products } = productListByAdmin

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const style={
        fontWeight:600,
        color:'black'
    }

    const rupee = String.fromCharCode(8377)

    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }
        else{
            if(!userInfo.isAdmin){
                history.push('/')
            }
            else{
                dispatch(listProductsByAdmin())
            }
        }
    },[dispatch, userInfo, history])

    return (
        <>
        <h3>Products We Have!</h3>
        {loading && <Loader/>}
        {error && <Message variant='danger'>{error}</Message>}
        <ListGroup>
            {products && 
                products.map(product =>(
                    <ListGroup.Item key={product._id}>
                        <Row md={8} sm={0}>
                            <Col md={4}>
                                <Image src={product.image} md={6} rounded/>
                            </Col>
                            <Col>
                                <Row><b style={style}>Category : </b> {product.category}</Row>
                                <Row><b style={style}>Title : </b> {product.name}</Row>
                                <Row><b style={style}>Publisher : </b> {product.publisher}</Row>
                                <Row><b style={style}>Description : </b> {product.description.split(" ").slice(0,20).toString().replace(/,/g,' ')}...</Row>
                                <Row><b style={style}>Price : </b> {rupee}{product.price}</Row>
                                <Row><b style={style}>In Stock : </b> {product.countInStock}</Row>
                                <Row className='my-3'>
                                    <LinkContainer to={`/admin/products/${product._id}/edit`}>
                                        <Button className='mx-2 rounded'>
                                            <i className="fas fa-edit"/>
                                        </Button>
                                    </LinkContainer>
                                    <Button className='rounded' variant='danger'>
                                        <i className="fas fa-trash"/>
                                    </Button>
                                </Row>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))
            }
            <Button className='btn btn-dark my-2'>Add Item</Button>
        </ListGroup>
        </>

    )
}
