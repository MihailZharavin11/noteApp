import React, { useState } from 'react';
import arrow from '../../../image/FilterButton/arrow.svg';
import ClickAwayListener from 'react-click-away-listener';
import { addFilterNotes } from '../../../redux/slices/contentSlice/contentSlice';
import styles from './filterButton.module.sass';
import { useAppDispatch } from '../../../redux/store/store';

type FilterButtonProps = {
  filterNotes: string;
};

enum EFilterList {
  OLD = 'Old first',
  NEW = 'New first',
  ALPHABETICALLY = 'A-Z',
  REVERS_ALPH = 'Z-A',
}

const FilterButton: React.FC<FilterButtonProps> = ({ filterNotes }) => {
  const filterList: EFilterList[] = [
    EFilterList.OLD,
    EFilterList.ALPHABETICALLY,
    EFilterList.REVERS_ALPH,
    EFilterList.NEW,
  ];
  const [openModalFilter, setOpenModalFilter] = useState(false);
  const dispatch = useAppDispatch();
  const onClickFilter = (filterNotes: string) => {
    dispatch(addFilterNotes(filterNotes));
    setOpenModalFilter(!openModalFilter);
  };

  return (
    <div className={styles.filterWrapper}>
      <button onClick={() => setOpenModalFilter(!openModalFilter)} className={styles.filterButton}>
        <div className={styles.filterButton__name}>{filterNotes}</div>
        <div className="filter__button-arrow">
          <img src={arrow} alt="arrow" />
        </div>
      </button>
      {openModalFilter && (
        <ClickAwayListener onClickAway={() => setOpenModalFilter(!openModalFilter)}>
          <div className={styles.filterModal}>
            {filterList.map((element) => {
              return (
                <p
                  key={element}
                  onClick={() => onClickFilter(element)}
                  className={styles.filterModal__params}>
                  {' '}
                  {element}
                </p>
              );
            })}
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default FilterButton;
