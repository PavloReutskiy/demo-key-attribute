import s from './TabNavigation.module.scss';
import { useRef, useEffect } from 'react';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const TabNavigation = ({ items, onHandleActiveNavItem, activeNavItem }) => {
  const tabMenuRef = useRef(null);
  const indicatorRef = useRef(null);
  const tabRefs = useRef({});
	
  const setTabRef = (item, element) => {
    tabRefs.current[item] = element;
  };
  
  useGSAP(() => {
    gsap.fromTo(tabMenuRef.current, 
      { x: 100, autoAlpha: 0 }, 
      { x: 0, autoAlpha: 1, duration: 0.8 },
    );
  }, []);

  useEffect(() => {
    const updateIndicator = () => {
      const activeTab = tabRefs.current[activeNavItem];
      const indicator = indicatorRef.current;
      const tabMenu = tabMenuRef.current;
  
      if (activeTab && indicator && tabMenu) {
        const { left: tabLeft, width: tabWidth } = activeTab.getBoundingClientRect();
        const { left: navLeft } = tabMenu.getBoundingClientRect();
        const scrollLeft = tabMenu.scrollLeft;
        const relativeLeft = tabLeft - navLeft + scrollLeft;
    
        indicator.style.width = `${tabWidth}px`;
        indicator.style.transform = `translateX(${relativeLeft}px)`;
      }
    };

    updateIndicator();

    window.addEventListener('resize', updateIndicator);

    return () => {
      window.removeEventListener('resize', updateIndicator);
    };

  }, [activeNavItem]);


  return (
    <div className={s.tabNavigation}>
      <nav 
        className={s.tabMenu} 
        ref={tabMenuRef} 
      >
        {items.map(item => (
          <button 
            key={item} 
            ref={el => setTabRef(item, el)}
            className={`${s.tabButton} ${activeNavItem === item ? s.activeTab : ''}`}
            onClick={() => onHandleActiveNavItem(item)}
          >
            {item}
          </button>
        ))}

        <div className={s.tabIndicator} ref={indicatorRef}></div>
      </nav>
    </div>
  )
}

export default TabNavigation;