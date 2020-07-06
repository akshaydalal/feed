import React, { Component } from 'react'
import FeedCard from '../components/feedCard';
import "./landing.css";
import FilterBar from '../components/filterBar';
import Modal from '../components/modal';
import Toast from '../components/toast';
export default class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feeds: [],
            activeSorting: "event_date",
            activeOrder: "D",
            pages: {
                1: "59b3f0b0100000e30b236b7e",
                2: "59ac28a9100000ce0bf9c236",
                3: "59ac293b100000d60bf9c239"
            },
            activePage: 1,
            isFetching: false,
            pagesPending:true,
            showModal: false,
            activeFeed: {},
            showToast: false,
            toastText: ""

        }
    }
    componentDidMount() {
        this.setState({ isFetching: true })
        this.getFeeds(1)
        window.addEventListener('scroll', this.handleScroll)
        document.addEventListener("keydown", this.handleKeyPress, false);
    }

    getFeeds = (page) => {
        if (page > 3) {
        
            this.setState({ toastText: "No More Feeds",pagesPending:false }, () => {
                this.toggleToast()
            })
            return
        }

        if (!navigator.onLine) {
            let tempfeed = localStorage.getItem("feeds")
            if (tempfeed) { this.setState({ feeds: JSON.parse(tempfeed) }) }
            this.setState({ toastText: "No Internet Connection!" }, () => {
                this.toggleToast();
            })
        }
       
        fetch("http://www.mocky.io/v2/" + this.state.pages[page]).then(res => {
            if (res.status !== 200) {
                this.setState({ toastText: "No More Feeds" }, () => {
                    this.toggleToast()
                })
            }
            return res.json()
        })
            .then(data => {
                this.setState({ isFetching: false })
                let { feeds } = this.state
                let temp = data.posts;
                feeds = feeds.concat(temp)
                this.setState({ feeds, activePage: page })
                localStorage.setItem("feeds", JSON.stringify(feeds))
            })
            .catch(e=> {
                this.setState({ isFetching: false })
                console.log("error",e);
                this.setState({ toastText: "Network issue!" }, () => {
                    this.toggleToast()
                })
            })
    }

    filterFeeds = (type) => {
        let { feeds, activeOrder, activeSorting } = this.state;
        feeds.sort((a, b) => b[type] - a[type]);
        if (activeSorting == type) {
            if (activeOrder == "D") {
                feeds.reverse();
                activeOrder = "A";
            }
            else {
                activeOrder = "D";
            }
        }
        else {
            activeOrder = "D";
        }
        activeSorting = type;
        this.setState({ feeds, activeOrder, activeSorting }, () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
    }
    handleScroll = (e) => {
        let scrollPos = window.scrollY
        let pageHeight = document.body.scrollHeight
        if (scrollPos + window.innerHeight + 300 >= pageHeight && pageHeight > 2000 && !this.state.isFetching) {
            let nextPage = this.state.activePage + 1;
            this.setState({ isFetching: true }, () => {
                this.getFeeds(nextPage)
            })
        }
    }

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    };

    openModal = (feed) => {
        this.setState({ activeFeed: feed }, () => {
            this.toggleModal()
        })
    }
    handleKeyPress = (e) => {
        if (e.keyCode == 27) {
            this.setState({
                showModal: false
            })
        }
    }
    toggleToast = () => {

        this.setState({ showToast: true }, () => {
            let elem = document.getElementById("toast")
            elem.classList.add("fade")
            setTimeout(() => {
                elem.classList.remove("fade")
                this.setState({ showToast: false })
            }, 4000)
        })
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress, false);
    }


    render() {
        let { feeds, showModal, showToast,isFetching,pagesPending } = this.state
        return (
            <React.Fragment>
                <div className="filter-bar">
                    <FilterBar filterFeeds={this.filterFeeds} />
                </div>
                <div className="feeds-container" >
                    {feeds.map((feed, index) => {
                        return <FeedCard feed={feed} key={index} modal={true} openModal={this.openModal} />
                    })}
                    {
                        showModal ? (
                            <Modal keyDown={this.handleKeyPress} >
                                <div className="modal-body">
                                    <FeedCard feed={this.state.activeFeed} />
                                    <button
                                        className="modal-close"
                                        onClick={e => this.toggleModal()}
                                    >X</button>
                                </div>
                            </Modal>
                        ) : null
                    }
                {isFetching && pagesPending ? <div ><img src="/assets/images/oval.svg" /></div> :null}
                </div>
                {
                    showToast ? <Toast >
                        <div id="toast" className="toast-inner">
                            <p>{this.state.toastText}</p>
                        </div>

                    </Toast> : null
                }


            </React.Fragment>
        )
    }
}
