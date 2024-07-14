import React, { useEffect, useState } from 'react';
import { IRecipeDetails } from '../../types/RecipeTypes';
import { useNavigate, useOutletContext, useParams, useSearchParams } from 'react-router-dom';

import { getRecipesDetails } from '../../api/getRecipesAPI';
import Loading from '../loading/loading';
import styles from './RecipeDetails.module.css';

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [details, setDetails] = useState<IRecipeDetails>({} as IRecipeDetails);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [urlParams] = useSearchParams();
  const query = urlParams.get('search');
  const page = urlParams.get('page');
  const { setIsDetailsOpen } = useOutletContext<{ setIsDetailsOpen: (isOpen: boolean) => void }>();

  useEffect(() => {
    setLoading(true);
    if (id) {
      getRecipesDetails(id as string).then((data) => {
        setDetails(data);
        setLoading(false);
        setIsOpen(true);
      });
    }
  }, [id]);

  const handleClose = () => {
    setIsOpen(false);
    setIsDetailsOpen(false);
    navigate(`/?page=${page}&search=${query}`);
  };

  return (
    <>
      {isOpen && (
        <div className={`${styles.recipe_details} ${isOpen ? styles.open : ''}`}>
          {loading ? (
            <Loading />
          ) : details ? (
            <>
              <div className={styles.details}>
                <img
                  src={details.image}
                  className={styles.image}
                  alt="dish-image"
                  width={150}
                  height={150}
                />
                <h2>{details.name}</h2>
                <p>Cook time: {details.prepTimeMinutes + details.cookTimeMinutes} min</p>
                <h3>Ingredients:</h3>
                <ul>
                  {details.ingredients &&
                    details.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                </ul>
                <h3>Instructions:</h3>
                <ol>
                  {details.instructions &&
                    details.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                </ol>
                <button onClick={handleClose}>Close</button>
              </div>
            </>
          ) : (
            <p>No recipe details found</p>
          )}
        </div>
      )}
    </>
  );
};

export default RecipeDetails;
