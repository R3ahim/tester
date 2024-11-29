import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
// import { food_list ,moreExtra,sauceOrder} from "../../assets/assets";
        const url ="https://server.deltakebab.com"
// const attendData = async () => {
//     const response = await axios.get(url + '/api/cart/list');
//     return response.data;
//   };
export const StoreContext = createContext(null)
const StoreContextProvider = (props) =>{
    
    
    let [cartItems,setCartItems]= useState({});
    const navigate = useNavigate();
  
const email = localStorage.getItem('email');

    const [token,setToken] = useState("");
    
   const [food_list,setFoodList] = useState([])
   const [cartDatas,setCartDatas] = useState([])
   const filterData = cartDatas.filter((e)=>e?.email === email);

   
    const addToCart =async (itemId,data)=>{
        
    
        // console.log(data)
   

        if (!cartItems[itemId]){
            // console.log(food_list)
            setCartItems((prev)=>({...prev,[itemId]:1}))
            //  console.log(allData,'all data wil set')   
        
        
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId] + 1}))
            // console.log(allData,'snothi')

        }
        if (token) {
             await axios.post(url + '/api/cart/add',{itemId},{headers:{token}})
        }

    }
    const fetchCartData = async ()=>{
        const response = await axios.get(url + '/api/cart/list');
    
        // setCartDatas(response.data.data)
        setCartDatas(response.data.data);
        return(response.data.data)
    
       }
   const  addToCartBtn = async(items) =>{
    // console.log(items,55)

    if(token ){
                await axios.post(url + '/api/cart/addBtn',items,{headers:{token}})
                // console.log(items)

    }

     //  if(!size[sizeId]|| !size[meatId] || !size[sauceId] || !cartItems[itemId]){
    //     // setSize({size[sizeId]:sizeId,size[meatId]:meatId,size[sauceId]:sauceId})
    //     setSize((prev)=>({...prev,[itemId]:cartItems[itemId],sizeId:sizeId,sizePrice:sizePrice,meatId:meatId,sauceId:sauceId}));
    //     //  sizer={[itemId]:cartItems[itemId],sizeId:sizeId,sizePrice:sizePrice,meatId:meatId,sauceId:sauceId}
    //     //  console.log(sizer)
    //     console.log(size,'72')
    //     await axios.post(url + '/api/cart/addBtn',items)


    //  }
    //  else{
    //     setSize((prev)=>({...prev,[itemId]:cartItems[itemId] +1,sizeId:sizeId,meatId:meatId,sauceId:sauceId}));

    //     console.log(size,'76')
    //     await axios.post(url + '/api/cart/addBtn',items)
    // }
    navigate('/cart')
 
}
        

   
    const removeFromCart = async (itemId) =>{
        
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId] - 1}))

    if (token) {
        await axios.post(url + '/api/cart/remove',{itemId},{headers:{token}})
    }

    }
    const { data: jsonData, error2, isLoading2 ,refetch } = useQuery("jsonData", fetchCartData);

   const  getTotalCartAmount = ()=>{
    let totalAmount = 0;
    for(const item in cartItems )
    {
        if (cartItems[item] >0 ) {
            let itemInfo = filterData.find((product)=>product.itemId===item);
            if(itemInfo?.sizePrice == undefined){
                console.log('someting')
                
            }
            else{
                totalAmount += itemInfo?.sizePrice * cartItems[item] ;

            }
        }
      
    }
    // console.log(totalAmount)
    return totalAmount;
   }

   const fetchFoodList = async ()=>{
    const response = await axios.get(url + '/api/food/list');
    setFoodList(response.data.data)
   }
 
    
   const loadCartData = async(token) =>{
       const response = await axios.post(url + "/api/cart/get",{},{headers:{token}});
       setCartItems(response.data.cartData)
    
   }


// console.log({size},'form 117')

      useEffect(()=>{

         async function loadData() {
            await fetchFoodList();
            await fetchCartData();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
            }
         }
         loadData();
      },[])
      refetch()

    //   console.log(n,'n will apear hear')

    const contextValue= {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,token,setToken,addToCartBtn,filterData,fetchCartData
    
    

    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
             
        </StoreContext.Provider>
    )
  
}
export default StoreContextProvider;

