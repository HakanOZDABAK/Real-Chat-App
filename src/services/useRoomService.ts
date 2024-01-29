import {create} from "zustand"

type Room={
    room:any
    setRoom: (data: any) => void;
}

export const useRoomService = create<Room>((set) => ({
    room:null,
    setRoom:(room:any) =>set(()=>({room:room}))
  }))