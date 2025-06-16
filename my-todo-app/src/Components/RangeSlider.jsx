import React, { useRef, useEffect } from 'react';
import './RangeSlider.css';

const RangeSlider = ({ min = 0, max = 100, step = 1, value = 0, onChange }) => {
  const slideValue = useRef(null);
  const inputSlider = useRef(null);

  useEffect(() => {
    const updateSliderValue = () => {
      if (inputSlider.current && slideValue.current) {
        const val = inputSlider.current.value;
        slideValue.current.textContent = val;

        const percent = ((val - min) / (max - min)) * 100;
        slideValue.current.style.left = `calc(${percent}% + (${8 - percent * 0.15}px))`;
      }
    };

    const showSliderValue = () => {
      if (slideValue.current) {
        slideValue.current.classList.add("show");
      }
    };

    const hideSliderValue = () => {
      if (slideValue.current) {
        slideValue.current.classList.remove("show");
      }
    };

    const slider = inputSlider.current;

    if (slider) {
      slider.addEventListener('input', updateSliderValue);
      slider.addEventListener('mousedown', showSliderValue);
      slider.addEventListener('touchstart', showSliderValue);
      slider.addEventListener('mouseup', hideSliderValue);
      slider.addEventListener('touchend', hideSliderValue);

      updateSliderValue(); // Initial update
    }

    return () => {
      if (slider) {
        slider.removeEventListener('input', updateSliderValue);
        slider.removeEventListener('mousedown', showSliderValue);
        slider.removeEventListener('touchstart', showSliderValue);
        slider.removeEventListener('mouseup', hideSliderValue);
        slider.removeEventListener('touchend', hideSliderValue);
      }
    };
  }, [value, min, max]);

  return (
    <div className="range">
      {value < max ? (
        <>
          <div className="sliderValue"><span ref={slideValue}>{value}</span></div>
          <div className="field">
            <div className="value left">{min}</div>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value}
              ref={inputSlider}
              onChange={onChange}
            />
            <div className="value right">{max}</div>
          </div>
        </>
      ) : (
        <div className="tick">✔</div>
      )}
    </div>
  );
};

export default RangeSlider;
