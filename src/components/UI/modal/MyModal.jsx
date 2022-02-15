import React from "react";
import classes from './MyModal.module.css';

const MyModal = ({children, visible, setVisible}) => {

  const rootClasses = [classes.myModal]
  const contentClasses = [classes.myModalContent]
  if (visible) {
    rootClasses.push(classes.active)
    contentClasses.push(classes.active)
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={contentClasses.join(' ')} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default MyModal;

