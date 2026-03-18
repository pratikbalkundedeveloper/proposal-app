import { useState } from "react";
import Typewriter from "typewriter-effect";
import Confetti from "react-confetti";
import Particles from "react-tsparticles";
import "./App.css";

function App() {
  const [noCount, setNoCount] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  // 🎯 GIF stages (fixed reliable ones)
  const gifs = [
    "/gifs/bubu-holding-and-squeezing-a-heart-bubu-dudu-love.gif",
    "/gifs/Love-You-Cartoon-Gif-Love-Gif-Images.gif",
    "/gifs/bubu-dudu.gif",
    "/gifs/dudu-sad.gif",
    "/gifs/sad_eyes.gif",
  ];

  const noTexts = [
    "No 😢",
    "Are you sure? Pooja 😟",
    "Please, think about me 🥺",
    "I will be very sad 🥺🥹",
    "Very very very sad 😭😭",
    "Please!!!! 😫",
  ];

  const handleNo = (e) => {
    setNoCount((prev) => {
      const newCount = prev + 1;

      // If already in escape mode → move on click
      if (newCount >= 5 && e) {
        moveButton(e.target);
      }

      return newCount;
    });
  };

  const handleYes = () => {
    setAccepted(true);
  };

  const moveButton = (button) => {
    const btnRect = button.getBoundingClientRect();

    const padding = 20;

    const maxX = window.innerWidth - btnRect.width - padding;
    const maxY = window.innerHeight - btnRect.height - padding;

    const x = padding + Math.random() * maxX;
    const y = padding + Math.random() * maxY;

    button.style.position = "fixed"; // ✅ KEY FIX
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
  };

  return (
    <div className="container">
      {/* ❤️ Background Particles */}
      <Particles
        options={{
          particles: {
            number: { value: 40 },
            shape: {
              type: "image",
              image: {
                src: "https://cdn-icons-png.flaticon.com/512/833/833472.png",
                width: 20,
                height: 20,
              },
            },
            size: { value: 15 },
            move: { speed: 2 },
          },
        }}
      />

      {/* 🎆 Confetti */}
      {accepted && <Confetti />}

      {/* 💌 Main Text */}
      <h1 className="title">
        {!accepted ? (
          !introDone ? (
            <Typewriter
              options={{
                delay: 50,
                deleteSpeed: 1, // ⚡ FAST delete
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("From the moment I met you, Pooja... 💖")
                  .pauseFor(1200)
                  .deleteAll()

                  .typeString("My life changed in the most beautiful way ✨")
                  .pauseFor(1200)
                  .deleteAll()

                  .typeString("Every talk with you feels like magic 🌟")
                  .pauseFor(1200)
                  .deleteAll()

                  .typeString("And today, I want to ask you something special... 💍")
                  .pauseFor(1200)
                  .deleteAll()

                  .typeString("Will you marry me, Pooja? ❤️")
                  .pauseFor(500) // ⏳ allow typing to finish
                  .callFunction(() => {
                    setTimeout(() => setIntroDone(true), 300); // smooth switch
                  })
                  .start();
              }}
            />
          ) : (
            "Will you marry me, Pooja? 💕"
          )
        ) : (
          "I knew you would say yes, Pooja! 💖"
        )}
      </h1>

      {/* 🖼 GIF */}
      <img
        className="gif"
        src={
          accepted
            ? "/gifs/Final.gif"
            : gifs[Math.min(noCount, gifs.length - 1)]
        }
        alt="gif"
      />

      {/* 💬 Subtext */}
      {!accepted && (
        <p className="subtext">
          You are my today, my tomorrow… and my forever, Pooja 💝
        </p>
      )}

      {/* 🎯 Buttons */}
      {!accepted && introDone && (
        <div className="buttons">
          <button
            className="yes"
            onClick={handleYes}
            style={{
              fontSize: `${Math.min(18 + noCount * 4, 32)}px`,
              padding: `${Math.min(10 + noCount * 2, 18)}px ${Math.min(
                18 + noCount * 4,
                40
              )}px`,
            }}
          >
            💖 Yes 💖
          </button>

          <button
            className="no"
            onClick={handleNo}
            onMouseEnter={(e) => {
              if (noCount >= 5) {
                moveButton(e.target);
              }
            }}
          >
            {noTexts[Math.min(noCount, noTexts.length - 1)]}
          </button>
        </div>
      )}

      {/* 💖 Final Message */}
      {accepted && (
        <div className="final">
          <p>
            💕 You just made me the happiest person in the world 💕 <br />
            💞 I promise to love you, support you, and stand by you
            forever 💞
          </p>

          {/* ❤️ RANDOM HEARTS */}
          <div className="hearts">
            {Array.from({ length: 30 }).map((_, i) => {
              const left = Math.random() * 100;
              const delay = Math.random() * 5;
              const duration = 3 + Math.random() * 5;
              const size = 16 + Math.random() * 20;

              return (
                <span
                  key={i}
                  style={{
                    left: `${left}%`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`,
                    fontSize: `${size}px`,
                  }}
                >
                  ❤️
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;