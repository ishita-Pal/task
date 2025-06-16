import React, { useState, useEffect } from 'react';
import './main.css';
import './rating.css';
import './clock.css';

function C() {
  const [t, setT] = useState({
    h: '00',
    m: '00',
    s: '00'
  });

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const h = String(d.getHours()).padStart(2, '0');
      const m = String(d.getMinutes()).padStart(2, '0');
      const s = String(d.getSeconds()).padStart(2, '0');
      setT({ h, m, s });
    };

    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="h">
      <div className="b">
        <div className="clk">
          <span className="h-t">{t.h}</span>
          <span>:</span>
          <span className="m-t">{t.m}</span>
          <span>:</span>
          <span className="s-t">{t.s}</span>
        </div>
      </div>
    </div>
  );
}

export default C;
