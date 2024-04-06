import { useEffect, useState } from 'react'
import { DocumentData, Query, Timestamp, collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from "../firebase"
import { useAppSelector } from '../app/hooks'

interface Messages {
  timestamp: Timestamp
  message: string
  user: {
    uid: string
    photo: string
    email: string
    displayName: string
  }
}

// 引数に渡したコレクションのドキュメントを取得
const useSubCollection = (
  collectionName: string,
  subCollectionName: string
) => {
  const channelId = useAppSelector ((state) => state.channel.channelId)
  // const [messages, setMessages] = useState<Messages[]>([])
  const [subDocuments, setSubDocuments] = useState<Messages[]>([])
  // query 引数に渡したコレクションのドキュメントを取得
  // collection(firebaseのdb, コレクション名) コレクションの参照を取得
  // const collectionRef: Query<DocumentData> = query(collection(db, data))

  useEffect(() => {
    let collectionRef = collection(
      db,
      collectionName,
      String(channelId),
      subCollectionName
    )

    const collectionRefOrderBy = query(
      collectionRef,
      orderBy('timestamp', 'desc')
    )

    // リアルタイムでデータを取得するためonSnapshotを使用 from 'firebase/firestore'
    onSnapshot(collectionRefOrderBy, (snapshot) => {
      let results: Messages[] = []
      snapshot.docs.forEach((doc) => {
        results.push({
          timestamp: doc.data().timestamp,
          message: doc.data().message,
          user: doc.data().user,
        })
      })
      setSubDocuments(results)
      // console.log(results)
    })
  }, [channelId])
  return { subDocuments }
}

export default useSubCollection