import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addFilterURL, setNameTitle } from '../../../redux/slices/contentSlice/contentSlice';
import { IPages } from '../../../redux/slices/navigationSlice/NavSlice';
import styles from './navList.module.sass';

type NavListProps = {
  folder: string;
  links: IPages[];
};

const NavList: React.FC<NavListProps> = ({ folder, links }) => {
  const { path } = useParams();
  const dispatch = useDispatch();

  const onClickLink = (title: string) => {
    const titleName = title.replace(/\s+/g, '').toLowerCase();
    if (titleName !== path) {
      dispatch(setNameTitle(title));
      dispatch(addFilterURL(titleName));
    }
  };

  return (
    <ul className={styles.nav__inner}>
      {links.map((element) => {
        let navName =
          element.title.length > 10 ? element.title.substr(0, 10) + '...' : element.title;
        return (
          <li key={element.id}>
            <Link
              onClick={() => onClickLink(element.title)}
              className={styles.nav__item}
              to={`/${element.title.replace(/\s+/g, '').toLowerCase()}`}>
              <img className={styles.nav__image} src={folder} alt="folder" />
              <p className="nav__text">{navName}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavList;
