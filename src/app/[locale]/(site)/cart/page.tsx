import React from 'react'
import CartSummary from './_components/cart-summary';

export default function Cart() {
  return (
    <div className='flex gap-10'>
      <div className='w-[49rem]'></div>
        <CartSummary />
    </div>
  )
}
