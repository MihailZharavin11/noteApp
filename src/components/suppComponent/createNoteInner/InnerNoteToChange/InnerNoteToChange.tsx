import React, { useState } from 'react';
import trash from '../../../../image/modal/trash.svg';
import { Formik, Form, Field } from 'formik';
import { useParams } from 'react-router-dom';
import { changeNote } from '../../../../redux/slices/contentSlice/contentSlice';
import InnerToDeleteNote from '../InnerToDeleteNote/InnerToDeleteNote';
import WidthWrapper from '../../../HOC/widthWrapper';
import styles from '../createNoteInner.module.sass';
import { useAppDispatch } from '../../../../redux/store/store';

type TInnerToChangeProps = {
  title: string;
  date: string;
  text: string;
  id: string;
  submitRef: React.MutableRefObject<any>;
  setPopUpWrapper: Function;
  popUpWrapper: Boolean;
};

type TFunctionArgs = {
  title: string;
  text: string;
};

const InnerNoteToChange: React.FC<TInnerToChangeProps> = ({
  title,
  date,
  text,
  id,
  submitRef,
  setPopUpWrapper,
  popUpWrapper,
}) => {
  const placeholder: string = 'Write down the necessary information here';
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useAppDispatch();
  let { path } = useParams();
  if (!path) {
    path = 'allnotes';
  }

  const changeOnSubmit = async ({ title, text }: TFunctionArgs) => {
    const { meta } = await dispatch(
      changeNote({
        id,
        title,
        text,
        direction: path ? path : '',
        date,
      }),
    );
    if (meta.requestStatus === 'fulfilled') {
      setPopUpWrapper(!popUpWrapper);
    }
  };

  return (
    <div className={styles.modal__inner} onClick={(e) => e.stopPropagation()}>
      <div className={styles.modal__header}>
        <div className={styles.modalHeader__date}>{date}</div>
        <img
          onClick={() => {
            setShowDeleteModal(!showDeleteModal);
          }}
          className="modal__header-trash"
          src={trash}
          alt="trash"
        />
      </div>
      <Formik
        initialValues={{
          title: `${title}`,
          text: `${text}`,
        }}
        onSubmit={(value) => {
          changeOnSubmit(value);
        }}
        innerRef={submitRef}>
        {() => (
          <Form className={styles.modal__content}>
            <h5 className={styles.modal__title}>Title</h5>
            <Field
              type="text"
              name="title"
              as="input"
              className={styles.modalInput__title}
              id="title"
            />
            <Field
              type="text"
              as="textarea"
              name="text"
              className={styles.modalInput__text}
              id="title"
              placeholder={placeholder}
            />
            <div className={styles.modalButton__wrapper}>
              <button
                onClick={() => setPopUpWrapper(!popUpWrapper)}
                className={`${styles.modal__button} ${styles.modalButton__white}`}>
                Cancel
              </button>
              <button
                className={`${styles.modal__button} ${styles.modalButton__dark}`}
                type="submit">
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {showDeleteModal && (
        <InnerToDeleteNote
          id={id}
          popUpWrapper={showDeleteModal}
          setPopUpWrapper={setShowDeleteModal}
        />
      )}
    </div>
  );
};

export default WidthWrapper(InnerNoteToChange);
