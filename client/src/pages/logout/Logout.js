import './logout.css'

export default function Logout() {
    return (
        <div className="logout">
            <h1 className="logoutTitle">Logout</h1>
            <form className="logoutForm">
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button className="logoutBtn">Logout</button>
                <button className="loginBtn">Login</button>
            </form>
        </div>
    )
}
