import { useEffect, useState } from "react";
import useSound from "use-sound";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import music from "../assets/Jungle - Back On 74 (Official Video) (320).mp3";

function Player() {
  const [playing, setPlaying] = useState(false);
  const [play, { stop, sound }] = useSound(music);
  const [currentTime, setCurrentTime] = useState({
    min: "0",
    sec: "0",
  });
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (sound) {
      const duration = sound.duration();
      const totalSeconds = duration / 1000;
      const min = Math.floor(totalSeconds / 60);
      const sec = Math.floor(totalSeconds % 60);
      setCurrentTime({
        min: min.toString().padStart(2, "0"),
        sec: sec.toString().padStart(2, "0"),
      });
    }
  }, [sound]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playing && sound) {
        setSeconds((seconds) => seconds + 1);
        const min = Math.floor(sound.seek() / 60);
        const sec = Math.floor(sound.seek() % 60);
        setCurrentTime({
          min: min.toString().padStart(2, "0"),
          sec: sec.toString().padStart(2, "0"),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [playing, sound]);

  function playingButton() {
    setPlaying(!playing);
    if (!playing) {
      play();
    } else {
      stop();
    }
  }

  return (
    <div className="text-center bg-fuchsia-900 p-4 rounded-3xl w-80">
      <h2 className="text-2xl mb-4 text-white">
        Playing Now: Jungle - Back On 74
      </h2>
      <img
        src="https://i.pinimg.com/236x/39/eb/d9/39ebd9f89262a5c60ab46df2e95d9f6a.jpg"
        alt="Album Art"
        className="mb-4 mx-auto h-48 w-52 object-cover rounded-lg"
      />
      <div className="flex justify-center items-center space-x-4">
        <IconContext.Provider value={{ color: "white", size: "2em" }}>
          <BiSkipPrevious className="cursor-pointer" />
        </IconContext.Provider>
        <button onClick={playingButton} className="focus:outline-none ">
          <IconContext.Provider value={{ color: "white", size: "2em" }}>
            {playing ? (
              <AiFillPauseCircle className="text-4xl text-white h-12" />
            ) : (
              <AiFillPlayCircle className="text-4xl text-white h-12" />
            )}
          </IconContext.Provider>
        </button>
        <IconContext.Provider value={{ color: "white", size: "2em" }}>
          <BiSkipNext className="cursor-pointer h-12" />
        </IconContext.Provider>
      </div>
      <div className="text-white mt-4">
        {currentTime.min}:{currentTime.sec}
      </div>
    </div>
  );
}

export default Player;
