import React from 'react';
import xmark from '../../../../image/modal/xmark.svg';
import { Formik, Form, Field } from 'formik';
import { useParams } from 'react-router-dom';
import { createNote } from '../../../../redux/slices/contentSlice/contentSlice';
import styles from '../createNoteInner.module.sass';
import WidthWrapper from '../../../HOC/widthWrapper';
import { useAppDispatch } from '../../../../redux/store/store';

type InnerNoteToAddProps = {
  popUpWrapper: Boolean;
  setPopUpWrapper: Function;
};

interface IFormValue {
  title: string;
  text: string;
}

const InnerNoteToAdd: React.FC<InnerNoteToAddProps> = ({ popUpWrapper, setPopUpWrapper }) => {
  const placeholder: string = 'Write down the necessary information here';
  const todayDate = new Date().toLocaleDateString();
  const dispatch = useAppDispatch();
  let { path } = useParams();
  const initialValues: IFormValue = {
    title: '',
    text: '',
  };

  const noteAdd = async (value: IFormValue) => {
    const { meta } = await dispatch(
      createNote({
        title: value.title,
        text: value.text,
        path: path ? path : '',
      }),
    );
    if (meta.requestStatus === 'fulfilled') {
      setPopUpWrapper(!popUpWrapper);
    }
  };

  return (
    <div className={styles.modal__inner} onClick={(e) => e.stopPropagation()}>
      <div className={styles.modal__header}>
        <div className={styles.modalHeader__date}>{todayDate}</div>
        <img
          onClick={() => setPopUpWrapper(!popUpWrapper)}
          className="modal__header-xmark"
          src={xmark}
          alt="pin"
        />
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={(value) => {
          noteAdd(value);
        }}>
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
                onClick={() => {
                  setPopUpWrapper(!popUpWrapper);
                }}
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
    </div>
  );
};

export default WidthWrapper(InnerNoteToAdd);
