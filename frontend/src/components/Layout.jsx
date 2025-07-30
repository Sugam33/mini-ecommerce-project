import React, { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Layout = () => {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // 'user' or 'admin'
  const isLoggedIn = Boolean(token);

  const handleLogout = () => {
    localStorage.clear();
    setCart([]); // Clear cart from context state
    navigate('/login');
  };

  // Determine Dashboard route based on role
  const dashboardRoute = role === 'admin' ? '/admin' : '/user';

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">Sugam Ko Pasal</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav me-3">
              <li className="nav-item">
                <Link className="nav-link" to="/allproducts">All Products</Link>
              </li>

              {isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to={dashboardRoute}>Profile</Link>
                </li>
              )}

              {!isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Signup</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                </>
              )}

              {isLoggedIn && (
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link text-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>

            {/* Cart Button */}
            {isLoggedIn && (
              <button
                className="btn btn-outline-light position-relative"
                onClick={() => navigate('/cart')}
              >
                <i className="bi bi-cart-fill"></i>
                {cart.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart.length}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="layout-main container flex-grow-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4 mt-auto">
        <p className="mb-0">© {new Date().getFullYear()}All rights reserved.</p>
        <p className="mb-0">Created By Sugam</p>
      </footer>
    </div>
  );
};

export default Layout;
