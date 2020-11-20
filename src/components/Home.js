import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return(
        <div className="container">
            <Link to="/register">
                <button type="button" class="btn btn-outline-primary">Register</button>
            </Link>
            <Link to="/login">
                <button type="button" class="btn btn-outline-primary">Login</button>
            </Link>
        </div>
    )
}

export default Home