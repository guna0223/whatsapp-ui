import "./css/Header.css";

function Header() {
    return (
        <div className="header">
            <div className="header-left">
                <span className="header-title">WhatsApp</span>
            </div>
            <div className="header-icons">
                <span className="header-icon"><i className="bi bi-camera-video"></i></span>
                <span className="header-icon"><i className="bi bi-search"></i></span>
                <span className="header-icon"><i className="bi bi-three-dots-vertical"></i></span>
            </div>
        </div>
    );
}

export default Header;
