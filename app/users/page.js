"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/axios"
export default function UsersPage(){
    const[users, setUsers] = useState([])
    useEffect(()=>{
        api.get("/users").then((res)=> setUsers(res.data))
    },[])
    return(
        <div className="container">
            <h1>User List</h1>
            {users.map((user)=>(
                <div key={user.id}>
                    <p>{user.name} --{user.email}</p>
                    <Link href={`/users/${user.id}`}>
                    <button className="primary">View</button></Link>
                </div>
            ))}
            </div>
    )
}