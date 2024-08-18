import React, { forwardRef, useState } from 'react';
import styles from '../Forms.module.css';
import { convertFileToBase64 } from '../../../utils/helpers/convertToBase64';

interface InputProps {
  type: string;
  id: string;
  error?: string;
  onFileChange: (base64: string) => void;
}

const PictureInput = forwardRef<HTMLInputElement, InputProps>(
  ({ id, type, onFileChange, error }, ref) => {
    const [fileName, setFileName] = useState('No file chosen');

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.item(0);
      if (file) {
        setFileName(file.name);
        const base64 = await convertFileToBase64(file);
        onFileChange(base64);
      } else {
        setFileName('No file chosen');
        onFileChange('');
      }
    };

    return (
      <div className={styles.formGroup}>
        <label htmlFor="picture">Upload Picture</label>
        <div className={error ? styles.customFileInputError : styles.customFileInput}>
          <input
            id={id}
            type={type}
            accept=".png,.jpeg,.jpg"
            ref={ref}
            onChange={handleFileChange}
          />
          <span className={styles.customFileLabel}>Choose a file</span>
          <span className={styles.fileName}>{fileName}</span>
        </div>
        <small className={styles.fileSizeWarning}>Max file size: 500KB</small>
        {error && <div className={styles.error}>{error}</div>}
      </div>
    );
  },
);

export default PictureInput;
