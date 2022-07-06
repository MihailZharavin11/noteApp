import React, { useState } from 'react';
import Createnotebutton from './CreateNoteButton/CreateNoteButton';
import ClickAwayListener from 'react-click-away-listener';
import EditSettings from './editSettings/EditSettings';
import EditButton from './EditButton/EditButton';
import styles from './headerButtons.module.sass';

type HeaderbuttonsProps = {
  title: string;
  createNote: Boolean;
  setCreateNote: Function;
  showEdditModalToDelete: Boolean;
  showEdditModalToRename: Boolean;
  setShowEdditModalToDelete: Function;
  setShowEdditModalToRename: Function;
};

const Headerbuttons: React.FC<HeaderbuttonsProps> = (props) => {
  const [showEditSettings, setEditSettings] = useState(false);
  const mainPage: string = 'All notes';

  const {
    title,
    createNote,
    setCreateNote,
    showEdditModalToDelete,
    showEdditModalToRename,
    setShowEdditModalToDelete,
    setShowEdditModalToRename,
  } = props;

  return (
    <>
      {title !== mainPage ? (
        <EditButton setEditSettings={setEditSettings} showEditSettings={showEditSettings} />
      ) : null}
      <Createnotebutton createNote={createNote} setCreateNote={setCreateNote} />
      {showEditSettings && (
        <ClickAwayListener
          onClickAway={() => {
            setEditSettings(!showEditSettings);
          }}>
          <>
            <EditSettings
              showEdditModalToDelete={showEdditModalToDelete}
              setShowEdditModalToDelete={setShowEdditModalToDelete}
              showEdditModalToRename={showEdditModalToRename}
              setShowEdditModalToRename={setShowEdditModalToRename}
            />
          </>
        </ClickAwayListener>
      )}
    </>
  );
};

export default Headerbuttons;
