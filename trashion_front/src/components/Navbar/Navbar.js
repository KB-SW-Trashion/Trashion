import React from 'react';
import styles from './Navbar.module.css';
import logo from 'assets/image/logo.png';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import authState from './../../store/authState';
export default function Navbar() {
  const user = useRecoilValue(authState);
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.logobox}>
        <div className={styles.buttonbox}>
          <Link to="/">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="humbleicons hi-chats">
              <path
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.882 15C13.261 15 16 12.538 16 9.5S13.261 4 9.882 4C6.504 4 3.765 6.462 3.765 9.5c0 .818.198 1.594.554 2.292L3 15l3.824-.736c.9.468 1.944.736 3.058.736z"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.804 18.124a6.593 6.593 0 003.314.876 6.623 6.623 0 003.059-.736L21 19l-1.32-3.208a5.02 5.02 0 00.555-2.292c0-1.245-.46-2.393-1.235-3.315-.749-.89-1.792-1.569-3-1.92"
              />
              <circle xmlns="http://www.w3.org/2000/svg" r="1" fill="currentColor" transform="matrix(-1 0 0 1 13 9.5)" />
              <circle xmlns="http://www.w3.org/2000/svg" r="1" fill="currentColor" transform="matrix(-1 0 0 1 10 9.5)" />
              <circle xmlns="http://www.w3.org/2000/svg" r="1" fill="currentColor" transform="matrix(-1 0 0 1 7 9.5)" />
            </svg>
          </Link>
          <div
            className={styles.icon_wrap}
            onClick={() => {
              navigate('/new');
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="humbleicons hi-pencil">
              <path
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.5 7.5l3 3M4 20v-3.5L15.293 5.207a1 1 0 011.414 0l2.086 2.086a1 1 0 010 1.414L7.5 20H4z"
              />
            </svg>
          </div>
          <Link to="/">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="humbleicons hi-heart">
              <path
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8c-1.574-1.635-4.46-2.135-6.035-.5-1.573 1.635-1.34 3.836 0 5.752C7.306 15.168 9.41 16.89 12 19c2.59-2.11 4.694-3.832 6.035-5.748 1.34-1.916 1.573-4.117 0-5.752C16.46 5.865 13.574 6.365 12 8z"
              />
            </svg>
          </Link>

          {user.isLoggedIn ? (
            <Link to="/Mypage">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="humbleicons hi-user">
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 19v-1.25c0-2.071-1.919-3.75-4.286-3.75h-3.428C7.919 14 6 15.679 6 17.75V19m9-11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </Link>
          ) : (
            <Link to="/login">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="humbleicons hi-user">
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 19v-1.25c0-2.071-1.919-3.75-4.286-3.75h-3.428C7.919 14 6 15.679 6 17.75V19m9-11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </Link>
          )}
        </div>
        <Link to="/">
          <div className={styles.logo_wrap}>
            <img className={styles.logo} src={logo} />
          </div>
        </Link>
      </div>
    </>
  );
}
