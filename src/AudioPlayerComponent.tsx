import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import play from "./playIcon.svg"
import pause from "./pauseIcon.svg"
type TProps = {
    link: string
    onBack: () => void
}
export const AudioPlayer: React.FC<TProps> = (props) => {
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    // const [isFetchingState, setFetchingState] = useState<boolean>(false)
    const audioRef = useRef(new Audio(props.link));
    const intervalRef = useRef();
    const { duration } = audioRef.current;
    const [volumeState, setVolumeState] = useState(0.5)
    useEffect(() => {
        clearInterval(intervalRef.current)
    }, [])
    useEffect(() => {
        console.log(true)
        if (isPlaying) {
            audioRef.current.play()
            startTimer()
        } else {
            clearInterval(intervalRef.current)
            audioRef.current.pause()
        }
    }, [isPlaying])
    // const onPlay = () => {
    //     setFetchingState(true)
    //     audioRef.current.play().then(() =>
    //         setFetchingState(false)
    //     )
    // }
    const startTimer = () => {
        clearInterval(intervalRef.current);
        setInterval(() => {
            if (!audioRef.current.ended) {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, 1000);
    }
    const onRewind = (value: string) => {
        clearInterval(intervalRef.current)
        audioRef.current.currentTime = Number(value)
        setTrackProgress(Number(value))
    }
    const onRewindEnd = () => {
        if (!isPlaying) {
            setIsPlaying(true);
        }
        startTimer();
    }
    const onChangeVolume = (value: number) => {
        clearInterval(intervalRef.current)
        audioRef.current.volume = value
        setVolumeState(value)
    }
    const onBackClick = () => {
        audioRef.current.pause()
        props.onBack()
    }
    const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : '0%';
    const currentPercentageVolume = `${(volumeState / 1) * 100}%`
    const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, white), color-stop(${currentPercentage}, #ADACAD))`;
    const volumeStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentageVolume}, black), color-stop(${currentPercentageVolume}, white))`
    
    const getTime = (seconds: string) =>{
        let hour = Math.trunc(Number(seconds) / 60) + ''
        seconds = (Math.trunc(Number(seconds) % 60)) + ''
        return hour.padStart(2, '0') + ':' + seconds.padStart(2, '0')
      }
    return (
        <Content>
            <Link >{props.link}</Link>
            <PlayerSection id="player">
                <PlayerButton
                    onClick={() =>{
                        isPlaying ? setIsPlaying(false) : setIsPlaying(true)}}><img src={isPlaying ? pause : play} alt="" /></PlayerButton>
                <RangePlayer type="range" value={trackProgress} max={duration} min={0} step={1} style={{ background: trackStyling }} onChange={(ev) => onRewind(ev.target.value)} onKeyUp={onRewindEnd} onMouseUp={onRewindEnd} />
                <TimeAndVolumeSection>
                    <Time>{getTime(audioRef.current.currentTime.toString())}</Time>
                    <RangeVolume type="range" value={volumeState} min={0} max={1} step={0.1} style={{ background: volumeStyling }} onChange={(ev) => onChangeVolume(Number(ev.target.value))} />
                </TimeAndVolumeSection>
            </PlayerSection>
        <ButtonBack onClick={onBackClick}>← Back</ButtonBack>
        </Content>
    )
}

const Content = styled.div`
  display: flex;
  vertical-align: middle;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 660px;
  height: 100%;
    
`
const Link = styled.label`
    font-family: inherit;
    font-size:24px;
    width: 100%;
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    height: 32px;
    color: black;
`

const PlayerSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 20px;
    margin: 20px 0;
    width: 620px;
    height: 198px;
    background: #CFD3D6;
`
const PlayerButton = styled.button`
    outline: none;
    border: 0;
    background-color: #CFD3D6;
`
const RangePlayer = styled.input`
width: 100%;
height: 2px;
color: white;
margin-top: 35px;
border: 0;
background: #FFFFFF;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    &::-webkit-slider-thumb {
      background: #ecf0f1;
      border-radius: 6px/100%;
      cursor: pointer;
      width: 16px;
      height: 12px;
      -webkit-appearance: none;
    }
    &::-moz-range-thumb {
    	background: #ecf0f1;
        border-radius: 6px/100%;
    	cursor: pointer;
    }
    
`
const TimeAndVolumeSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    align-items: center;
`
const RangeVolume = styled.input`
    width: 45%;
    height:2px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    &::-webkit-slider-thumb {
      background: black;
      border-radius: 0;
      cursor: pointer;
      width: 16px;
      height: 12px;
      -webkit-appearance: none;
    }
    &::-moz-range-thumb {
    	background: black;
        border-radius: 0;
    	cursor: pointer;
    }
`
const Time = styled.p`
    @font-face {
    src: url('https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap');
    font-family: 'Space Grotesk', sans-serif;
    font-size: 12px;
  }
`
const ButtonBack = styled.button`
    font-size:24px;
    outline: none;
    border: 0;
`
