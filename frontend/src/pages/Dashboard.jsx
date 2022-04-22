import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import GoalForm from '../components/GoalForm'

function Dashboard() {
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.auth)
    useEffect(() => {
        if(!user) {
            navigate('/login')
        }
    }, [user, navigate])

    return (
        <>
            <section className='heading'>
                <h1>Goals Dashboard</h1>
                <p>Welcome {user && user.name}</p>
            </section>
            <GoalForm />
        </>
    )
}

export default Dashboard