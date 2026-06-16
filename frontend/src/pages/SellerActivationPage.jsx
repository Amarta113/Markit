import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { server } from '../server.js'

export default function SellerActivationPage() {
    const { activation_token } = useParams()
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
        if(activation_token) {
            async function activationEmail() {
            try {
                await axios.post(`${server}/seller/activation`, {
                    activation_token,
                })
                setError(false)
                setMessage("Your account has been created successfully")
            } catch (error) {
                const errorMessage = error.response?.data?.message ?? 
                "Activation failed. Please register again to get a new link."
                setError(true)
                setMessage(errorMessage)
            }
        }
            activationEmail()
    }
    }, [activation_token]);
    return (
        <div style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <p>{message || (error ? "Activation failed" : "Activating account...")}</p>
        </div>
    )
}