'use client';
import { useState, useMemo, useRef } from 'react';
import TabNavigation from '../components/TabNavigation/TabNavigation';
import ContentCard from '../components/ContentCard/ContentCard';
import Checkbox from '../components/Checkbox/Checkbox';
import s from './styles.module.scss';
import data from '../data.json';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const TabSection = () => {
  const [activeNavItem, setActiveNavItem] = useState('Elden Ring');
  const headingRef = useRef();

	const [hasKey, setHasKey] = useState(true);

	const toggleKey = () => {
		setHasKey(prevState => !prevState);
  };

  useGSAP(() => {
    gsap.fromTo(
      headingRef.current,
      { x: -100, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: 0.8 },
    );
  }, []);

  const activeContent = useMemo(
    () => data.content.find((item) => item.id === activeNavItem),
    [activeNavItem],
  );

  return (
    <section className={s.section}>
      <div className={s.container}>
				<h2 ref={headingRef} className={s.heading}>
					FromSorftware games
				</h2>

				<Checkbox 
					label="With key" 
					checked={hasKey} 
					onToggleKey={toggleKey} 
				/>

				<TabNavigation
					items={data.navigation}
					activeNavItem={activeNavItem}
					onHandleActiveNavItem={setActiveNavItem}
				/>

				{hasKey ? (
					<ContentCard key={activeContent.id} activeContent={activeContent} />
				) : (
					<ContentCard activeContent={activeContent} />
				)}
      </div>
    </section>
  );
};

export default TabSection;