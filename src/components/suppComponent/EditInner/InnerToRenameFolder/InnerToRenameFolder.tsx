import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import xmark from '../../../../image/modal/xmark.svg';
import WidthWrapper from '../../../HOC/widthWrapper';
import { renameFolder } from '../../../../redux/slices/navigationSlice/NavSlice';
import styles from '../editInner.module.sass';
import { useAppDispatch } from '../../../../redux/store/store';

type InnerToRenameFolderProps = {
  popUpWrapper: Boolean;
  setPopUpWrapper: Function;
  title: string;
  titleId: string;
};

const InnerToRenameFolder: React.FC<InnerToRenameFolderProps> = ({
  popUpWrapper,
  setPopUpWrapper,
  title,
  titleId,
}) => {
  const [inputValue, setInputValue] = useState(title);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async () => {
    let { meta } = await dispatch(renameFolder({ inputValue, titleId, title }));
    setInputValue('');
    if (meta.requestStatus === 'fulfilled') {
      setPopUpWrapper(!popUpWrapper);
    }
    navigate('/' + inputValue.replace(/\s+/g, '').toLowerCase());
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className={styles.rename__wrapper}>
      <div className={styles.rename__content}>
        <div className={styles.rename__title}>
          <p>Rename Folder</p>
          <img onClick={() => setPopUpWrapper(!popUpWrapper)} src={xmark} alt="" />
        </div>
        <div className={styles.rename__input}>
          <input
            className={styles.rename__inputItem}
            autoFocus={true}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
        </div>
      </div>
      <div className={styles.rename_buttons}>
        <button
          onClick={() => setPopUpWrapper(!popUpWrapper)}
          className={styles.rename__buttonsCancel}>
          Cancel
        </button>
        <button onClick={() => onSubmit()} className={styles.rename__butonsDelete}>
          Save
        </button>
      </div>
    </div>
  );
};

export default WidthWrapper(InnerToRenameFolder);
