import React from 'react';
import styles from './editButton.module.sass';

type EditButtonProps = {
  setEditSettings: Function;
  showEditSettings: Boolean;
};

const EditButton: React.FC<EditButtonProps> = ({ setEditSettings, showEditSettings }) => {
  return (
    <button
      onClick={() => {
        setEditSettings(!showEditSettings);
      }}
      className={styles.headerButton__white}>
      Edit folder
    </button>
  );
};

export default EditButton;
