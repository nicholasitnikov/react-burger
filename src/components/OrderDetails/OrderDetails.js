import doneImage from '../../images/done.svg';


const OrderDetails = () => {
    return(
        <>  
            <p className="text text_type_digits-large pt-4 pb-8">83748</p>
            <p className="text text_type_main-medium">Идентификатор заказа</p>
            <img src={doneImage} alt='Заказ готов' className='mt-15 mb-15' />
            <p className="text text_type_main-default text_color_inactive pb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive pb-15">Дождитесь готовности на орбитальной станции</p>
        </>
    )
}


export default OrderDetails;