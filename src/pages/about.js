import React from 'react'
import bnf from '../images/bnf.png'
import mdbg from '../images/mdbg_dictionary_128x32.png'

export default function About() {
  return (
    <div className='container py-2'>
      <div className='row'>
        <div className='col-sm-12'>
          <h4 className='fw-bold normal-font '> <u> Nguồn tham khảo </u> </h4>
        </div>
        <div className='col-sm-6 pb-4'>
          <h6 className='fw-bold normal-font'> Việt Nam từ điển </h6>
          <div>
            <a href='http://vietnamtudien.org'>
              http://vietnamtudien.org
            </a>
          </div>
          Paris © DTK
          <div> <a href='mailto:dangthekiet2002@yahoo.fr'>dangthekiet2002@yahoo.fr</a> </div>
          <div>
            <img src={bnf} alt='BNF' />
          </div>
          <div>
            <a href='http://www.bnf.fr/fr/professionnels/depot_legal/a.dl_sites_web_mod.html'>
            depot_legal
            </a>
          </div>
        </div>

        <div className='col-sm-6 pb-4'>
          <h6 className='fw-bold normal-font'>Từ điển Hán Nôm </h6>
          <div>
            <a href='https://hvdic.thivien.net'>
              https://hvdic.thivien.net
            </a>
          </div>
        </div>

        <div className='col-sm-6 pb-4'>
          <h6 className='fw-bold normal-font'> Từ điển MDBG </h6>
          <div>
            <a href='https://www.mdbg.net/chinese/dictionary'>
              https://www.mdbg.net/chinese/dictionary
            </a>
          </div>
          <div>
            <a href='https://www.mdbg.net/chinese/dictionary'>
              <img src={mdbg} alt='MDBG Chinese-English dictionary' />
            </a>
          </div>
        </div>

        <div className='col-sm-6 pb-4'>
          <h6 className='fw-bold normal-font'> VDICT.CO </h6>
          <div>
            <a href='http://vdict.co'>
              http://vdict.co
            </a>
          </div>
        </div>

        <div className='col-sm-6 pb-4'>
          <h6 className='fw-bold normal-font'> Từ điển Arch Chinese </h6>
          <div>
            <a href='https://www.archchinese.com'>
              https://www.archchinese.com
            </a>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-12'>
          <h4 className='fw-bold normal-font'> Liên hệ </h4>
          <div> <span className='fw-bold'> Email </span>: <a href='mailto:vantuwenzi@gmail.com'>vantuwenzi@gmail.com</a> </div>
        </div>
      </div>
    </div>
  )
}
