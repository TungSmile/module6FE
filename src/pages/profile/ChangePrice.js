import {Field, Form, Formik} from "formik";
import axios from "axios";
import Swal from "sweetalert2";


const ChangePrice = () => {
    return (
        <>
            <Formik initialValues={
                {
                    price: ''
                }
            }
                    onSubmit={(values) => {
                        const id = JSON.parse(localStorage.getItem("account")).id
                        axios.post('http://localhost:8080/userDetail/change-price/' + id, values)
                            .then(async (res) => {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Cập nhật thành công',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            })
                    }}
            >
                <Form>
                    <div style={{ marginTop: '85px'}}>
                        <Field
                        type='number'
                        name='price'
                        style={{
                            textAlign: 'center',
                            borderRadius: '7px',
                            padding: '7px',
                            margin: '10px',
                            outline: 'none'
                        }}
                        />
                        <button>Lưu</button>
                    </div>

                </Form>

            </Formik>
        </>
    )
}
export default ChangePrice