import React from 'react';
import xmark from '../../../../image/modal/xmark.svg';
import { deleteNote } from '../../../../redux/slices/contentSlice/contentSlice';
import { useAppDispatch } from '../../../../redux/store/store';
import WidthWrapper from '../../../HOC/widthWrapper';
import styles from '../../EditInner/editInner.module.sass';

type InnerToDeleteNoteProps = {
  setPopUpWrapper: Function;
  popUpWrapper: Boolean;
  id: string;
};

const InnerToDeleteNote: React.FC<InnerToDeleteNoteProps> = ({
  setPopUpWrapper,
  popUpWrapper,
  id,
}) => {
  const dispatch = useAppDispatch();

  const deleteOnClick = () => {
    dispatch(deleteNote(id));
  };

  return (
    <div className={styles.rename__wrapper}>
      <div className={styles.rename__content}>
        <div className={styles.rename__title}>
          <p>Delete a note?</p>
          <img onClick={() => setPopUpWrapper(!popUpWrapper)} src={xmark} alt="" />
        </div>
        <div className={styles.rename__text}>
          All information from the note
          <br />
          will be deleted
        </div>
      </div>
      <div className={styles.rename_buttons}>
        <button
          onClick={() => setPopUpWrapper(!popUpWrapper)}
          className={styles.rename__buttonsCancel}>
          Cancel
        </button>
        <button
          onClick={() => {
            setPopUpWrapper(!popUpWrapper);
            deleteOnClick();
          }}
          className={styles.rename__butonsDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default WidthWrapper(InnerToDeleteNote);
