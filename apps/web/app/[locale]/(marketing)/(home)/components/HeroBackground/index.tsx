// components/HeroBackground/index.tsx
import styles from './index.module.css'

const HeroBackground = () => {
  return (
    <div className={styles.heroBackground}>
      <div className={styles.gradientOrbs}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className={styles.orb} style={{ '--index': i } as React.CSSProperties} />
        ))}
      </div>
      <div className={styles.grid}>
        {[...Array(20)].map((_, i) => (
          <div key={i} className={styles.gridLine} />
        ))}
      </div>
    </div>
  )
}

export default HeroBackground
