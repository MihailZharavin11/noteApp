import React, { useEffect, useState } from 'react';
import InnerNoteToAdd from '../../suppComponent/createNoteInner/InnerNoteToAdd/InnerNoteToAdd';
import InnerToDeleteFolder from '../../suppComponent/EditInner/InnerToDeleteFolder/InnerToDeleteFolder';
import InnerToRenameFolder from '../../suppComponent/EditInner/InnerToRenameFolder/InnerToRenameFolder';
import Headerbuttons from './HeaderButtons/HeaderButtons';
import { setNameTitle, addFilterURL } from '../../../redux/slices/contentSlice/contentSlice';
import { useParams } from 'react-router-dom';
import styles from './header.module.sass';
import { selectAll } from '../../../redux/slices/navigationSlice/NavSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store/store';

type HeaderProps = {
  createNote: Boolean;
  setCreateNote: Function;
};

const Header: React.FC<HeaderProps> = ({ setCreateNote, createNote }) => {
  const dispatch = useAppDispatch();
  const allNavList = useAppSelector(selectAll);
  const { path } = useParams();
  const { title } = useAppSelector((state) => state.contentSlice);
  const [titleId, setTitleId] = useState<string | null>(null);
  const [showEdditModalToDelete, setShowEdditModalToDelete] = useState(false);
  const [showEdditModalToRename, setShowEdditModalToRename] = useState(false);

  useEffect(() => {
    if (!path) {
      dispatch(setNameTitle('All notes'));
    } else {
      allNavList.forEach((element) => {
        if (element.title.replace(/\s+/g, '').toLowerCase() === path) {
          dispatch(setNameTitle(element.title));
          setTitleId(element.id);
        }
      });
    }
    if (path) {
      dispatch(addFilterURL(path));
    }
  }, [path, allNavList, dispatch]);

  return (
    <div className={styles.contentHeader}>
      <h1 className={styles.contentHeader__title}>{title}</h1>
      <div className={styles.contentButton__wrapper}>
        <Headerbuttons
          title={title}
          createNote={createNote}
          setCreateNote={setCreateNote}
          showEdditModalToDelete={showEdditModalToDelete}
          setShowEdditModalToDelete={setShowEdditModalToDelete}
          showEdditModalToRename={showEdditModalToRename}
          setShowEdditModalToRename={setShowEdditModalToRename}
        />
      </div>
      {createNote && <InnerNoteToAdd popUpWrapper={createNote} setPopUpWrapper={setCreateNote} />}
      {showEdditModalToDelete && (
        <InnerToDeleteFolder
          popUpWrapper={showEdditModalToDelete}
          setPopUpWrapper={setShowEdditModalToDelete}
          title={title}
          path={path}
        />
      )}
      {showEdditModalToRename && (
        <InnerToRenameFolder
          titleId={titleId}
          title={title}
          popUpWrapper={showEdditModalToRename}
          setPopUpWrapper={setShowEdditModalToRename}
        />
      )}
    </div>
  );
};

export default Header;
