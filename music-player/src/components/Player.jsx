import { useEffect, useState } from "react";
import useSound from "use-sound";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import music from "../assets/Jungle - Back On 74 (Official Video) (320).mp3";

function Player() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [play, { stop, sound }] = useSound(music, { volume });
  const [currentTime, setCurrentTime] = useState({
    min: "0",
    sec: "0",
  });
  const [totalTime, setTotalTime] = useState({
    min: "0",
    sec: "0",
  });
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (sound) {
      sound.on("load", () => {
        const duration = sound.duration();
        const totalSeconds = duration;
        const min = Math.floor(totalSeconds / 60);
        const sec = Math.floor(totalSeconds % 60);
        setTotalTime({
          min: min.toString().padStart(2, "0"),
          sec: sec.toString().padStart(2, "0"),
        });
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

  function handleSeek(event) {
    const seekTime = event.target.value;
    sound.seek(seekTime);
    setSeconds(seekTime);
    const min = Math.floor(seekTime / 60);
    const sec = Math.floor(seekTime % 60);
    setCurrentTime({
      min: min.toString().padStart(2, "0"),
      sec: sec.toString().padStart(2, "0"),
    });
  }

  function handleVolumeChange(event) {
    setVolume(event.target.value);
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
      <div className="flex justify-center items-center mt-4">
        <input
          type="range"
          min="0"
          max={sound ? sound.duration() : 0}
          value={seconds}
          onChange={handleSeek}
          className="w-full"
        />
      </div>
      <div className="text-white mt-4">
        {currentTime.min}:{currentTime.sec} / {totalTime.min}:{totalTime.sec}
      </div>
      <div className="flex justify-center items-center mt-4">
        <label htmlFor="volume" className="text-white mr-2">
          Volume:
        </label>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
}

export default Player;
