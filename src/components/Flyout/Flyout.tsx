import { useEffect, useRef, useState } from 'react';
import { useActions } from '../../hooks/useActions';
import { useAppSelector } from '../../hooks/useAppSelector';
import styles from './flyout.module.css';
import { downloadCsv } from '../../helpers/downloadCsv';

const Flyout: React.FC = () => {
  const [isHidden, setIsHidden] = useState(false);
  const { clearFavourites } = useActions();
  const { favourites } = useAppSelector((state) => state.recipes);
  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  const handleClearFavourites = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    clearFavourites();
  };

  const handleToggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  const handleDownload = () => {
    const url = downloadCsv(favourites);
    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = url;
      downloadLinkRef.current.download = `${favourites.length}_recipes.csv`;
      downloadLinkRef.current.click();
      if (URL.revokeObjectURL) {
        URL.revokeObjectURL(url);
      }
    }
  };

  useEffect(() => {
    if (favourites.length === 0) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  }, [favourites]);

  if (favourites.length === 0) return null;

  return (
    <div className={`${styles.flyout} ${isHidden ? styles.hidden : ''}`}>
      <button className={styles.hideButton} onClick={handleToggleVisibility}>
        {isHidden ? 'Show selected' : 'Hide selected'}
      </button>
      {!isHidden && (
        <>
          <p>{favourites.length} recipes are selected</p>
          <button className={styles.funcButton} onClick={handleClearFavourites}>
            Unselect all
          </button>
          <button className={styles.funcButton} onClick={handleDownload}>
            Download
          </button>
          <a ref={downloadLinkRef} style={{ display: 'none' }}></a>
        </>
      )}
    </div>
  );
};

export default Flyout;
