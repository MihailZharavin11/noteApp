import React, { useState, useRef } from 'react';
import InnerNoteToChange from '../../suppComponent/createNoteInner/InnerNoteToChange/InnerNoteToChange';
import styles from './card.module.sass';

type CardProps = {
  title: string;
  date: string;
  text: string;
  id: string;
};

const Card: React.FC<CardProps> = ({ title, date, text, id }) => {
  const [createNote, setCreateNote] = useState(false);
  let submitRef = useRef(null);
  let titleName = title.length > 10 ? title.substr(0, 10) + '...' : title;

  return (
    <div onClick={() => setCreateNote(!createNote)} className={styles.contentCard}>
      <div className={styles.cardTitle}>{titleName}</div>
      <div className={styles.cardDate}>{date}</div>
      {createNote && (
        <InnerNoteToChange
          submitRef={submitRef}
          id={id}
          title={title}
          date={date}
          text={text}
          popUpWrapper={createNote}
          setPopUpWrapper={setCreateNote}
        />
      )}
    </div>
  );
};

export default Card;
