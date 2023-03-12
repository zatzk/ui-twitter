import { PaperPlaneRight } from "phosphor-react"
import { FormEvent, useState } from "react"
import { Header } from "../components/Header"
import { Separator } from "../components/Separator"
import { Tweet } from "../components/Tweet"
import './Status.css'


export function Status() {

  const [newAnswer, setNewAnswer] = useState('')
  const [answers, setAnswers] = useState([
    'Concordo...',
    'olha, faz sentido!',
    'Parabéns pelo progresso.'
  ])

  function createNewAnswer(event: FormEvent) {
    event.preventDefault()

    setAnswers([newAnswer, ...answers])
    setNewAnswer('')

    const form = event.currentTarget as HTMLFormElement;
    form.reset();
  }

  function handleHotkeySubmit(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if(event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      setAnswers([newAnswer, ...answers])
      setNewAnswer('')
      const form = (event.currentTarget as HTMLTextAreaElement).form;
      form?.reset();
    } 
  }
   
  return (
    <main className="status">
    <Header title={'Tweet'}/>

    <Tweet content={"loren ipsum"}/>
    <Separator/>

    <form onSubmit={createNewAnswer} className='answer-tweet-form'>
      <label htmlFor="tweet">
        <img src="https://github.com/a.png" alt="Diego" />
        <textarea
          id='tweet'
          placeholder="Tweet your answer"
          onKeyDown={handleHotkeySubmit}
          onChange={(event) => {
            setNewAnswer(event.target.value)
          }}
         />
      </label>
  
      <button type='submit'>
        <PaperPlaneRight/>
        <span>Answer</span>
      </button>
    </form>

    {answers.map(answer => {
      return<Tweet key={answer} content={answer}/>
    })}
  </main>
  )
}