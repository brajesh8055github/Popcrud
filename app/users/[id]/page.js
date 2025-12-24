"use client";
import { useEffect,useState } from "react";
import { useRouter,useParams } from "next/navigation";
import api from "@/lib/axios"
export default function UseDetail(){
    const router = useRouter()
    const {id} = useParams();
    const[user,setUser] = useState(null)
    const[form, setForm] = useState({name:"",email:""})
    useEffect(()=>{
        api.get(`/users/${id}`).then((res)=>{
            setUser(res.data);
            setForm({
                name:res.data.name,
                email: res.data.email,
            })
        })
    },[id])

    const handleUpdate = async()=>{
        const prevUser = user;
        setUser({...user,...form})
        try{
            await api.put(`/users/${id}`,form)
            alert("User Updated")
        }catch{
            setUser(prevUser)
            alert("Upadted Failed")
        }
    }

    const handleDelete = async()=>{
        router.push("/users")
        try{
            await api.delete(`/users/${id}`)
        }catch{
            alert("Delete Failed")
        }
    }
    if(!user) return <p>Loading...</p>
    return(
        <div className="container">
            <h2>User Details</h2>
            <input type="text" value={form.name} onChange={(e)=>setFrom({...form, name:e.target.value})}/>
            <input type="email" value={form.email} onChange={(e)=>setFrom({...form, email:e.target.value})}/>
            <br/>
            <br/>
            <button className="primary" onClick={handleUpdate}>Update</button>
            <button className="danger" onClick={handleDelete}>Delete</button>
        </div>
    )
}