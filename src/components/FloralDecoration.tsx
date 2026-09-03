import { createPortal } from 'react-dom'
import cornerFloral from '../assets/xx.jpg'

type FloralPosition = 'top-right' | 'bottom-left'

export function FloralDecoration({ position }: { position: FloralPosition }) {
  const isTopRight = position === 'top-right'

  return createPortal(
    <img
      src={cornerFloral}
      alt=""
      aria-hidden="true"
      className={`floral ${isTopRight ? 'floral-top-right' : 'floral-bottom-left'}`}
      decoding="async"
    />,
    document.body,
  )
}
