import { useEffect, useState } from 'react'
import { DocumentData, Query, collection, onSnapshot, query } from 'firebase/firestore'
import { db } from "../firebase"

interface Channels {
  id: string
  channel: DocumentData
}
// 引数に渡したコレクションのドキュメントを取得
const useCollection = (data: string) => {
  const [documents, setDocuments] = useState<Channels[]>([])
  // query 引数に渡したコレクションのドキュメントを取得
  // collection(firebaseのdb, コレクション名) コレクションの参照を取得
  const collectionRef: Query<DocumentData> = query(collection(db, data))

  useEffect(() => {
    // onSnapshot コレクションのドキュメントに変更があった場合、コールバック関数を実行
    onSnapshot(collectionRef, (querySnapshot) => {
      const channelsResults: Channels[] = []
      querySnapshot.docs.forEach((doc) => {
        // console.log(doc.id, doc.data())
        channelsResults.push({
          id: doc.id,
          channel: doc.data(),
        })
      })
      setDocuments(channelsResults)
    })
  }, [])
  return { documents }
}

export default useCollection