export default function Navbar(){
    return (
        <nav className="Navbar navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container">
                <a href="#" className="navbar-brand">Scanner App</a>

                <button className="navbar-toggler" type="button"
                data-bs-toggle="collapse" data-bs-target="#navmenu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                
                <div className="collapse navbar-collapse" id="navmenu">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a href="#scanner" className="nav-link">Scanner</a>
                        </li>
                        <li className="nav-item">
                            <a href="#editor" className="nav-link">Product editor</a>
                        </li>
                        <li className="nav-item">
                            <a href="#classAdder" className="nav-link">Product class adder</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}