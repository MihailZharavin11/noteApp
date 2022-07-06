import React from 'react';
import styles from './createNoteButton.module.sass';

type CreateNoteButtonProps = {
  createNote: Boolean;
  setCreateNote: Function;
};

const Createnotebutton: React.FC<CreateNoteButtonProps> = ({ setCreateNote, createNote }) => {
  return (
    <button onClick={() => setCreateNote(!createNote)} className={styles.content__button}>
      Create notes
    </button>
  );
};

export default Createnotebutton;
