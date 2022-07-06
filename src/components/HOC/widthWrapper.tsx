import React from 'react';
import styles from './widthWrapper.module.sass';
import { motion } from 'framer-motion';

type WidthWrapperProps = {
  popUpWrapper: Boolean;
  setPopUpWrapper: Function;
  submitRef: React.MutableRefObject<any>;
};

const WidthWrapper: Function = (Component: React.ComponentType<WidthWrapperProps>) => {
  return (props: WidthWrapperProps) => {
    const { popUpWrapper, setPopUpWrapper, submitRef } = props;
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          setPopUpWrapper(!popUpWrapper);
          if (submitRef) {
            submitRef.current.handleSubmit();
          }
        }}
        className={styles.modal__Wrapper}>
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{ opacity: 1 }}
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.3 }}>
          <Component {...props} />
        </motion.div>
      </div>
    );
  };
};

export default WidthWrapper;
