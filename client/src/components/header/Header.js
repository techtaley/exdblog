import './header.css'

export default function Header() {
    return (
        <div className="header">
            <div className="headerTitle">
                <span className="headerSmall">Insights from </span>
                <span className="headerLarge">Tech Taley</span>
            </div>
            <img 
                className="headerBanner"
                src="https://images.pexels.com/photos/682952/pexels-photo-682952.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1920"
                alt="Tech Taley pic"
            />
        </div>
    )
}