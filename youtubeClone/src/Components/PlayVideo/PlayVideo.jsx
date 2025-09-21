import React, { useEffect, useState } from 'react'
import './PlayVideo.css'

import moment from 'moment'
import { API_KEY, value_converter } from '../../data'

import { useParams } from 'react-router-dom'


import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'


const PlayVideo = () => {
// const PlayVideo = ({categoryId,videoId}) => {

    // console.log({categoryId,videoId})
    const {videoId,categoryId} = useParams();

    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);

    const fetchVideoData = async () => {
        // fetching video data
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
        await fetch(videoDetails_url).then(response => response.json()).then(data => setApiData(data.items[0]));
        // console.log(data);
    }

    const fetchOtherData = async () => {
        // fetching channel data
        const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
        await fetch(channelData_url).then(response => response.json()).then(data => setChannelData(data.items[0]));
        
        // fetching comments data
        const commentData_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
        await fetch(commentData_url).then(response => response.json()).then(data => setCommentData(data.items));
    }

    useEffect(() => {
        fetchVideoData();
    }, [videoId])

    useEffect(() => {
        fetchOtherData();
    }, [apiData])


    return (
        <div className='play-video'>
            {/* <video src={video1} controls autoPlay muted></video> */}
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} title="YouTube API Walkthrough with Authentication from OAuth 2.0 Client IDs for Analytics Queries" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            {/* <iframe width="853" height="480" src="https://www.youtube.com/embed/irhhMLKDBZ8" title="YouTube API Walkthrough with Authentication from OAuth 2.0 Client IDs for Analytics Queries" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
            <h3>{apiData?apiData.snippet.title:"Title Here"}</h3>
            <div className="play-video-info">
                {/* <p>1525 Views &bull; 2 days ago</p> */}
                <p>{apiData? value_converter(apiData.statistics.viewCount) :"Views Here"} views &bull; {apiData? moment(apiData.snippet.publishedAt).fromNow() :"Published At"}</p>
                <div>
                    <span><img src={like} alt="" /> {apiData? value_converter(apiData.statistics.likeCount) :""} </span>
                    <span><img src={dislike} alt="" /> </span>
                    <span><img src={share} alt="" /> Share</span>
                    <span><img src={save} alt="" /> Save</span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt="" />
                <div>
                    <p>{apiData? apiData.snippet.channelTitle :"Title Here"}</p>
                    <span> {channelData ? value_converter(channelData.statistics.subscriberCount) : ""} Subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-description">
                <p>{apiData? apiData.snippet.description.slice(0,250) :"Description Here"}</p>
                
                <hr />
                <h4> {apiData? value_converter(apiData.statistics.commentCount) :""} Comments</h4>

                {commentData.map((item, index) => {
                return (
                    <div key={index} className="comment">
                    <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                    <div>
                        <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3>
                        <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                        <div className="comment-action">
                            <img src={like} alt="" />
                            <span> {commentData? value_converter(item.snippet.topLevelComment.snippet.likeCount) :""} </span>
                            <img src={dislike} alt="" />
                        </div>

                    </div>
                </div>
                )
            })}


                
                
            </div>

        </div>
    )
}

export default PlayVideo




{/* <div className="comment">
                    <img src={user_profile} alt="" />
                    <div>
                        <h3>Jack Nicholson <span>1 day ago</span></h3>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci dolor voluptatem rerum! 
                        Esse fuga magnam qui consequatur aliquam similique minus?</p>
                        <div className="comment-action">
                            <img src={like} alt="" />
                            <span>244</span>
                            <img src={dislike} alt="" />
                        </div>

                    </div>
                </div>
                <div className="comment">
                    <img src={user_profile} alt="" />
                    <div>
                        <h3>Jack Nicholson <span>1 day ago</span></h3>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci dolor voluptatem rerum! 
                        Esse fuga magnam qui consequatur aliquam similique minus?</p>
                        <div className="comment-action">
                            <img src={like} alt="" />
                            <span>244</span>
                            <img src={dislike} alt="" />
                        </div>

                    </div>
                </div>
                <div className="comment">
                    <img src={user_profile} alt="" />
                    <div>
                        <h3>Jack Nicholson <span>1 day ago</span></h3>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci dolor voluptatem rerum! 
                        Esse fuga magnam qui consequatur aliquam similique minus?</p>
                        <div className="comment-action">
                            <img src={like} alt="" />
                            <span>244</span>
                            <img src={dislike} alt="" />
                        </div>

                    </div>
                </div>
                <div className="comment">
                    <img src={user_profile} alt="" />
                    <div>
                        <h3>Jack Nicholson <span>1 day ago</span></h3>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci dolor voluptatem rerum! 
                        Esse fuga magnam qui consequatur aliquam similique minus?</p>
                        <div className="comment-action">
                            <img src={like} alt="" />
                            <span>244</span>
                            <img src={dislike} alt="" />
                        </div>

                    </div>
                </div> */}
