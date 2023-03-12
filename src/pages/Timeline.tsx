import { execOnce } from "next/dist/shared/lib/utils"
import { FormEvent, useState } from "react"
import { Header } from "../components/Header"
import { Separator } from "../components/Separator"
import { Tweet } from "../components/Tweet"
import './Timeline.css'

export function Timeline() {
  const [newTweet, setNewTweet] = useState('')
  const [tweets, setTweets] = useState([
    'meu primeiro tweet',
    'Teste',
    'Deu certo tweetar'
  ])

  const createNewTweet = (event : FormEvent) => {
    event.preventDefault()

    setTweets([...tweets, newTweet])
    setNewTweet('')
    const form = event.currentTarget as HTMLFormElement;
    form.reset();
  }

  function handleHotkeySubmit(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if(event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      setTweets([newTweet, ...tweets])
      setNewTweet('')
      const form = (event.currentTarget as HTMLTextAreaElement).form;
      form?.reset();
    } 
  }
  
  return(
    <main className="timeline">
          <Header title={'Tweet'}/>
          <form onSubmit={createNewTweet} className='new-tweet-form'>
            <label htmlFor="tweet">
              <img src="https://github.com/a.png" alt="Diego" />
              <textarea 
                id='tweet'
                name="tweet"
                placeholder="what's happening?"
                onKeyDown={handleHotkeySubmit}
                onChange={(event) => {
                  setNewTweet(event.target.value)
                }}
                />
            </label>
        
            <button type='submit'>Tweet</button>
          </form>
          <Separator/>

          {tweets.map(tweet => {
            return<Tweet key={tweet} content={tweet}/>
          })}
        </main>
  )
}