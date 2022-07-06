import React, { useState, useEffect, useMemo, useCallback } from 'react';
import NavList from './navList/NavList';
import styles from './navComponent.module.sass';
import {
  fetchNavigation,
  selectAll,
  createFolder,
} from '../../redux/slices/navigationSlice/NavSlice';
import { ReactComponent as PlusImg } from '../../image/Navigation/plus.svg';
import folder from '../../image/Navigation/icon.svg';
import accept from '../../image/Navigation/accept.svg';
import ClickAwayListener from 'react-click-away-listener';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';

const NavComponent: React.FC = () => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const navigationList = useAppSelector(selectAll);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchNavigation());
  }, [dispatch]);

  const submitInformation = useCallback(
    async (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { meta } = await dispatch(createFolder(inputValue));
      if (meta.requestStatus === 'fulfilled') {
        setInputValue('');
        setShowInput(!showInput);
      }
    },
    [inputValue, dispatch, showInput],
  );

  const renderNavigationContent = useMemo(() => {
    return (
      <>
        <div className={styles.navigation__wrapper}>
          <NavList folder={folder} links={navigationList} />
        </div>
        {showInput && (
          <ClickAwayListener onClickAway={() => setShowInput(!showInput)}>
            <form className={styles.navigationForm} onSubmit={(e) => submitInformation(e)}>
              <img className={styles.navigationForm__image} src={folder} alt="" />
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={styles.navigationForm__input}
                placeholder="New folder"
                type="text"
              />
              <button type="submit" className={styles.navigationForm__button}>
                <img src={accept} alt="" />
              </button>
            </form>
          </ClickAwayListener>
        )}
        <button onClick={() => setShowInput(!showInput)} className={styles.navigation__button}>
          <PlusImg className={styles.navigationButton__img} />
          <p>add folder</p>
        </button>
      </>
    );
  }, [inputValue, navigationList, showInput, submitInformation]);

  return (
    <nav className={styles.navigation}>
      <div className={styles.navigation__title}>
        <h3 className="title__item">notes.app</h3>
      </div>
      {renderNavigationContent}
    </nav>
  );
};

export default NavComponent;
