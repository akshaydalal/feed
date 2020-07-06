import React, { Component } from 'react'
import "../css/filterBar.css";
export default class FilterBar extends Component {
    render() {
        return (
            <div className="filter-inner">   
                <div className="sort-by">Sort By :-</div>
                <div className="filterType" onClick={e=>this.props.filterFeeds("event_date")}><i className="fa fa-clock-o" aria-hidden="true"></i> Date</div>
                <div className="filterType" onClick={e=>this.props.filterFeeds("likes")}><i className="fa fa-thumbs-up" aria-hidden="true"></i> <span>Likes</span></div>
                <div className="filterType" onClick={e=>this.props.filterFeeds("shares")}> <i className="fa fa-share" aria-hidden="true"></i> <span>Shares</span></div>
                <div className="filterType" onClick={e=>this.props.filterFeeds("views")}><i className="fa fa-eye" aria-hidden="true"></i> <span>Views</span></div>    
            </div> 
        )
    }
}
