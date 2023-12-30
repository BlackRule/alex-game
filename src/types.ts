import { Timestamp } from 'firebase/firestore'

export type TodoData={
  imgUrl:''|string,
  text:string,
  timestamp:Timestamp
}
export type Todo={
  id:string
}&TodoData