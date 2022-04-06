import { useState } from 'react';
import s from './Searchbar.module.scss';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
export default function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  // useEffect(() => {
  //   if(value === '')

  // }, [value])

  const handleChange = e => {
    const normalisedValue = e.currentTarget.value.toLowerCase();

    setValue(normalisedValue);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (value.trim() === '') {
      toast.error('Введите название картинки');
      return;
    }

    onSubmit({ value });
    setValue('');
  };

  return (
    <>
      <header className={s.searchbar}>
        <form className={s.search_form} onSubmit={handleSubmit}>
          <button type="submit" className={s.search_button}>
            <span className={s.search_button_label}>Search</span>
          </button>

          <input
            className={s.search_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
            value={value}
          />
        </form>
      </header>
    </>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
