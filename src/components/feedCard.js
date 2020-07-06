import React, { Component } from 'react'
import moment from "moment";
import "../css/feedCard.css"
export default class FeedCard extends Component {
    openModal=()=>{
        if(this.props.modal)
          this.props.openModal(this.props.feed)
    }
    render() {
        let {feed}=this.props
        return (
            <div className="feedcard-container" onClick={e=>this.openModal()}>
                <div className="feed-author">
                    <div className="name-img">{feed.event_name.charAt(0)}</div>
                    <div className="name-date">
                     <div className="name">{feed.event_name}</div>
                    <div className="date">{moment(feed.event_date).format("lll")}</div></div>
                </div>
                <div className="feed-imgContainer">
                <img src={feed.thumbnail_image}  placeholder="/assets/images/oval.svg"  alt="feed" />
                </div>
                <div className="feed-score">
                    <div className="scoreType t-left"><i className="fa fa-thumbs-up" aria-hidden="true"></i> <span>{feed.likes}</span></div>
                    <div className="scoreType t-center"><i className="fa fa-share" aria-hidden="true"></i> <span>{feed.shares}</span></div>
                    <div className="scoreType t-right"><i className="fa fa-eye" aria-hidden="true"></i> <span>{feed.views}</span></div>
                </div>
            </div>
        )
    }
}
