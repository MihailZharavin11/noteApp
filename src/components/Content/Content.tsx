import React, { useEffect, useMemo, useState } from 'react';
import styles from './content.module.sass';
import Header from './Header/Header';
import { fetchContent, selector, addFilterURL } from '../../redux/slices/contentSlice/contentSlice';
import Card from './Card/Card';
import Loading from '../suppComponent/Lodaing/Loading';
import { usePathСheck } from '../../hooks/usePathCheck';
import { useParams } from 'react-router-dom';
import { selectAll } from '../../redux/slices/navigationSlice/NavSlice';
import NotFoundFolder from '../suppComponent/notFoundFolder/NotFoundFolder';
import EmptyContent from './EmptyContent/EmptyContent';
import FilterButton from './FilterButton/FilterButton';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';

const Content = () => {
  const notes = useAppSelector(selector);
  let { path } = useParams();
  const allNavList = useAppSelector(selectAll);
  const [createNote, setCreateNote] = useState(false);
  const dispatch = useAppDispatch();
  const { loadingStatusContent, filterNotes } = useAppSelector((state) => state.contentSlice);
  const { checkPath } = usePathСheck(path, allNavList);

  useEffect(() => {
    if (path) {
      dispatch(addFilterURL(path));
    }
    dispatch(fetchContent());
  }, [dispatch, path, allNavList, checkPath, filterNotes]);

  const renderCard = useMemo(() => {
    if (!checkPath && path) {
      return <NotFoundFolder path={path} />;
    }
    if (notes.length === 0) {
      return <EmptyContent createNote={createNote} setCreateNote={setCreateNote} />;
    } else {
      return notes.map((element) => {
        return (
          <Card
            key={element.id}
            id={element.id}
            title={element.title}
            date={element.date}
            text={element.text}
          />
        );
      });
    }
  }, [checkPath, createNote, notes, path]);

  const renderHeader = useMemo(() => {
    return !checkPath ? null : <Header createNote={createNote} setCreateNote={setCreateNote} />;
  }, [checkPath, createNote]);

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.contentInner}>
        {renderHeader}
        {notes.length > 0 ? <FilterButton filterNotes={filterNotes} /> : null}
        <div className={styles.cardWrapper}>
          {loadingStatusContent === 'loading' ? <Loading /> : renderCard}
        </div>
      </div>
    </div>
  );
};

export default Content;
