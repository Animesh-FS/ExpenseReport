import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Header from '../header/index'
import SideBar from '../sidebar/index'
import { connect } from 'react-redux'
import { setBudget } from '../../action/budget'
import { setCategory } from '../../action/category'
function SettingsPage(props) {

    const [budgetAmount, setbudgetAmount] = useState(props.budget)
    const [categoriesName, setcategoriesName] = useState('')
    const [arrayData, setarrayData] = useState(props.category)
    const [show, setshow] = useState(false)
    const [deleteItem, setdeleteItem] = useState('')


    const handleShow = (item) => {
        // setshow({ show: true, deleteItem: item })
        setshow(true)
        setdeleteItem(item)
    }
    const handleClose = () => {
        // setshow({ show: false, deleteItem: '' })
        setshow(true)
        setdeleteItem('')
    }

    const handleInput = (e, type) => {
        setcategoriesName(
            e.target.value
        )
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        // console.log('update Budget clicked', budgetAmount) 
        props.setBudget(budgetAmount)
    }

    const handleCategories = (e) => {
        if (categoriesName !== "") {
            let tempArr = arrayData.slice();
            tempArr.push(categoriesName)
            setarrayData(tempArr)
            props.setCategory(categoriesName)
        }
        setcategoriesName('')   
    }

    const deleteClicked = (item) => {
        var tempArr = arrayData.slice();
        var index = tempArr.findIndex(data => data === item)
        tempArr.splice(index, 1)
        setarrayData(tempArr)
        setshow(false)

    }
    return (
        <div>
            <Header />
            <div>
                <SideBar />
                <div style={{ textAlign: "center" }}>
                    <div className="totalBudget" >
                        <label style={{ margin: '15px', fontWeight: 'bold', fontSize: '25px' }}>Total Budget </label>
                        <input style={{}}
                            type="number" value={budgetAmount}
                            onChange={e => setbudgetAmount(e.target.value)}
                            name="budgetAmount"

                        // disabled = {balanceCheck ? true : false}
                        />
                        <button className="btn btn-success" onClick={(e) => handleUpdate(e)}  >
                            Update
                        </button>

                    </div>

                    <div className="categories" style={{ marginTop: '60px' }}>
                        <label style={{ margin: '15px', fontWeight: 'bold', fontSize: '25px' }}>Categories</label>
                        <input style={{}}
                            type="text"
                            name="categoriesName"
                            onChange={e => handleInput(e)}
                            // disabled = {balanceCheck ? true : false}
                            placeholder='categories name here'
                            required
                            value={categoriesName}
                        />
                        <button className="btn btn-success" onClick={handleCategories}  >
                            Add
                        </button>
                    </div>
                    <div className="items" style={{ marginTop: '60px', marginLeft: '15%', padding: '15px' }}>

                        <table className="table table-striped table-bordered ">
                            <thead className=" header thead-dark ">
                                <tr>
                                    <th className="text-center">Categories </th>
                                    <th className="text-center">Action </th>
                                </tr>
                            </thead>
                            <tbody>
                                {arrayData.map((data, i) => {
                                    return <tr key={i} >
                                        <td>{data}</td>
                                        {/* <td> <i class="fa fa-trash" onClick={()=>this.deleteClicked(data)}> </i ></td> */}
                                        <td><button className="btn btn-danger" onClick={() => handleShow(data)}>Delete</button></td>

                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Expense</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><div><label>Are you sure want to delete {deleteItem} category</label></div></Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-success" onClick={handleClose}>
                                Close
                        </button>
                            <button className="btn btn-primary" onClick={() => deleteClicked(deleteItem)}>
                                Delete
                        </button>
                        </Modal.Footer>
                    </Modal>
                </div>

            </div>

        </div>



    )
}


const mapStateToProps = state => ({
    budget: state.budget,
    category: state.category
})

export default connect(mapStateToProps, { setBudget, setCategory })(SettingsPage);