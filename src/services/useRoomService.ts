import {create} from "zustand"

type Room={
    room:string
    setRoom:any
}

export const useRoomService = create<Room>((set) => ({
    room:"",
    setRoom:(room:string) =>(set({room}))
  }))