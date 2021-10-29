import { useState } from 'react'

const AskNameModal = ({onGetName}) => {
  const [playersName, setName] = useState('')

  const onSubmit = (e) => {
      e.preventDefault();

      onGetName({playersName});
      setName('');
  }
  return (
    <div className='containerModal askUserBox'>
      <form className='d-flex flex-wrap justify-content-center' onSubmit={onSubmit}>
        <label className='p-4' htmlFor="userName">
          Good day, dear player! I would like to know how should I call you
        </label>
        <input type="text" 
          className='w-100 mx-4' 
          id="userName" 
          name="userName" 
          maxLength="15" 
          placeholder='Your name'
          value={playersName}
          onChange={(e) => setName(e.target.value)}/>
        <br />
        <br />
        <input type="submit" className='m-4 btn btn-dark btn-sm ' value="OK!" />
      </form>
    </div>
  );
};
export default AskNameModal;
