import React from "react";
import style from "./home_section.module.css";
import tv from "../../Assets/Image/tv.png";
import pro from "../../Assets/Video/Netflix.m4v";
import phone from "../../Assets/Image/mobile-0819.jpg";
import poster from "../../Assets/Image/boxshot.png";
import load from "../../Assets/Image/download-icon.gif";
import kids from "../../Assets/Image/kids.png";
import Signup from "../Signup-check/Signup";

const HomeSection = () => {
    function toggleBox(boxId, buttonId) {
        const button = document.getElementById(buttonId);
        const clickedBox = document.getElementById(boxId);
        const allBoxes = document.querySelectorAll('.content');
        const allButtons = document.querySelectorAll('.toggleButton');

        allButtons.forEach(function (btn) {
            btn.innerHTML = '&#43;'; // Plus sign
        });

        allBoxes.forEach(function (box) {
            if (box !== clickedBox) {
                box.style.display = 'none';
            }
        });

        button.classList.toggle('toggle');

        if (button.classList.contains('toggle')) {
            button.innerHTML = '&#215;'; // Multiplication symbol
        } else {
            button.innerHTML = '&#43;'; // Plus sign
        }

        clickedBox.style.display = (clickedBox.style.display === 'none' || clickedBox.style.display === '') ? 'block' : 'none';
        const isTextClicked = clickedBox.contains(document.activeElement) && document.activeElement.nodeType === 1;

        if (isTextClicked) {
            button.innerHTML = '&#43;'; // Plus sign
        }
    }




return (
    <div className={style.section}>
        <div className={style.br}></div>

            <section className={`${style.intro} ${style.section1}`}>
                <div className={style.text}>
                    <h1>Enjoy on your TV</h1>
                    <p>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
                </div>
                <div className={style.Enjoy}>
                    <img src={tv}  alt="TV" />
                    <video src={pro} autoPlay loop muted></video>
                </div>
            </section>

        <div className={style.br}></div>

            <section className={`${style.intro} ${style.section2}`}>
                <div className={style.Downloadex}>
                    <img className={style.phone} src={phone} />
                    <div className={style.Download}>
                        <img className={style.poster} src={poster} />
                        <div className={style.detail}>
                            <h4>Stranger Things</h4>
                            <p>Downloading...</p>
                        </div>
                        <img className={style.icon} src={load} />
                    </div>
                </div>
                <div className={style.text}>
                    <h1>Download your shows to watch offline</h1>
                    <p>Save your favorites easily and always have something to watch.</p>
                </div>
            </section>

        <div className={style.br}></div>

            <section className={`${style.intro} ${style.section3}`}>
                <div className={style.text}>
                    <h1>Watch everywhere</h1>
                    <p>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
                </div>
            </section>

        <div className={style.br}></div>

            <section className={`${style.intro} ${style.section4}`}>
                <img className={style.kids} src={kids} alt="Kid Image" />
                <div className={style.text}>
                    <h1>Create profiles for kids</h1>
                    <p>Send kids on adventures with their favorite characters in a space made just for them—free with your membership.</p>
                </div>
            </section>

        <div className={style.br}></div>

            <section className={`${style.intro} ${style.section5}`}>
                <h1>Frequently Asked Questions</h1>

                <div className={style.box} onClick={() => toggleBox('box1', 'toggleButton1')}>
                    <div className={style.click}>
                        <h2>What is Netflix?</h2>
                        <button className={style.toggleButton} id="toggleButton1">+</button>
                    </div>
                    <div className={style.content} id="box1">
                        <p>Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.</p> <br />
                        <p>You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!</p>
                    </div>
                </div>

                <div className={style.box} onClick={() => toggleBox('box2', 'toggleButton2')}>
                    <div className={style.click}>
                        <h2>How much does Netflix cost?</h2>
                        <button className={style.toggleButton} id="toggleButton2">+</button>
                    </div>
                    <div  className={style.content} id="box2">
                        <p>Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from USD 9.99 to USD 2.99 a month. No extra costs, no contracts.</p>
                    </div>
                </div>

                <div className={style.box} onClick={() => toggleBox('box3', 'toggleButton3')}>
                    <div className={style.click}>
                        <h2>Where can I watch?</h2>
                        <button className={style.toggleButton} id="toggleButton3">+</button>
                    </div>
                    <div  className={style.content} id="box3">
                        <p>Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.</p> <br/>
                        <p>You can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.</p>
                    </div>
                </div>

                <div className={style.box} onClick={() => toggleBox('box4', 'toggleButton4')}>
                    <div className={style.click}>
                        <h2>How do I cancel?</h2>
                        <button className={style.toggleButton} id="toggleButton4">+</button>
                    </div>
                    <div className={style.content} id="box4">
                        <p>Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.</p>
                    </div>
                </div>

                <div className={style.box} onClick={() => toggleBox('box5', 'toggleButton5')}>
                    <div className={style.click}>
                        <h2>What can I watch on Netflix?</h2>
                        <button className={style.toggleButton} id="toggleButton5">+</button>
                    </div>
                    <div className={style.content} id="box5">
                        <p>Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.</p>
                    </div>
                </div>

                <div className={style.box} onClick={() => toggleBox('box6', 'toggleButton6')}>
                    <div className={style.click}>
                        <h2>Is Netflix good for kids?</h2>
                        <button  className={style.toggleButton} id="toggleButton6">+</button>
                    </div>
                    <div className={style.content} id="box6">
                        <p>The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.</p> <br/>
                        <p>Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.</p>
                    </div>
                </div>

                <div className={style.info}>
                    <Signup />
                </div>
            </section>

        <div className={style.br}></div>
    </div>
    )
}

export default HomeSection;
