import React from 'react';
import { useActions } from '../../hooks/useActions';
import { useAppSelector } from '../../hooks/useAppSelector';

import styles from './favourite.module.css';
interface IFavoritesProps {
  id: number;
  name: string;
  instructions: string[];
  ingredients: string[];
}

const Favourite: React.FC<IFavoritesProps> = ({ id, name, instructions, ingredients }) => {
  const { addFavorite, removeFavorite } = useActions();
  const { favourites } = useAppSelector((state) => state.recipes);
  const isFavourite = favourites.some((favourite) => favourite.id === id);

  const handleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isFavourite) {
      removeFavorite({ id, name, instructions, ingredients });
    } else {
      addFavorite({ id, name, instructions, ingredients });
    }
  };

  return (
    <div className={styles.favorite}>
      <button
        onClick={handleFavorite}
        className={`${styles.favouriteButton} ${isFavourite ? styles.checked : ''}`}
      >
        {isFavourite ? '❤️' : '➕'}
      </button>
    </div>
  );
};

export default Favourite;
