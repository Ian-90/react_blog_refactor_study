import { useState, useLayoutEffect, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './ModalWrapper.module.scss'

const cx = classNames.bind(styles)

const ModalWrapper = ({ children, visible }) => {
  const [animate, setAnimate] = useState(false)

  const startAnimation = () => {
    setAnimate(true)

    setTimeout(() => setAnimate(false), 250)
  }

  useLayoutEffect(() => {
      if (visible) {
        startAnimation()
      }
      return () => startAnimation()
  }, [visible])

  const animation = animate && (visible ? 'enter' : 'leave')

  if (!visible && !animate) return null

  return (
    <div>
      <div className={cx('gray-background', animation)} />
      <div className={cx('modal-wrapper')}>
        <div className={cx('modal', animation)}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ModalWrapper
