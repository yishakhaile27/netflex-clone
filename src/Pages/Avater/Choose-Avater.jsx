import React, { useState, useEffect } from 'react';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../../Services/firebase';
import { Link, useNavigate } from 'react-router-dom';
import style from './Choose-Avater.module.css';
import "../../style/avater.css"
import logo from "../../Assets/Image/logo.png";

// Import avatar images
import avater_1 from '../../Assets/Image/Avater/Avater (1).jpg';
import avater_2 from '../../Assets/Image/Avater/Avater (2).jpg';
import avater_3 from '../../Assets/Image/Avater/Avater (3).jpg';
import avater_4 from '../../Assets/Image/Avater/Avater (4).jpg';
import avater_5 from '../../Assets/Image/Avater/Avater (5).jpg';
import avater_6 from '../../Assets/Image/Avater/Avater (6).jpg';
import avater_7 from '../../Assets/Image/Avater/Avater (7).jpg';
import avater_8 from '../../Assets/Image/Avater/Avater (8).jpg';
import avater_9 from '../../Assets/Image/Avater/Avater (9).jpg';
import avater_10 from '../../Assets/Image/Avater/Avater (10).jpg';
import avater_11 from '../../Assets/Image/Avater/Avater (11).jpg';
import avater_12 from '../../Assets/Image/Avater/Avater (12).jpg';
import avater_13 from '../../Assets/Image/Avater/Avater (13).jpg';
import avater_14 from '../../Assets/Image/Avater/Avater (14).jpg';
import avater_15 from '../../Assets/Image/Avater/Avater (15).jpg';
import avater_16 from '../../Assets/Image/Avater/Avater (16).jpg';
import avater_17 from '../../Assets/Image/Avater/Avater (17).jpg';
import avater_18 from '../../Assets/Image/Avater/Avater (18).jpg';
import avater_19 from '../../Assets/Image/Avater/Avater (19).jpg';
import avater_20 from '../../Assets/Image/Avater/Avater (20).jpg';
import avater_21 from '../../Assets/Image/Avater/Avater (21).jpg';
import avater_22 from '../../Assets/Image/Avater/Avater (22).jpg';
import avater_23 from '../../Assets/Image/Avater/Avater (23).jpg';
import avater_24 from '../../Assets/Image/Avater/Avater (24).jpg';
import avater_25 from '../../Assets/Image/Avater/Avater (25).jpg';
import avater_26 from '../../Assets/Image/Avater/Avater (26).jpg';
import avater_27 from '../../Assets/Image/Avater/Avater (27).jpg';
import avater_28 from '../../Assets/Image/Avater/Avater (28).jpg';
import avater_29 from '../../Assets/Image/Avater/Avater (29).jpg';
import avater_30 from '../../Assets/Image/Avater/Avater (30).jpg';

const avaters = [
  { src: avater_1, name: 'Smiley Red' },
  { src: avater_2, name: 'Smiley Green' },
  { src: avater_3, name: 'Smiley Yellow' },
  { src: avater_4, name: 'Smiley Blue' },
  { src: avater_5, name: 'Smiley Purple' },
  { src: avater_6, name: 'Panda Mask' },
  { src: avater_7, name: 'Superhero' },
  { src: avater_8, name: 'Penguin' },
  { src: avater_9, name: 'Chicken' },
  { src: avater_10, name: 'Masked Woman' },
  { src: avater_11, name: 'Berlin' },
  { src: avater_12, name: 'Sabrina Spellman' },
  { src: avater_13, name: 'Wednesday' },
  { src: avater_14, name: 'Viktor Hargreeves' },
  { src: avater_15, name: 'Beth Harmon' },
  { src: avater_16, name: 'Eleven' },
  { src: avater_17, name: 'Pablo Escobar' },
  { src: avater_18, name: 'Michael Scott' },
  { src: avater_19, name: 'Ross Geller' },
  { src: avater_20, name: 'Jeffrey Dahmer' },
  { src: avater_21, name: 'Sherlock Holmes' },
  { src: avater_22, name: 'Kang Sae-Byeok' },
  { src: avater_23, name: 'Luffy' },
  { src: avater_24, name: 'Geralt of Rivia' },
  { src: avater_25, name: 'Thomas Shelby' },
  { src: avater_26, name: 'Assane Diop' },
  { src: avater_27, name: 'Daniel LaRusso' },
  { src: avater_28, name: 'Lucifer' },
  { src: avater_29, name: 'El Profesor' },
  { src: avater_30, name: 'Sully' },
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function ChooseAvater() {
  const [randomAvatars, setRandomAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const shuffledAvatars = shuffleArray([...avaters]);
    setRandomAvatars(shuffledAvatars.slice(0, 4));
  }, []);

  const handleCheckboxChange = (avatar) => {
    setSelectedAvatar(avatar);
    setErrors(null);
  };

  const handleSaveProfilePicture = async () => {
    const user = auth.currentUser;
    if (user && selectedAvatar) {
      try {
        const userDoc = doc(db, 'users', user.uid);
        await setDoc(userDoc, { avaterInfo: {picture: selectedAvatar.src,  name: selectedAvatar.name} }, { merge: true });
        navigate('/movies');
      } catch (error) {
        console.error('Error saving profile picture:', error);
        setErrors('Failed to save profile picture');
      }
    } else {
      setErrors('Avatar not selected');
    }
  };

  return (
    <div className={style.avater}>
      <nav>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </nav>
      <div className={style.avatarContainer}>
        <h1>Choose your profile</h1>
        <div className="imageGrid">
          {randomAvatars.map((avatar, index) => (
            <div key={index} className={`${'imgContainer'} ${style.imgContainer}`}>
              <input
                className={`${'hiddenCheckbox'} ${style.hiddenCheckbox}`}
                type="checkbox"
                checked={selectedAvatar === avatar}
                onChange={() => handleCheckboxChange(avatar)}
                id={`img-${index}`}
              />
              <label htmlFor={`img-${index}`}>
                <img
                  src={avatar.src}
                  alt={avatar.name}
                />
                <p>{avatar.name}</p>
              </label>
            </div>
          ))}
        </div>
        <button onClick={handleSaveProfilePicture}>SAVE PROFILE</button>
      </div>
      {errors && <span className={style.error}>{errors}</span>}
    </div>
  );
}

export default ChooseAvater;
