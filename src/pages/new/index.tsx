import { useForm } from 'react-hook-form';
import InputUnstyled from '@mui/base/InputUnstyled';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';


function NewGift() {
  const { register, handleSubmit } = useForm();

//   const onSubmit = (data) => console.log(data);

  const onSubmit  = async (data) => {
        await fetch('/api/gift', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            { 
                title: data.title,
                body: data.body,
            }),
        });
      };

  return (
    <div className="App">
      <h1>ギフト登録</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">title</label>
          <InputUnstyled id="title" {...register('title')} />
        </div>
        <div>
          <label htmlFor="password">body</label>
          <InputUnstyled id="body" {...register('body')} />
        </div>
        <ButtonUnstyled type="submit">登録する</ButtonUnstyled>
      </form>
    </div>
  );
}

export default NewGift;