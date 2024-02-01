import { Route, Routes } from 'react-router';
import { useAuthStore } from '../store/useAuthStore'
import Room from '../pages/Room';
import Chat from '../pages/Chat';

export default function Dashboard() {

  const { isAuth } = useAuthStore()


  if (!isAuth) {
    return <div>Dashboard</div>;
  } else {
    return (
      <Routes>
       <Route path='/' element={<Room/>}/>
       <Route path='/chat' element={<Chat/>}/>

      </Routes>

    );
  }
}