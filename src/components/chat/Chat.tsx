import './Chat.scss'
import ChatHeader from './ChatHeader'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import GifIcon from '@mui/icons-material/Gif'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import ChatMessage from './ChatMessage'
import { useAppSelector } from '../../app/hooks'
import {  useState } from 'react'
import { db } from '../../firebase'
import {
  CollectionReference,
  DocumentData,
  // DocumentReference,
  addDoc,
  collection,
  serverTimestamp
} from 'firebase/firestore'
import useSubCollection from '../../hooks/useSubCollection'

const Chat = () => {
  const [inputText, setInputText] = useState<string>('')
  // console.log(inputText)
  const channelName = useAppSelector((state) => state.channel.channelName)
  // console.log(channelName)
  const channelId = useAppSelector ((state) => state.channel.channelId)
  const user = useAppSelector((state) => state.user.user)
  const { subDocuments: messages} = useSubCollection('channels', 'messages')

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // preventDefault()を使うことで、ページがリロードされるのを防ぐ
    e.preventDefault()
    // console.log(inputText)
    // channelsコレクションの中のmessagesコレクションにメッセージを入れる
    // firebaseのcollectionAPIを使って、messagesコレクションにメッセージを追加する
    const collectionRef: CollectionReference<DocumentData> = collection(
      db,
      'channels',
      String(channelId),
      'messages'
    )

    // const docRef: DocumentReference<DocumentData> = await addDoc(
    //   collectionRef,
    //   {
    //     message: inputText,
    //     timestamp: serverTimestamp(),
    //     user: user,
    //   }
    // )
    
    await addDoc(
      collectionRef,
      {
        message: inputText,
        timestamp: serverTimestamp(),
        user: user,
      }
    )
    // console.log(docRef)
    setInputText('')
  }

  return (
    <div className='chat'>
      {/* chatHeader */}
      <ChatHeader channelName={channelName} />
      {/* chatMessage */}
      <div className="chatMessages">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.message}
            timestamp={message.timestamp}
            user={message.user}
          />
        ))}
      </div>
      {/* chatInput */}
      <div className="chatInput">
        <AddCircleOutlineIcon />
        <form>
          <input
            type="text"
            placeholder='#udemyへmessageを送信'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputText(e.target.value)
            }
            value={inputText}
          />
          <button
            type='submit'
            className='chatInputButton'
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              sendMessage(e)
            }
          >
            送信
          </button>
        </form>

        <div className="chatInputIcons">
          <CardGiftcardIcon />
          <GifIcon />
          <EmojiEmotionsIcon />
        </div>
      </div>
    </div>
  )
}

export default Chat