import React from 'react';
import styles from './editSettings.module.sass';

type EditSettingsProps = {
  showEdditModalToDelete: Boolean;
  setShowEdditModalToDelete: Function;
  showEdditModalToRename: Boolean;
  setShowEdditModalToRename: Function;
};

const EditSettings: React.FC<EditSettingsProps> = (props) => {
  const {
    showEdditModalToDelete,
    setShowEdditModalToDelete,
    showEdditModalToRename,
    setShowEdditModalToRename,
  } = props;

  return (
    <div onClick={() => console.log('abc')} className={styles.edditSettings__wrapper}>
      <p
        onClick={() => {
          setShowEdditModalToRename(!showEdditModalToRename);
        }}
        className={styles.edditSettings__rename}>
        Rename
      </p>
      <p
        onClick={() => {
          setShowEdditModalToDelete(!showEdditModalToDelete);
        }}
        className="eddit-settings__delete">
        Delete folder
      </p>
    </div>
  );
};

export default EditSettings;
