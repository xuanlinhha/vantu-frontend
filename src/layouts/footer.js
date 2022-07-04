import * as React from 'react'

export default function Footer() {
  return (
    <footer className='border-top py-3 bg-light'>
      <div className='container'>
        <div className='row justify-content-center align-items-center py-3 my-3'>
          <div className='col'>
              <div className='px-sm-4 text-center condensed-font'> &copy; Copyright {new Date().getFullYear()} vantu.org - All rights reserved</div>
          </div>
        </div>
      </div>
    </footer>
  )
}