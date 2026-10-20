import React, { useState, useEffect, useRef, useCallback } from 'react';
import style from "./Movie_Nav.module.css";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from '../../Services/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { AiOutlineSearch } from "react-icons/ai";
import { FaCircleUser, FaBars, FaList } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoMdSettings, IoIosTv } from "react-icons/io";
import { PiSignOutBold } from "react-icons/pi";
import { GoHomeFill } from "react-icons/go";
import { MdMovie } from "react-icons/md";
import logo from '../../Assets/Image/logo.png';

function MovieNav() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturename, setProfilePicturename] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchOpenButton, setIsSearchOpenButton] = useState(true);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isOpenNav, setOpenNav] = useState(false);
  const dropdownRef = useRef(null);
  const navDropdownRef = useRef(null);

  useEffect(() => {
    const fetchProfileData = async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setProfilePicture(data.avaterInfo?.picture);
          setProfilePicturename(data.avaterInfo?.name);
          setUsername(data.username);
          setEmail(data.email);
        }
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      fetchProfileData(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/logout');
  };

  const handleSearchIconClick = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsSearchOpenButton(!isSearchOpenButton);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchTerm.trim();
    if (query) {
      navigate(`/movies/filter?query=${encodeURIComponent(query)}`);
    }
  };

  const handleClickOutside = useCallback((event) => {
    if (
      dropdownRef.current && !dropdownRef.current.contains(event.target) &&
      navDropdownRef.current && !navDropdownRef.current.contains(event.target)
    ) {
      setOpen(false);
      setOpenNav(false);
      // Uncheck the openSidebarMenu checkbox
      const checkbox = document.getElementById('openSidebarMenu');
      if (checkbox) {
        checkbox.checked = false;
      }
    }
  }, [dropdownRef, navDropdownRef]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const OpenNav = () => {
    setOpenNav(!isOpenNav);
    document.getElementById('openSidebarMenu').checked = !isOpenNav;
  };

  return (
    <div className={style.nav}>
      <div>
        <input type="checkbox" className={style.openSidebarMenu} id="openSidebarMenu" onClick={OpenNav} />
        <label htmlFor="openSidebarMenu" className={style.sidebarIconToggle}>
          <div className={`${style.spinner} ${style.diagonal} ${style.part_1}`}></div>
          <div className={`${style.spinner} ${style.horizontal}`}></div>
          <div className={`${style.spinner} ${style.diagonal} ${style.part_2}`}></div>
        </label>
      </div>
      <Link to="/"><img className={style.logo} src={logo} alt='Logo' /></Link>
      <ul className={style.nav_text}>
        <li><Link to="/movies"><p>Home</p></Link></li>
        <li><Link to="/movies/film"><p>Movies</p></Link></li>
        <li><Link to="/movies/tv"><p>TV Shows</p></Link></li>
        <li><Link to="/movies/my-list"><p>My List</p></Link></li>
      </ul>
      <ul className={style.nav_icon}>
        <li className={style.search}>
          {isSearchOpen && (
            <form onSubmit={handleSearchSubmit} className={style.search_form}>
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={style.search_input}
              />
              <button type='submit' className={style.search_button}>
                <AiOutlineSearch />
              </button>
            </form>
          )}
          {isSearchOpenButton && (
            <button onClick={handleSearchIconClick} className={style.search_button}>
              <AiOutlineSearch />
            </button>
          )}
        </li>
        <li className={style.profile} ref={dropdownRef}>
          {profilePicture ? (
            <div>
              <img className={style.profile_img} src={profilePicture} alt="Profile" onClick={() => setOpen(!open)} />
            </div>
          ) : (
            <div className={style.profile_icon} onClick={() => setOpen(!open)}><FaCircleUser /></div>
          )}
          {open && (
            <div className={style.profile_dropdown_menu}>
              <ul className={style.profile_dropdown}>
                <li className={style.profile_dropdown_user}>
                  <div>
                    {profilePicture ? (
                      <div className={style.avater_img}>
                        <img src={profilePicture} alt="Profile" />
                      </div>
                    ) : (
                      <div className={style.avater_icon}>
                        <FaCircleUser />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3>{username} {profilePicturename ? (<span>({profilePicturename})</span>) : null}</h3>
                    <p>{email}</p>
                  </div>
                </li>
                <div className={style.br}></div>
                <ul className={style.profile_dropdown_list}>
                  <li>
                    <Link to="/choose-avater"><FaUser /> <p>Change Profile</p></Link>
                  </li>
                  <li>
                    <Link to="/movies/my-list"><FaList /> <p>My List</p></Link>
                  </li>
                  <li>
                    <Link to="/profile"><IoMdSettings /> <p>Settings</p></Link>
                  </li>
                </ul>
                <div className={style.br}></div>
                <ul className={style.profile_dropdown_list}>
                  <li>
                    <button type="button" onClick={handleSignOut}><PiSignOutBold /> <p>Sign Out</p></button>
                  </li>
                </ul>
              </ul>
            </div>
          )}
        </li>
      </ul>

      <div className={style.navbar}>
        <div ref={navDropdownRef}>
        {isOpenNav && (
          <div className={style.nav_dropdown_menu}>
            <div className={style.navbar_dropdown}>
              <div className={style.navbar_dropdown_list}>
                <div>
                  <form onSubmit={handleSearchSubmit} className={style.search_form}>
                    <input
                      type="text"
                      placeholder="Search movies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={style.search_input}
                    />
                    <button type='submit' className={style.search_button}>
                      <AiOutlineSearch />
                    </button>
                  </form>
                  <ul className={style.profile_dropdown_list}>
                    <li>
                      <Link to="/movies"><GoHomeFill /> <p>Home</p></Link>
                    </li>
                    <li>
                      <Link to="/movies/film"><MdMovie /> <p>Movies</p></Link>
                    </li>
                    <li>
                      <Link to="/movies/tv"><IoIosTv /> <p>TV Shows</p></Link>
                    </li>
                  </ul>
                  <div className={style.br}></div>
                  <ul className={style.profile_dropdown_list}>
                    <li>
                      <Link to="/choose-avater"><FaUser /> <p>Change Profile</p></Link>
                    </li>
                    <li>
                      <Link to="/movies/my-list"><FaList /> <p>My List</p></Link>
                    </li>
                    <li>
                      <Link to="/profile"><IoMdSettings /> <p>Settings</p></Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className={`${style.profile_dropdown_list} ${style.profile_dropdown_logout}`}>
                    <li>
                      <button type="button" onClick={handleSignOut}><PiSignOutBold /> <p>Sign Out</p></button>
                    </li>
                    <div className={style.br}></div>
                    <li className={style.profile_dropdown_user}>
                      <div>
                        {profilePicture ? (
                          <div className={style.avater_img}>
                            <img src={profilePicture} alt="Profile" />
                          </div>
                        ) : (
                          <div className={style.avater_icon}>
                            <FaCircleUser />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3>{username} {profilePicturename ? (<span>({profilePicturename})</span>) : null}</h3>
                        <p>{email}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}</div>
      </div>
    </div>
  );
}

export default MovieNav;
