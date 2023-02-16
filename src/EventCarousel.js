import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState, useEffect } from "react";

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div onClick={onClick}>
        <svg className={className}
        style={{ ...style, display: "block", right :'0px', zIndex : 2,background: `rgba(255,255,255,.3764705882)`}} 
        viewBox="0 0 24 24" width="24px" height="24px">
            <title>Arrow Right</title>
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z">
            </path></svg></div>
    );
  }
  
  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div onClick={onClick}>
        <svg className={className} viewBox="0 0 24 24" width="24px" 
        style={{ ...style, display: "block", left :'0px', zIndex : 2, background: `rgba(255,255,255,.3764705882)`}}
        height="24px">
            <title>Arrow Left</title>
            <path d="M0 0h24v24H0z" fill="none" ></path>
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z">
            </path></svg></div>
    );
  }


const EventCarousel = () => {

    const [events, setEvents] = useState();
    
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true | false,
        autoplaySpeed: 3000,
        cssEase: 'ease-out',
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
      };

      const fetchData = (async () => {
        const {data} = await fetch(
             `https://mobile.api.pet-friends.co.kr/main/tab/banner/list`,
             {
             method: "POST",
             headers: {
               'Content-type' : 'application/json'
             },
             body: JSON.stringify({
                "mobile_device_id": "80197bae-b5a8-4620-87c9-a1dca94a9429",
                "mobile_os_code" : "P",
                "tab_info_id" : 5
             })
             })
             .then(response => response.json())
             .catch((error) => {
                 alert(error)
               })

            setEvents(data.tab_banner_list)
             
       });


    useEffect(() => {
        fetchData()
    },[])

    return (
        <Slider {...settings}>
            {events && events.map((item, idx) => {
                return <img key={idx} src={`${item.top_image_url}`} height="224px" alt="event"/>
            })}
        </Slider>
    )
}

export default EventCarousel;