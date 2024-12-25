// components/AnimatedButton.tsx

import React from 'react'
import styles from './index.module.css'

interface AnimatedButtonProps {
  text1?: string
  text2?: string
  onClick?: () => void
  className?: string
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ text1 = 'JoinToday', text2 = 'JoinNow', onClick, className = '' }) => {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      <div className={styles.bg}></div>
      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 342 208' height='208' width='342' className={styles.splash}>
        {/* SVG paths 保持不变 */}
      </svg>

      <div className={styles.wrap}>
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 221 42' height='42' width='221' className={styles.path}>
          <path
            strokeLinecap='round'
            strokeWidth='3'
            d='M182.674 2H203C211.837 2 219 9.16344 219 18V24C219 32.8366 211.837 40 203 40H18C9.16345 40 2 32.8366 2 24V18C2 9.16344 9.16344 2 18 2H47.8855'></path>
        </svg>

        <div className={styles.outline}></div>
        <div className={styles.content}>
          <span className={`${styles.char} ${styles['state-1']}`}>
            {text1.split('').map((char, index) => (
              <span key={index} data-label={char} style={{ '--i': index + 1 } as React.CSSProperties}>
                {char}
              </span>
            ))}
          </span>

          <div className={styles.icon}>
            <div></div>
          </div>

          {/* <span className={`${styles.char} ${styles['state-2']}`}>
            {text2.split('').map((char, index) => (
              <span key={index} data-label={char} style={{ '--i': index + 1 } as React.CSSProperties}>
                {char}
              </span>
            ))}
          </span> */}
        </div>
      </div>
    </button>
  )
}

export default AnimatedButton
