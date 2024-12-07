import { useState, useEffect } from 'react';
import Image from 'next/image';
import s from './ContentCard.module.scss';
import { gsap } from 'gsap';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

const ContentCard = ({ activeContent }) => {
  const imageRef = useRef();
  const headingRef = useRef();
  const textRef = useRef();

  const { 
    image, 
    altText, 
    title, 
    text 
  } = activeContent;

  useGSAP(() => {
		const tl = gsap.timeline();

		tl.fromTo(imageRef.current, { x: -100, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8 })
			.fromTo(headingRef.current, { x: 100, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8 }, "-=0.5")
			.fromTo(textRef.current, { x: 100, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8 }, "-=0.5");
  }, [activeContent]);


  return (
    <div className={s.contentCard}>
      <div ref={imageRef} className={s.imageWrapper}>
        <Image 
          src={image} 
          alt={altText} 
          className={s.cardImage}
          width={280}
          height={280}
        />
      </div>

      <div className={s.contentWrapper}>
        <h3 ref={headingRef} className={s.heading}>{title}</h3>
        <p ref={textRef} className={s.cardText}>{text}</p>
      </div>
    </div>
  )
}

export default ContentCard;