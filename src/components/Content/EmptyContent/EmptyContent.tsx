import React from 'react';
import Createnotebutton from '../Header/HeaderButtons/CreateNoteButton/CreateNoteButton';
import InnerNoteToAdd from '../../suppComponent/createNoteInner/InnerNoteToAdd/InnerNoteToAdd';
import styles from './emptyContent.module.sass';

type EmptyContentProps = {
  createNote: Boolean;
  setCreateNote: Function;
};

const EmptyContent: React.FC<EmptyContentProps> = ({ createNote, setCreateNote }) => {
  return (
    <div className={styles.emptyWrapper}>
      <div className={styles.emptyInner}>
        <h2>
          Write down the necessary
          <br />
          information here
        </h2>
        <Createnotebutton createNote={createNote} setCreateNote={setCreateNote} />
        {createNote && <InnerNoteToAdd popUpWrapper={createNote} setPopUpWrapper={setCreateNote} />}
      </div>
    </div>
  );
};

export default EmptyContent;
