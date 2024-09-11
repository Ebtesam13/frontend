import cart from '../../Images/cart.gif'


export function EmptyCart(props){
    return(
        <>
        <div className='mx-auto '>

        <div>
        <img src={cart} height={200} width={200} className='empty-cart ' ></img>
        </div>
        <p className='text-muted text-center'> Good food is always cooking! Go ahead, order some yummy items from the menu.</p>
        </div>
        </>)
        } 
