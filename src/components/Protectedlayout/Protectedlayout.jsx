import React , {useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Protectedlayout({children , authentication = true}) {
    const navigate = useNavigate()
    const[loading , setLoading] = useState(true)
    const authStatus = useSelector((state)=> state.auth.status)

    useEffect(()=>{
        if(authentication && authStatus!=authentication){
            navigate("/")
        } else if (!authentication && authStatus!=authentication){
            navigate("/profile")
        }

        setLoading(false)
    },[navigate , authStatus , authentication])

  return loading ? <div>Loading...</div> : <>{children}</>
    

}
