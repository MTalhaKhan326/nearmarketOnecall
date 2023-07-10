import { padding, width } from '@mui/system';
import React from 'react'
import { AppImages } from '../Asset/images/image';
import Main from './Main';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div>
      <section className="w-[100%] p-2 bg-slate-100">
        <div className="w-[150px] bg-white rounded-3xl sm:rounded-3xl">
          <Link to={`/`}>
            <img src={AppImages.logo} alt="" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Header