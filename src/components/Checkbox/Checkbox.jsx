import s from './Checkbox.module.scss';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const Checkbox = ({ label, checked, onToggleKey }) => {
	const checkBoxRef = useRef();

	useGSAP(() => {
    gsap.fromTo(
      checkBoxRef.current,
      { x: -100, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: 0.8 },
    );
  }, []);

	return (
		<div ref={checkBoxRef} className={s.wrapper}>
			<label className={s.label} style={{ color: checked ? 'green' : 'red' }}>
				<input
					type="checkbox"
					className={s.checkbox}
					checked={checked}
					onChange={onToggleKey}
				/>
				{label}
			</label>
		</div>
	);

};

export default Checkbox;