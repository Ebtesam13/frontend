import { useState } from 'react'
import verifyLogo from '../../Images/check.png'
import verifiedLogo from '../../Images/verified.png'
import loading from '../../Images/loading.png'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useLocation } from 'react-router-dom';
import axios from 'axios'


export function Verification() {
    const [verified, setVerified] = useState(-1)
    const [clicked, setClicked] = useState(false)
    const location = useLocation();

  // Get the value of a specific query parameter
  const searchParams = new URLSearchParams(location.search);
  const myParam = searchParams.get('myParam');

  // Get all the query parameters as an object
  const allParams = Object.fromEntries(searchParams);

  console.log(allParams);
  const verify1 = async () => {
    var url =`http://127.0.0.1:8000/api/auth/get-token?token=${allParams.token}&email=${allParams.email}`

    try {

      const response = await axios.get(url);
      setVerified(0)
      verify2()
      
    } catch (error) {
    
    }
  };
  const verify2 = async () => {
    try {

      const response = await axios.post("http://127.0.0.1:8000/api/auth/verify-user-email",allParams);

      setVerified(1)
      
    } catch (error) {
    
    }
  };


    //Go from -1 to 1 -1 not verified, 0 first stage, 1 verified

    return (
        <>
            <div className=" container w-75 m-auto text-center pt-5">
                <div className={(verified===1?"invisible":"visible")}>
                <img src={verifyLogo} width={100} height={100}></img>
                <br></br>
                <button className='btn btn-success my-4' onClick={verify1}>
                    Click here to verify your email
                </button>
                </div>
                <div className={"alert alert-primary "+(verified===0?"visible":"invisible")} role="alert">
                    <div ><img src={loading} height={40}></img> Please wait..</div>
                    </div>
                    <div  className={"verified "+(verified===1?"visible":"invisible")} >
                        <img src={verifiedLogo} height={100} width={100}></img>
                        <br>
                        </br>
                    Congratulations! your email got verified now you can continue to <Link to="/customer/checkout"><strong className='text-success'>Checkout</strong></Link>  page.
                    </div>

                 

            </div>
        </>
    )
}