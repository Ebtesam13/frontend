import { useDispatch } from "react-redux"
import success from "../../Images/success.png"
import { emptyCart } from "../../Store/action"
export function Success() {
 
    const dispatcher=useDispatch()
    dispatcher(emptyCart())
    return (
        <>

            <div className=" container w-75 m-auto text-center pt-5">
                <img src={success} width={200} height={200}></img>
                <br></br>
                <p className=' my-4'>
                    <strong>
                        Payment transaction done successfully, and your order have been placed
                    </strong>                
                    
                </p>
            </div>

        </>)
}