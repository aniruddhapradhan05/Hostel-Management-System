import Sidebar from "./components/Sidebar1"
import {BrowserRouter , Route, Routes} from 'react-router-dom'
import Home from "./pages/Home"
import AddStudent from "./pages/AddStudent"
import DeleteStudent from "./pages/DeleteStudent"
import StudentDetail from "./pages/StudentDetail"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Sidebar1 from "./components/Sidebar1"
import LogoutPage from "./pages/Logout"
function App() {
  return (
    <>
      <BrowserRouter>
        <Sidebar1/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/student-detail" element={<StudentDetail/>}/>
            <Route path="/add-student" element={<AddStudent/>}/>
            <Route path="/delete-student" element={<DeleteStudent/>}/>
            <Route path="/sign-up" element={<SignUp/>}/>
            <Route path="/sign-in" element={<SignIn/>}/>
            <Route path="/logout" element={<LogoutPage/>}/>
            <Route path="*" element={<> Not Found</>}/>
          </Routes>    
      </BrowserRouter>
    </>
  )
}

export default App
